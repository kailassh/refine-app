/**
 * Authentication service for API operations.
 * 
 * This service provides a clean interface for authentication-related
 * API calls with proper error handling and type safety.
 */

import { type User } from '../../types/auth';
import { AUTH_ERRORS, AUTH_ERROR_MESSAGES, API_CONSTANTS } from '../../utils/constants';

/**
 * Authentication service interface.
 */
export interface AuthService {
  loginWithEmail(email: string): Promise<void>;
  verifyOTP(email: string, token: string): Promise<User>;
  resendOTP(email: string): Promise<void>;
  logout(): Promise<void>;
  refreshSession(): Promise<User | null>;
}

/**
 * Authentication error class for proper error handling.
 */
export class AuthError extends Error {
  public code: string;
  public statusCode?: number;
  
  constructor(
    code: string,
    message: string,
    statusCode?: number
  ) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
    this.statusCode = statusCode;
  }

  /**
   * Get user-friendly error message.
   */
  get userMessage(): string {
    return AUTH_ERROR_MESSAGES[this.code as keyof typeof AUTH_ERROR_MESSAGES] || this.message;
  }
}

/**
 * Create authentication service with configurable backend.
 * This allows for easy switching between different auth providers.
 */
export const createAuthService = (implementation: AuthService): AuthService => {
  return {
    async loginWithEmail(email: string): Promise<void> {
      try {
        return await implementation.loginWithEmail(email);
      } catch (error) {
        throw normalizeAuthError(error);
      }
    },

    async verifyOTP(email: string, token: string): Promise<User> {
      try {
        return await implementation.verifyOTP(email, token);
      } catch (error) {
        throw normalizeAuthError(error);
      }
    },

    async resendOTP(email: string): Promise<void> {
      try {
        return await implementation.resendOTP(email);
      } catch (error) {
        throw normalizeAuthError(error);
      }
    },

    async logout(): Promise<void> {
      try {
        return await implementation.logout();
      } catch (error) {
        throw normalizeAuthError(error);
      }
    },

    async refreshSession(): Promise<User | null> {
      try {
        return await implementation.refreshSession();
      } catch (error) {
        // Don't throw on refresh errors, just return null
        console.error('Session refresh failed:', error);
        return null;
      }
    },
  };
};

/**
 * Normalize different types of errors into AuthError instances.
 */
const normalizeAuthError = (error: unknown): AuthError => {
  if (error instanceof AuthError) {
    return error;
  }

  if (error instanceof Error) {
    // Map common error patterns
    if (error.message.includes('email')) {
      return new AuthError(AUTH_ERRORS.INVALID_EMAIL, error.message);
    }
    
    if (error.message.includes('token') || error.message.includes('otp')) {
      return new AuthError(AUTH_ERRORS.INVALID_OTP, error.message);
    }
    
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return new AuthError(AUTH_ERRORS.NETWORK_ERROR, error.message);
    }

    return new AuthError(AUTH_ERRORS.UNKNOWN_ERROR, error.message);
  }

  return new AuthError(AUTH_ERRORS.UNKNOWN_ERROR, 'An unexpected error occurred');
};

/**
 * Create a timeout promise for API calls.
 */
export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number = API_CONSTANTS.TIMEOUT
): Promise<T> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new AuthError(AUTH_ERRORS.NETWORK_ERROR, 'Request timeout'));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
};

// Export the createAuthService function as default
export { createAuthService as default };