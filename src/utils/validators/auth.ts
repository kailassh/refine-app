/**
 * Authentication validation utilities.
 * 
 * This module provides validation functions for authentication-related inputs.
 */

/**
 * Validate email address format.
 * 
 * @param email - Email address to validate
 * @returns True if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Get email validation error message.
 * 
 * @param email - Email address to validate
 * @returns Error message if invalid, null if valid
 */
export const getEmailError = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email is required';
  }
  
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

/**
 * Validate OTP token format.
 * 
 * @param token - OTP token to validate
 * @param expectedLength - Expected token length (default: 6)
 * @returns True if token is valid, false otherwise
 */
export const isValidOTP = (token: string, expectedLength: number = 6): boolean => {
  const cleanToken = token.replace(/\s/g, '');
  return /^\d+$/.test(cleanToken) && cleanToken.length === expectedLength;
};

/**
 * Get OTP validation error message.
 * 
 * @param token - OTP token to validate
 * @param expectedLength - Expected token length (default: 6)
 * @returns Error message if invalid, null if valid
 */
export const getOTPError = (token: string, expectedLength: number = 6): string | null => {
  if (!token.trim()) {
    return 'Verification code is required';
  }
  
  const cleanToken = token.replace(/\s/g, '');
  
  if (!/^\d+$/.test(cleanToken)) {
    return 'Verification code must contain only numbers';
  }
  
  if (cleanToken.length !== expectedLength) {
    return `Verification code must be ${expectedLength} digits`;
  }
  
  return null;
};

/**
 * Clean and format OTP token for display.
 * 
 * @param token - OTP token to format
 * @returns Formatted token (e.g., "123 456")
 */
export const formatOTPDisplay = (token: string): string => {
  const cleanToken = token.replace(/\s/g, '');
  
  // Format as groups of 3 digits for 6-digit codes
  if (cleanToken.length <= 6) {
    return cleanToken.replace(/(\d{3})(\d{1,3})/, '$1 $2').trim();
  }
  
  return cleanToken;
};

/**
 * Clean OTP token for API submission.
 * 
 * @param token - OTP token to clean
 * @returns Clean token with no spaces
 */
export const cleanOTPToken = (token: string): string => {
  return token.replace(/\s/g, '');
};