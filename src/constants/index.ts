/**
 * Centralized constants export barrel file.
 * 
 * This module provides a single import point for all application constants,
 * making it easy to import any constant values throughout the application
 * while maintaining organization and preventing circular dependencies.
 * 
 * @fileoverview Barrel file for all application constants
 */

// Re-export all constants from individual modules
export * from './colors';
export { 
  BASE_SPACING_UNIT,
  SPACING,
  MUI_SPACING,
  BORDER_RADIUS,
  HEIGHT,
  WIDTH,
  LINE_HEIGHT,
  ELEVATION,
  Z_INDEX,
  BREAKPOINTS
} from './dimensions';
export * from './typography';
export * from './ui';
export * from './components';
export * from './validation';
export * from './animation';

// Re-export existing auth and chat constants for backwards compatibility
// Note: Avoiding duplicate exports by being selective
export { 
  OTP_CONFIG,
  AUTH_STATES,
  SESSION_KEYS,
  AUTH_ENDPOINTS,
  AUTH_ERRORS,
  AUTH_ERROR_MESSAGES
} from '../utils/constants/auth';

export {
  CHAT_DEFAULTS,
  MESSAGE_TYPES,
  CHAT_STATES,
  STORAGE_KEYS as CHAT_STORAGE_KEYS,
  API_CONSTANTS
} from '../utils/constants/chat';