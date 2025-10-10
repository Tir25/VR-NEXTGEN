/**
 * Safe wrapper utilities
 * Provides safe execution patterns for potentially failing operations
 */

export interface SafeResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

/**
 * Safely execute a function
 */
export function safeExecute<T>(fn: () => T, fallback?: T): SafeResult<T> {
  try {
    const data = fn();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error, data: fallback };
  }
}

/**
 * Safely execute an async function
 */
export async function safeExecuteAsync<T>(
  fn: () => Promise<T>,
  fallback?: T
): Promise<SafeResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error, data: fallback };
  }
}

/**
 * Safely access object properties
 */
export function safeGet<T>(obj: any, path: string, fallback?: T): T | undefined {
  try {
    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
      if (result == null) {
        return fallback;
      }
      result = result[key];
    }

    return result;
  } catch (error) {
    return fallback;
  }
}

/**
 * Safely set object properties
 */
export function safeSet<T>(obj: any, path: string, value: T): boolean {
  try {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Safely parse JSON
 */
export function safeParseJSON<T>(json: string, fallback?: T): SafeResult<T> {
  try {
    const data = JSON.parse(json);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error, data: fallback };
  }
}

/**
 * Safely stringify JSON
 */
export function safeStringifyJSON(obj: any, fallback = '{}'): SafeResult<string> {
  try {
    const data = JSON.stringify(obj);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error, data: fallback };
  }
}

/**
 * Safely execute with timeout
 */
export async function safeExecuteWithTimeout<T>(
  fn: () => Promise<T>,
  timeout: number,
  fallback?: T
): Promise<SafeResult<T>> {
  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Operation timed out')), timeout);
    });

    const data = await Promise.race([fn(), timeoutPromise]);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error, data: fallback };
  }
}
