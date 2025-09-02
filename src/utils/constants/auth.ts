/**
 * Authentication-related constants.
 * 
 * This module defines constants used throughout the authentication system.
 */

/**
 * OTP configuration.
 */
export const OTP_CONFIG = {
  /** Length of OTP code */
  CODE_LENGTH: 6,
  
  /** OTP expiration time in seconds */
  EXPIRATION_TIME: 300, // 5 minutes
  
  /** Minimum time between OTP requests (seconds) */
  RESEND_COOLDOWN: 60, // 1 minute
  
  /** Maximum OTP attempts before lockout */
  MAX_ATTEMPTS: 5,
} as const;

/**
 * Authentication states.
 */
export const AUTH_STATES = {
  INITIAL: 'initial',
  EMAIL_ENTRY: 'email_entry',
  OTP_VERIFICATION: 'otp_verification',
  AUTHENTICATED: 'authenticated',
  ERROR: 'error',
} as const;

/**
 * Session storage keys.
 */
export const SESSION_KEYS = {
  AUTH_STATE: 'auth-state',
  PENDING_EMAIL: 'pending-email',
  OTP_ATTEMPTS: 'otp-attempts',
  LAST_OTP_REQUEST: 'last-otp-request',
} as const;

/**
 * API endpoints (relative to base URL).
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  VERIFY_OTP: '/auth/verify',
  RESEND_OTP: '/auth/resend',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
} as const;

/**
 * Error codes for authentication.
 */
export const AUTH_ERRORS = {
  INVALID_EMAIL: 'invalid_email',
  INVALID_OTP: 'invalid_otp',
  OTP_EXPIRED: 'otp_expired',
  TOO_MANY_ATTEMPTS: 'too_many_attempts',
  NETWORK_ERROR: 'network_error',
  UNKNOWN_ERROR: 'unknown_error',
} as const;

/**
 * Default error messages.
 */
export const AUTH_ERROR_MESSAGES = {
  [AUTH_ERRORS.INVALID_EMAIL]: 'Please enter a valid email address',
  [AUTH_ERRORS.INVALID_OTP]: 'Invalid verification code',
  [AUTH_ERRORS.OTP_EXPIRED]: 'Verification code has expired',
  [AUTH_ERRORS.TOO_MANY_ATTEMPTS]: 'Too many failed attempts. Please try again later',
  [AUTH_ERRORS.NETWORK_ERROR]: 'Network error. Please check your connection',
  [AUTH_ERRORS.UNKNOWN_ERROR]: 'Something went wrong. Please try again',
} as const;