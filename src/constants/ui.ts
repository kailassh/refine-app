/**
 * UI-specific constants for component styling and behavior.
 * 
 * This module defines constants used throughout the UI components
 * including component-specific dimensions, animations, and styling values.
 * 
 * @fileoverview UI component constants and styling values
 */

/**
 * Input field configurations.
 */
export const INPUT_CONFIG = {
  /** Default input height in px */
  DEFAULT_HEIGHT: 40,
  /** Small input height in px */
  SMALL_HEIGHT: 32,
  /** Large input height in px */
  LARGE_HEIGHT: 48,
  /** Input padding horizontal in px */
  PADDING_X: 12,
  /** Input padding vertical in px */
  PADDING_Y: 8,
  /** Input border width in px */
  BORDER_WIDTH: 1,
  /** Focus border width in px */
  FOCUS_BORDER_WIDTH: 2,
} as const;

/**
 * Button configurations and sizes.
 */
export const BUTTON_CONFIG = {
  /** Button height variants */
  HEIGHT: {
    SMALL: 32,
    MEDIUM: 36,
    LARGE: 40,
  },
  /** Button padding variants */
  PADDING: {
    SMALL: {
      X: 12,
      Y: 4,
    },
    MEDIUM: {
      X: 16,
      Y: 8,
    },
    LARGE: {
      X: 24,
      Y: 10,
    },
  },
  /** Button border radius */
  BORDER_RADIUS: 8,
  /** Icon button size */
  ICON_SIZE: 24,
  /** Loading spinner size */
  LOADING_SPINNER_SIZE: 16,
} as const;

/**
 * Card component configurations.
 */
export const CARD_CONFIG = {
  /** Default card padding in px */
  PADDING: 16,
  /** Large card padding in px */
  PADDING_LG: 24,
  /** Card border radius in px */
  BORDER_RADIUS: 12,
  /** Card border width in px */
  BORDER_WIDTH: 1,
  /** Card elevation/shadow level */
  ELEVATION: 1,
} as const;

/**
 * Modal and dialog configurations.
 */
export const MODAL_CONFIG = {
  /** Modal backdrop z-index */
  BACKDROP_Z_INDEX: 1200,
  /** Modal content z-index */
  CONTENT_Z_INDEX: 1300,
  /** Default modal width in px */
  DEFAULT_WIDTH: 480,
  /** Large modal width in px */
  LARGE_WIDTH: 640,
  /** Extra large modal width in px */
  EXTRA_LARGE_WIDTH: 800,
  /** Modal max height as viewport percentage */
  MAX_HEIGHT: '90vh',
  /** Modal padding in px */
  PADDING: 24,
  /** Modal border radius in px */
  BORDER_RADIUS: 12,
} as const;

/**
 * Header/navigation configurations.
 */
export const HEADER_CONFIG = {
  /** Header height in px */
  HEIGHT: 64,
  /** Header padding horizontal in px */
  PADDING_X: 24,
  /** Header z-index */
  Z_INDEX: 1000,
  /** Header border width in px */
  BORDER_WIDTH: 1,
} as const;

/**
 * Sidebar configurations.
 */
export const SIDEBAR_CONFIG = {
  /** Sidebar width when expanded in px */
  WIDTH: 280,
  /** Sidebar width when collapsed in px */
  COLLAPSED_WIDTH: 64,
  /** Sidebar z-index */
  Z_INDEX: 900,
  /** Sidebar transition duration in ms */
  TRANSITION_DURATION: 200,
} as const;

/**
 * Form configurations.
 */
export const FORM_CONFIG = {
  /** Form field spacing in px */
  FIELD_SPACING: 16,
  /** Form section spacing in px */
  SECTION_SPACING: 24,
  /** Form label margin bottom in px */
  LABEL_MARGIN_BOTTOM: 8,
  /** Form helper text margin top in px */
  HELPER_TEXT_MARGIN_TOP: 4,
  /** Form max width in px */
  MAX_WIDTH: 480,
} as const;

/**
 * Animation and transition configurations.
 */
export const ANIMATION_CONFIG = {
  /** Easing functions */
  EASING: {
    /** Standard easing for most animations */
    STANDARD: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    /** Decelerate easing for enter animations */
    DECELERATE: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    /** Accelerate easing for exit animations */
    ACCELERATE: 'cubic-bezier(0.4, 0.0, 1, 1)',
  },
  /** Duration values in milliseconds */
  DURATION: {
    /** Very fast animations */
    SHORTEST: 150,
    /** Fast animations */
    SHORTER: 200,
    /** Standard animations */
    SHORT: 250,
    /** Standard animations */
    STANDARD: 300,
    /** Slower animations */
    COMPLEX: 375,
    /** Slowest animations */
    ENTERING_SCREEN: 225,
    /** Exit animations */
    LEAVING_SCREEN: 195,
  },
} as const;

/**
 * Scroll and viewport configurations.
 */
export const SCROLL_CONFIG = {
  /** Smooth scroll behavior */
  BEHAVIOR: 'smooth' as const,
  /** Scroll offset for anchor links */
  OFFSET: 80,
  /** Virtual scroll item height */
  ITEM_HEIGHT: 48,
  /** Infinite scroll threshold */
  THRESHOLD: 300,
} as const;

/**
 * Focus and accessibility configurations.
 */
export const FOCUS_CONFIG = {
  /** Focus outline width in px */
  OUTLINE_WIDTH: 2,
  /** Focus outline offset in px */
  OUTLINE_OFFSET: 2,
  /** Focus outline style */
  OUTLINE_STYLE: 'solid' as const,
  /** Tab index for interactive elements */
  TAB_INDEX: 0,
  /** Tab index for non-interactive elements */
  NO_TAB_INDEX: -1,
} as const;

/**
 * Loading and skeleton configurations.
 */
export const LOADING_CONFIG = {
  /** Skeleton animation duration in seconds */
  SKELETON_DURATION: 1.5,
  /** Spinner size variants */
  SPINNER_SIZE: {
    SMALL: 16,
    MEDIUM: 24,
    LARGE: 32,
  },
  /** Loading delay before showing indicator in ms */
  DELAY: 200,
} as const;

/**
 * Notification/toast configurations.
 */
export const NOTIFICATION_CONFIG = {
  /** Default notification duration in ms */
  DEFAULT_DURATION: 4000,
  /** Success notification duration in ms */
  SUCCESS_DURATION: 3000,
  /** Error notification duration in ms */
  ERROR_DURATION: 6000,
  /** Notification max width in px */
  MAX_WIDTH: 400,
  /** Notification z-index */
  Z_INDEX: 1600,
} as const;