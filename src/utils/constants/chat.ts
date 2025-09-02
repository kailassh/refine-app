/**
 * Chat-related constants.
 * 
 * This module defines constants used throughout the chat features.
 */

/**
 * Default chat configuration values.
 */
export const CHAT_DEFAULTS = {
  /** Default sidebar collapsed state */
  SIDEBAR_COLLAPSED: false,
  
  /** Maximum message length */
  MAX_MESSAGE_LENGTH: 4000,
  
  /** Maximum chat title length */
  MAX_CHAT_TITLE_LENGTH: 100,
  
  /** Default messages per page for pagination */
  MESSAGES_PER_PAGE: 50,
  
  /** Auto-save interval for draft messages (ms) */
  AUTO_SAVE_INTERVAL: 2000,
  
  /** Typing indicator timeout (ms) */
  TYPING_TIMEOUT: 3000,
  
  /** Maximum number of chats to keep in history */
  MAX_CHATS: 50,
  
  /** Auto-save chats to localStorage */
  AUTO_SAVE: true,
  
  /** Delay for AI response simulation (ms) */
  RESPONSE_DELAY: 1000,
} as const;

/**
 * Message types.
 */
export const MESSAGE_TYPES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
} as const;

/**
 * Chat states.
 */
export const CHAT_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  TYPING: 'typing',
} as const;

/**
 * Storage keys for localStorage.
 */
export const STORAGE_KEYS = {
  SIDEBAR_STATE: 'sidebar-state',
  CHAT_DRAFTS: 'chat-drafts',
  USER_PREFERENCES: 'user-preferences',
  THEME: 'ui-theme',
  CHATS: 'refine-app-chats',
  CURRENT_CHAT_ID: 'refine-app-current-chat-id',
} as const;

/**
 * Breakpoint thresholds (matches Tailwind defaults).
 */
export const BREAKPOINTS = {
  MOBILE: 768,   // Below this is mobile
  TABLET: 1024,  // Between mobile and this is tablet, above is desktop
  DESKTOP: 1280, // Large desktop
} as const;

/**
 * Animation durations (ms).
 */
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

/**
 * API-related constants.
 */
export const API_CONSTANTS = {
  /** Request timeout (ms) */
  TIMEOUT: 30000,
  
  /** Retry attempts for failed requests */
  RETRY_ATTEMPTS: 3,
  
  /** Delay between retry attempts (ms) */
  RETRY_DELAY: 1000,
} as const;