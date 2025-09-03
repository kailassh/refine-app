/**
 * Component-specific constants for consistent sizing, layout, and behavior.
 * 
 * This module defines standardized values for individual component dimensions,
 * thresholds, and configuration options. These constants ensure consistent
 * appearance and behavior across all component instances.
 * 
 * @fileoverview Component-specific dimension and behavior constants
 */

/**
 * OTP verification component constants.
 */
export const OTP_COMPONENT = {
  /** Main container maximum width */
  CONTAINER_MAX_WIDTH: 448,
  /** Input field maximum width */
  INPUT_MAX_WIDTH: 240,
  /** Letter spacing for OTP input */
  INPUT_LETTER_SPACING: '0.5em',
  /** Padding adjustment for letter spacing */
  INPUT_PADDING_LEFT: '0.25em',
  /** Font size for OTP input */
  INPUT_FONT_SIZE: '1.5rem',
  /** Default timer duration in seconds */
  DEFAULT_TIMER_DURATION: 120,
  /** Delay before focusing input after resend */
  FOCUS_DELAY: 100,
  /** Border radius for input field */
  INPUT_BORDER_RADIUS: 2,
  /** Button styling constants */
  BUTTONS: {
    /** Vertical padding for submit button */
    SUBMIT_PADDING_Y: 1.5,
    /** Font weight for buttons */
    FONT_WEIGHT: 500,
    /** Font size for action buttons */
    ACTION_FONT_SIZE: '0.875rem',
    /** Horizontal padding for action buttons */
    ACTION_PADDING_X: 1,
    /** Vertical padding for action buttons */
    ACTION_PADDING_Y: 0.5,
  },
  /** Loading spinner size */
  LOADING_SPINNER_SIZE: 16,
  /** Section spacing */
  SECTION_SPACING: 4,
  /** Header spacing */
  HEADER_SPACING: 6,
  /** Form spacing */
  FORM_SPACING: 2,
} as const;

/**
 * Timer component constants.
 */
export const TIMER_COMPONENT = {
  /** Default timer duration in seconds */
  DEFAULT_DURATION: 120,
  /** Progress bar maximum width */
  PROGRESS_MAX_WIDTH: 300,
  /** Progress bar height */
  PROGRESS_HEIGHT: 8,
  /** Progress bar border radius */
  PROGRESS_BORDER_RADIUS: 1,
  /** Color threshold percentages */
  THRESHOLDS: {
    /** High time remaining (green): > 66% */
    HIGH: 66,
    /** Medium time remaining (orange): 33-66% */
    MEDIUM: 33,
    /** Low time remaining (red): < 33% */
    LOW: 0,
  },
  /** Color values for different time states */
  COLORS: {
    /** Color when time remaining is high */
    HIGH: 'primary.main',
    /** Color when time remaining is medium */
    MEDIUM: 'hsl(36, 100%, 50%)', // Orange
    /** Color when time remaining is low */
    LOW: 'error.main',
  },
  /** Progress bar color variants */
  PROGRESS_COLORS: {
    HIGH: 'primary' as const,
    MEDIUM: 'warning' as const,
    LOW: 'error' as const,
  },
  /** Gap between timer elements */
  ELEMENT_GAP: 3,
} as const;

/**
 * Error boundary component constants.
 */
export const ERROR_BOUNDARY_COMPONENT = {
  /** Minimum height for error display */
  MIN_HEIGHT: 384,
  /** Maximum width for error container */
  CONTAINER_MAX_WIDTH: 448,
  /** Icon container dimensions */
  ICON_CONTAINER: {
    WIDTH: 80,
    HEIGHT: 80,
    BORDER_RADIUS: '50%',
  },
  /** Error details section */
  ERROR_DETAILS: {
    MAX_HEIGHT: 200,
    FONT_SIZE: '0.75rem',
  },
} as const;

/**
 * Chat input component constants.
 */
export const CHAT_INPUT_COMPONENT = {
  /** Maximum width for chat input container */
  CONTAINER_MAX_WIDTH: 1024,
  /** Input field minimum height */
  INPUT_MIN_HEIGHT: 44,
  /** Input field maximum height */
  INPUT_MAX_HEIGHT: 200,
  /** Border radius for input container */
  BORDER_RADIUS: 24,
  /** Send button size */
  SEND_BUTTON_SIZE: 36,
  /** Padding around input area */
  CONTAINER_PADDING: 16,
} as const;

/**
 * Loading indicator component constants.
 */
