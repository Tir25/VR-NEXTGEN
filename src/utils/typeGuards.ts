/**
 * Type guard utilities
 * Provides runtime type checking for enhanced type safety
 */

import React from 'react';

// Basic type guards
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

// Date type guards
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function isDateString(value: unknown): value is string {
  if (!isString(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
}

// DOM type guards
export function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

export function isElement(value: unknown): value is Element {
  return value instanceof Element;
}

export function isNode(value: unknown): value is Node {
  return value instanceof Node;
}

// React type guards
export function isReactElement(value: unknown): value is React.ReactElement {
  return React.isValidElement(value);
}

export function isRefObject<T>(value: unknown): value is React.RefObject<T> {
  return isObject(value) && 'current' in value;
}

// API type guards
export function isApiResponse(value: unknown): value is { success: boolean; data?: any; error?: string } {
  return isObject(value) && 'success' in value && isBoolean(value.success);
}

export function isErrorResponse(value: unknown): value is { success: false; error: string } {
  return isApiResponse(value) && !value.success && isString(value.error);
}

export function isSuccessResponse(value: unknown): value is { success: true; data: any } {
  return isApiResponse(value) && value.success && 'data' in value;
}

// Form type guards
export function isFormField(value: unknown): value is { name: string; value: any; error?: string; touched: boolean } {
  return isObject(value) && 
         'name' in value && 
         'value' in value && 
         'touched' in value &&
         isString(value.name) &&
         isBoolean(value.touched);
}

export function isFormState(value: unknown): value is { fields: Record<string, any>; isValid: boolean; isSubmitting: boolean } {
  return isObject(value) &&
         'fields' in value &&
         'isValid' in value &&
         'isSubmitting' in value &&
         isObject(value.fields) &&
         isBoolean(value.isValid) &&
         isBoolean(value.isSubmitting);
}

// Event type guards
export function isEvent(value: unknown): value is Event {
  return value instanceof Event;
}

export function isMouseEvent(value: unknown): value is MouseEvent {
  return value instanceof MouseEvent;
}

export function isKeyboardEvent(value: unknown): value is KeyboardEvent {
  return value instanceof KeyboardEvent;
}

export function isTouchEvent(value: unknown): value is TouchEvent {
  return value instanceof TouchEvent;
}

// Validation type guards
export function isValidationError(value: unknown): value is { field: string; message: string; code: string } {
  return isObject(value) &&
         'field' in value &&
         'message' in value &&
         'code' in value &&
         isString(value.field) &&
         isString(value.message) &&
         isString(value.code);
}

export function isValidationResult(value: unknown): value is { isValid: boolean; errors: any[] } {
  return isObject(value) &&
         'isValid' in value &&
         'errors' in value &&
         isBoolean(value.isValid) &&
         isArray(value.errors);
}

// Utility type guards
export function hasProperty<T extends string>(
  value: unknown,
  property: T
): value is Record<T, unknown> {
  return isObject(value) && property in value;
}

export function hasProperties<T extends string>(
  value: unknown,
  properties: T[]
): value is Record<T, unknown> {
  return isObject(value) && properties.every(prop => prop in value);
}

export function isRecord<T = unknown>(value: unknown): value is Record<string, T> {
  return isObject(value) && !isArray(value) && !isDate(value);
}

export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.length > 0;
}

export function isNonEmptyArray<T>(value: unknown): value is T[] {
  return isArray<T>(value) && value.length > 0;
}

export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

export function isNonNegativeNumber(value: unknown): value is number {
  return isNumber(value) && value >= 0;
}
