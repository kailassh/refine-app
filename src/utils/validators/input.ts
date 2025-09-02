/**
 * General input validation utilities.
 * 
 * This module provides validation functions for various types of user input.
 */

/**
 * Check if a string is empty or only whitespace.
 * 
 * @param value - String to check
 * @returns True if empty or whitespace only
 */
export const isEmpty = (value: string): boolean => {
  return !value || value.trim().length === 0;
};

/**
 * Check if a string meets minimum length requirement.
 * 
 * @param value - String to check
 * @param minLength - Minimum required length
 * @returns True if meets minimum length
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

/**
 * Check if a string exceeds maximum length.
 * 
 * @param value - String to check
 * @param maxLength - Maximum allowed length
 * @returns True if within maximum length
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

/**
 * Validate message content.
 * 
 * @param message - Message content to validate
 * @param minLength - Minimum message length (default: 1)
 * @param maxLength - Maximum message length (default: 4000)
 * @returns Error message if invalid, null if valid
 */
export const validateMessage = (
  message: string,
  minLength: number = 1,
  maxLength: number = 4000
): string | null => {
  if (isEmpty(message)) {
    return 'Message cannot be empty';
  }
  
  if (!hasMinLength(message, minLength)) {
    return `Message must be at least ${minLength} character${minLength === 1 ? '' : 's'}`;
  }
  
  if (!hasMaxLength(message, maxLength)) {
    return `Message cannot exceed ${maxLength} characters`;
  }
  
  return null;
};

/**
 * Validate chat title.
 * 
 * @param title - Chat title to validate
 * @param maxLength - Maximum title length (default: 100)
 * @returns Error message if invalid, null if valid
 */
export const validateChatTitle = (title: string, maxLength: number = 100): string | null => {
  if (isEmpty(title)) {
    return 'Title cannot be empty';
  }
  
  if (!hasMaxLength(title, maxLength)) {
    return `Title cannot exceed ${maxLength} characters`;
  }
  
  return null;
};

/**
 * Sanitize user input by removing potentially harmful characters.
 * 
 * @param input - Input string to sanitize
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Check if input contains only allowed characters.
 * 
 * @param input - Input to check
 * @param allowedPattern - Regex pattern for allowed characters
 * @returns True if input contains only allowed characters
 */
export const hasAllowedCharacters = (input: string, allowedPattern: RegExp): boolean => {
  return allowedPattern.test(input);
};