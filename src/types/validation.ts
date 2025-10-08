/**
 * Validation type definitions
 * Provides type-safe validation patterns
 */

// Validation result types
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

// Validation rule types
export type ValidationRule<T = any> = (value: T) => ValidationResult | Promise<ValidationResult>;

export interface ValidationRuleConfig<T = any> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: ValidationRule<T>;
  message?: string;
}

// Form validation types
export interface FormValidationConfig<T = Record<string, any>> {
  fields: Record<keyof T, ValidationRuleConfig>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
}

export interface FormValidationState<T = Record<string, any>> {
  errors: Record<keyof T, ValidationError[]>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isDirty: boolean;
}

// Schema validation types
export interface SchemaField {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date' | 'email' | 'url';
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  enum?: any[];
  format?: string;
  properties?: Record<string, SchemaField>;
  items?: SchemaField;
}

export interface Schema {
  type: 'object';
  properties: Record<string, SchemaField>;
  required?: string[];
  additionalProperties?: boolean;
}

// Validation context types
export interface ValidationContext {
  field: string;
  value: any;
  formData: Record<string, any>;
  schema?: Schema;
}

// Validation hook types
export interface UseValidationReturn<T = any> {
  validate: (value: T) => ValidationResult;
  validateField: (field: string, value: T) => ValidationResult;
  validateForm: (data: Record<string, any>) => ValidationResult;
  errors: ValidationError[];
  isValid: boolean;
  isDirty: boolean;
}

// Validation utility types
export type ValidationFunction<T = any> = (value: T, context?: ValidationContext) => ValidationResult | Promise<ValidationResult>;

export interface ValidationUtilities {
  required: ValidationFunction;
  minLength: (min: number) => ValidationFunction<string>;
  maxLength: (max: number) => ValidationFunction<string>;
  min: (min: number) => ValidationFunction<number>;
  max: (max: number) => ValidationFunction<number>;
  pattern: (pattern: RegExp) => ValidationFunction<string>;
  email: ValidationFunction<string>;
  url: ValidationFunction<string>;
  date: ValidationFunction<string>;
  number: ValidationFunction<any>;
  boolean: ValidationFunction<any>;
  array: ValidationFunction<any[]>;
  object: ValidationFunction<Record<string, any>>;
}
