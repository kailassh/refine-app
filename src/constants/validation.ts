/**
 * Validation constants for form inputs and data validation.
 * 
 * This module defines constants used for form validation, input constraints,
 * and data validation patterns throughout the application. All validation
 * rules and limits are centralized here for consistency and maintainability.
 * 
 * @fileoverview Validation constants and patterns
 */

/**
 * OTP (One-Time Password) validation constants.
 */
export const OTP_VALIDATION = {
  /** Length of OTP code */
  LENGTH: 6,
  /** Regex pattern for OTP validation (6 digits only) */
  PATTERN: /^\d{6}$/,
  /** Regex to extract digits from input */
  DIGITS_ONLY: /\D/g,
  /** HTML input pattern for mobile keyboards */
  INPUT_PATTERN: '[0-9]*',
  /** Maximum length for input field */
  MAX_LENGTH: 6,
} as const;

/**
 * Email validation constants.
 */
export const EMAIL_VALIDATION = {
  /** Basic email regex pattern */
  PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  /** Maximum email length */
  MAX_LENGTH: 320,
  /** Minimum email length */
  MIN_LENGTH: 3,
} as const;

/**
 * Text input validation constants.
 */
export const TEXT_VALIDATION = {
  /** Maximum length for short text inputs */
  SHORT_TEXT_MAX: 100,
  /** Maximum length for medium text inputs */
  MEDIUM_TEXT_MAX: 500,
  /** Maximum length for long text inputs */
  LONG_TEXT_MAX: 2000,
  /** Maximum length for chat messages */
  MESSAGE_MAX: 4000,
  /** Minimum length for required text */
  MIN_LENGTH: 1,
} as const;

/**
 * Password validation constants.
 */
export const PASSWORD_VALIDATION = {
  /** Minimum password length */
  MIN_LENGTH: 8,
  /** Maximum password length */
  MAX_LENGTH: 128,
  /** Pattern for strong password (at least one letter, one number) */
  STRONG_PATTERN: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
} as const;

/**
 * Form field validation messages.
 */
export const VALIDATION_MESSAGES = {
  /** Required field messages */
  REQUIRED: {
    EMAIL: 'Email address is required',
    OTP: 'Verification code is required',
    PASSWORD: 'Password is required',
    GENERAL: 'This field is required',
  },
  /** Format validation messages */
  FORMAT: {
    EMAIL: 'Please enter a valid email address',
    OTP: 'Verification code must be 6 digits',
    OTP_NUMBERS_ONLY: 'Verification code must contain only numbers',
    PASSWORD_WEAK: 'Password must contain at least one letter and one number',
  },
  /** Length validation messages */
  LENGTH: {
    EMAIL_TOO_LONG: `Email address must be less than ${EMAIL_VALIDATION.MAX_LENGTH} characters`,
    PASSWORD_TOO_SHORT: `Password must be at least ${PASSWORD_VALIDATION.MIN_LENGTH} characters`,
    PASSWORD_TOO_LONG: `Password must be less than ${PASSWORD_VALIDATION.MAX_LENGTH} characters`,
    TEXT_TOO_LONG: 'Text is too long',
    MESSAGE_TOO_LONG: `Message must be less than ${TEXT_VALIDATION.MESSAGE_MAX} characters`,
  },
} as const;

/**
 * Input constraints for different field types.
 */
export const INPUT_CONSTRAINTS = {
  /** OTP input constraints */
  OTP: {
    maxLength: OTP_VALIDATION.MAX_LENGTH,
    pattern: OTP_VALIDATION.INPUT_PATTERN,
    inputMode: 'numeric' as const,
    autoComplete: 'one-time-code' as const,
  },
  /** Email input constraints */
  EMAIL: {
    type: 'email' as const,
    maxLength: EMAIL_VALIDATION.MAX_LENGTH,
    autoComplete: 'email' as const,
    inputMode: 'email' as const,
  },
  /** Password input constraints */
  PASSWORD: {
    type: 'password' as const,
    maxLength: PASSWORD_VALIDATION.MAX_LENGTH,
    minLength: PASSWORD_VALIDATION.MIN_LENGTH,
    autoComplete: 'current-password' as const,
  },
  /** Text input constraints */
  TEXT: {
    type: 'text' as const,
    maxLength: TEXT_VALIDATION.MEDIUM_TEXT_MAX,
  },
  /** Textarea constraints for long text */
  TEXTAREA: {
    maxLength: TEXT_VALIDATION.LONG_TEXT_MAX,
    rows: 4,
  },
  /** Message input constraints */
  MESSAGE: {
    type: 'text' as const,
    maxLength: TEXT_VALIDATION.MESSAGE_MAX,
    placeholder: 'Type your message...',
  },
} as const;