export const LOADING_COMPONENT = {
  /** Default spinner sizes */
  SPINNER_SIZE: {
    SMALL: 16,
    MEDIUM: 24,
    LARGE: 32,
    EXTRA_LARGE: 48,
  },
  /** Skeleton loading dimensions */
  SKELETON: {
    TEXT_HEIGHT: 20,
    AVATAR_SIZE: 40,
    CARD_HEIGHT: 256,
    BORDER_RADIUS: 2,
  },
  /** Loading text widths for skeleton */
  SKELETON_WIDTHS: {
    FULL: '100%',
    LARGE: '75%',
    MEDIUM: '50%',
    SMALL: '25%',
  },
} as const;

/**
 * Message bubble component constants.
 */
export const MESSAGE_BUBBLE_COMPONENT = {
  /** Maximum width percentages for different screen sizes */
  MAX_WIDTH: {
    XS: '75%',
    SM: '60%',
    MD: '50%',
    LG: '45%',
    XL: '40%',
  },
  /** Avatar size for assistant messages */
  AVATAR_SIZE: 32,
  /** Avatar margin from message */
  AVATAR_MARGIN: 1.5,
  /** Border radius for message bubbles */
  BORDER_RADIUS: 2,
  /** Special border radius for message tails */
  TAIL_BORDER_RADIUS: 0.5,
  /** Minimum height for loading messages */
  LOADING_MIN_HEIGHT: 48,
  /** Spacer width for user messages */
  SPACER_WIDTH: 44,
  /** Message spacing between bubbles */
  MESSAGE_SPACING: 3,
} as const;

/**
 * Header component constants.
 */
export const HEADER_COMPONENT = {
  /** Header height */
  HEIGHT: 64,
  /** Header horizontal padding */
  PADDING_X: 24,
  /** Logo height */
  LOGO_HEIGHT: 32,
  /** Avatar size in header */
  AVATAR_SIZE: 32,
  /** Menu button size */
  MENU_BUTTON_SIZE: 40,
} as const;

/**
 * Modal and dialog component constants.
 */
export const MODAL_COMPONENT = {
  /** Default modal widths */
  WIDTH: {
    SMALL: 400,
    MEDIUM: 600,
    LARGE: 800,
    EXTRA_LARGE: 1000,
  },
  /** Maximum modal height as viewport percentage */
  MAX_HEIGHT: '90vh',
  /** Modal padding */
  PADDING: 24,
  /** Modal border radius */
  BORDER_RADIUS: 12,
  /** Backdrop z-index */
  BACKDROP_Z_INDEX: 1200,
  /** Modal content z-index */
  CONTENT_Z_INDEX: 1300,
} as const;

/**
 * Button component constants.
 */
export const BUTTON_COMPONENT = {
  /** Button heights for different sizes */
  HEIGHT: {
    SMALL: 32,
    MEDIUM: 36,
    LARGE: 40,
    EXTRA_LARGE: 48,
  },
  /** Button padding for different sizes */
  PADDING: {
    SMALL: { X: 12, Y: 4 },
    MEDIUM: { X: 16, Y: 8 },
    LARGE: { X: 24, Y: 12 },
  },
  /** Icon sizes for buttons */
  ICON_SIZE: {
    SMALL: 16,
    MEDIUM: 20,
    LARGE: 24,
  },
  /** Loading spinner sizes for buttons */
  LOADING_SIZE: {
    SMALL: 14,
    MEDIUM: 16,
    LARGE: 20,
  },
} as const;

/**
 * Form component constants.
 */
export const FORM_COMPONENT = {
  /** Maximum form width */
  MAX_WIDTH: 480,
  /** Field spacing */
  FIELD_SPACING: 16,
  /** Section spacing */
  SECTION_SPACING: 24,
  /** Label margin bottom */
  LABEL_MARGIN: 8,
  /** Helper text margin top */
  HELPER_MARGIN: 4,
} as const;

/**
 * Navigation component constants.
 */
export const NAVIGATION_COMPONENT = {
  /** Sidebar width when expanded */
  SIDEBAR_WIDTH: 280,
  /** Sidebar width when collapsed */
  SIDEBAR_COLLAPSED_WIDTH: 64,
  /** Navigation item height */
  NAV_ITEM_HEIGHT: 44,
  /** Navigation item padding */
  NAV_ITEM_PADDING: 12,
  /** Navigation icon size */
  NAV_ICON_SIZE: 20,
} as const;

/**
 * Card component constants.
 */
export const CARD_COMPONENT = {
  /** Default card padding */
  PADDING: 16,
  /** Large card padding */
  PADDING_LARGE: 24,
  /** Card border radius */
  BORDER_RADIUS: 12,
  /** Card elevation levels */
  ELEVATION: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 4,
  },
} as const;