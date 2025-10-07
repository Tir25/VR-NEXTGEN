/**
 * Input Validator Component
 * Provides comprehensive input validation and sanitization
 */

import React, { ReactNode, useState, useEffect, useCallback } from 'react';
import { sanitizeInput } from '@/utils/security';
import { errorHandler } from '@/utils/errorHandling';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean | string; // Returns true if valid, or error message if invalid
  sanitize?: boolean;
}

export interface InputValidatorProps {
  children: ReactNode;
  value: string;
  rules?: ValidationRule;
  onValidationChange?: (isValid: boolean, errors: string[]) => void;
  showErrors?: boolean;
  errorClassName?: string;
  className?: string;
}

interface ValidationState {
  isValid: boolean;
  errors: string[];
  sanitizedValue: string;
}

export default function InputValidator({
  children,
  value,
  rules = {},
  onValidationChange,
  showErrors = true,
  errorClassName = 'text-red-500 text-xs mt-1',
  className = '',
}: InputValidatorProps) {
  const [validationState, setValidationState] = useState<ValidationState>({
    isValid: true,
    errors: [],
    sanitizedValue: value,
  });

  const validateInput = useCallback((inputValue: string, validationRules: ValidationRule): ValidationState => {
    const errors: string[] = [];
    let sanitizedValue = inputValue;

    try {
      // Sanitize input if requested
      if (validationRules.sanitize) {
        sanitizedValue = sanitizeInput(inputValue);
      }

      // Required validation
      if (validationRules.required && (!sanitizedValue || sanitizedValue.trim().length === 0)) {
        errors.push('This field is required');
      }

      // Length validations
      if (sanitizedValue && validationRules.minLength && sanitizedValue.length < validationRules.minLength) {
        errors.push(`Must be at least ${validationRules.minLength} characters long`);
      }

      if (sanitizedValue && validationRules.maxLength && sanitizedValue.length > validationRules.maxLength) {
        errors.push(`Must be no more than ${validationRules.maxLength} characters long`);
      }

      // Pattern validation
      if (sanitizedValue && validationRules.pattern && !validationRules.pattern.test(sanitizedValue)) {
        errors.push('Invalid format');
      }

      // Custom validation
      if (sanitizedValue && validationRules.custom) {
        const customResult = validationRules.custom(sanitizedValue);
        if (customResult !== true) {
          errors.push(typeof customResult === 'string' ? customResult : 'Invalid value');
        }
      }

      return {
        isValid: errors.length === 0,
        errors,
        sanitizedValue,
      };
    } catch (error) {
      const appError = errorHandler.createError(
        (error as Error).message,
        'VALIDATION_ERROR',
        400,
        {
          component: 'InputValidator',
          inputValue: inputValue.substring(0, 100), // Truncate for logging
          rules: validationRules,
        }
      );

      errorHandler.handleError(appError);

      return {
        isValid: false,
        errors: ['Validation error occurred'],
        sanitizedValue: inputValue,
      };
    }
  }, []);

  useEffect(() => {
    const newValidationState = validateInput(value, rules);
    setValidationState(newValidationState);

    if (onValidationChange) {
      onValidationChange(newValidationState.isValid, newValidationState.errors);
    }
  }, [value, rules, validateInput, onValidationChange]);

  // Clone children and add validation props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const props = Object.assign({}, child.props, {
        'data-valid': validationState.isValid,
        'data-errors': validationState.errors.length > 0,
        'data-sanitized-value': validationState.sanitizedValue,
      });
      return React.cloneElement(child, props);
    }
    return child;
  });

  return (
    <div className={`input-validator ${className}`}>
      {enhancedChildren}
      {showErrors && validationState.errors.length > 0 && (
        <div className="validation-errors">
          {validationState.errors.map((error, index) => (
            <div key={index} className={errorClassName}>
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Common validation rules
export const commonValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    sanitize: true,
  },
  phone: {
    required: true,
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    sanitize: true,
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s\-']+$/,
    sanitize: true,
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 128,
    custom: (value: string) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      
      if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
      if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
      if (!hasNumbers) return 'Password must contain at least one number';
      if (!hasSpecialChar) return 'Password must contain at least one special character';
      
      return true;
    },
  },
  url: {
    pattern: /^https?:\/\/.+/,
    sanitize: true,
  },
  text: {
    maxLength: 1000,
    sanitize: true,
  },
} as const;

// Convenience components for common input types
export const EmailValidator = (props: Omit<InputValidatorProps, 'rules'>) => (
  <InputValidator {...props} rules={commonValidationRules.email} />
);

export const PhoneValidator = (props: Omit<InputValidatorProps, 'rules'>) => (
  <InputValidator {...props} rules={commonValidationRules.phone} />
);

export const NameValidator = (props: Omit<InputValidatorProps, 'rules'>) => (
  <InputValidator {...props} rules={commonValidationRules.name} />
);

export const PasswordValidator = (props: Omit<InputValidatorProps, 'rules'>) => (
  <InputValidator {...props} rules={commonValidationRules.password} />
);
