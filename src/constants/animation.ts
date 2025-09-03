/**
 * Animation constants for consistent transitions and timing throughout the application.
 * 
 * This module defines standardized animation durations, easing functions, and
 * transition configurations to ensure consistent motion design across all
 * components and interactions.
 * 
 * @fileoverview Animation timing and transition constants
 */

/**
 * Animation durations in milliseconds.
 * All animation timing should use these standardized values.
 */
export const ANIMATION_DURATION = {
  /** Ultra fast animations: 100ms - for micro-interactions */
  ULTRA_FAST: 100,
  /** Very fast animations: 150ms - for quick feedback */
  VERY_FAST: 150,
  /** Fast animations: 200ms - for most UI transitions */
  FAST: 200,
  /** Standard animations: 300ms - for normal transitions */
  STANDARD: 300,
  /** Medium animations: 500ms - for complex transitions */
  MEDIUM: 500,
  /** Slow animations: 750ms - for special effects */
  SLOW: 750,
  /** Very slow animations: 1000ms - for dramatic effects */
  VERY_SLOW: 1000,
  /** Extra slow animations: 1500ms - for loading states */
  EXTRA_SLOW: 1500,
} as const;

/**
 * CSS transition durations as strings.
 * Use these for CSS transition properties.
 */
export const TRANSITION_DURATION = {
  /** Ultra fast: 0.1s */
  ULTRA_FAST: '0.1s',
  /** Very fast: 0.15s */
  VERY_FAST: '0.15s',
  /** Fast: 0.2s */
  FAST: '0.2s',
  /** Standard: 0.3s */
  STANDARD: '0.3s',
  /** Medium: 0.5s */
  MEDIUM: '0.5s',
  /** Slow: 0.75s */
  SLOW: '0.75s',
  /** Very slow: 1s */
  VERY_SLOW: '1s',
  /** Extra slow: 1.5s */
  EXTRA_SLOW: '1.5s',
} as const;

/**
 * Easing functions for natural motion.
 */
export const EASING = {
  /** Linear easing - constant speed */
  LINEAR: 'linear',
  /** Ease - starts slow, speeds up, then slows down */
  EASE: 'ease',
  /** Ease in - starts slow, then speeds up */
  EASE_IN: 'ease-in',
  /** Ease out - starts fast, then slows down */
  EASE_OUT: 'ease-out',
  /** Ease in out - slow start and end, fast middle */
  EASE_IN_OUT: 'ease-in-out',
  /** Material Design standard easing */
  STANDARD: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  /** Material Design decelerate easing */
  DECELERATE: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  /** Material Design accelerate easing */
  ACCELERATE: 'cubic-bezier(0.4, 0.0, 1, 1)',
  /** Sharp easing for attention-grabbing animations */
  SHARP: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
} as const;

/**
 * Common transition configurations.
 */
export const TRANSITIONS = {
  /** Standard fade transition */
  FADE: {
    duration: TRANSITION_DURATION.FAST,
    easing: EASING.EASE_OUT,
    property: 'opacity',
  },
  /** Color transition for theme changes */
  COLOR: {
    duration: TRANSITION_DURATION.MEDIUM,
    easing: EASING.EASE_IN_OUT,
    property: 'color',
  },
  /** Background color transition */
  BACKGROUND: {
    duration: TRANSITION_DURATION.FAST,
    easing: EASING.EASE_IN_OUT,
    property: 'background-color',
  },
  /** Transform transition for movements */
  TRANSFORM: {
    duration: TRANSITION_DURATION.VERY_SLOW,
    easing: EASING.EASE_IN_OUT,
    property: 'transform',
  },
  /** All properties transition */
  ALL: {
    duration: TRANSITION_DURATION.FAST,
    easing: EASING.STANDARD,
    property: 'all',
  },
} as const;

/**
 * Specific component animation timings.
 */
export const COMPONENT_ANIMATIONS = {
  /** Button hover and focus animations */
  BUTTON: {
    HOVER_DURATION: ANIMATION_DURATION.FAST,
    FOCUS_DURATION: ANIMATION_DURATION.VERY_FAST,
    PRESS_DURATION: ANIMATION_DURATION.ULTRA_FAST,
  },
  /** Modal and dialog animations */
  MODAL: {
    ENTER_DURATION: ANIMATION_DURATION.STANDARD,
    EXIT_DURATION: ANIMATION_DURATION.FAST,
    BACKDROP_DURATION: ANIMATION_DURATION.FAST,
  },
  /** Tooltip animations */
  TOOLTIP: {
    SHOW_DELAY: ANIMATION_DURATION.MEDIUM,
    HIDE_DELAY: ANIMATION_DURATION.ULTRA_FAST,
    TRANSITION_DURATION: ANIMATION_DURATION.FAST,
  },
  /** Loading spinner animations */
  SPINNER: {
    ROTATION_DURATION: ANIMATION_DURATION.VERY_SLOW,
    FADE_DURATION: ANIMATION_DURATION.FAST,
  },
  /** Progress bar animations */
  PROGRESS: {
    UPDATE_DURATION: ANIMATION_DURATION.VERY_SLOW,
    FADE_DURATION: ANIMATION_DURATION.STANDARD,
  },
  /** Navigation animations */
  NAVIGATION: {
    PAGE_TRANSITION: ANIMATION_DURATION.STANDARD,
    MENU_SLIDE: ANIMATION_DURATION.FAST,
    DROPDOWN: ANIMATION_DURATION.FAST,
  },
  /** Form field animations */
  FORM: {
    VALIDATION_FEEDBACK: ANIMATION_DURATION.FAST,
    FIELD_FOCUS: ANIMATION_DURATION.VERY_FAST,
    ERROR_SHAKE: ANIMATION_DURATION.MEDIUM,
  },
  /** Timer and countdown animations */
  TIMER: {
    COLOR_TRANSITION: ANIMATION_DURATION.MEDIUM,
    PROGRESS_UPDATE: ANIMATION_DURATION.VERY_SLOW,
    TICK_ANIMATION: ANIMATION_DURATION.FAST,
  },
  /** Chat and messaging animations */
  CHAT: {
    MESSAGE_APPEAR: ANIMATION_DURATION.FAST,
    TYPING_INDICATOR: ANIMATION_DURATION.VERY_SLOW,
    SCROLL_SMOOTH: ANIMATION_DURATION.STANDARD,
  },
} as const;

/**
 * Delay constants for staged animations.
 */
export const ANIMATION_DELAY = {
  /** No delay */
  NONE: 0,
  /** Short delay: 50ms */
  SHORT: 50,
  /** Standard delay: 100ms */
  STANDARD: 100,
  /** Medium delay: 200ms */
  MEDIUM: 200,
  /** Long delay: 500ms */
  LONG: 500,
  /** Focus management delay */
  FOCUS_DELAY: 100,
  /** Retry delay */
  RETRY_DELAY: 1000,
} as const;

/**
 * Stagger delays for sequential animations.
 */
export const STAGGER_DELAY = {
  /** List item stagger: 50ms */
  LIST_ITEM: 50,
  /** Card stagger: 100ms */
  CARD: 100,
  /** Button group stagger: 25ms */
  BUTTON_GROUP: 25,
  /** Menu item stagger: 30ms */
  MENU_ITEM: 30,
} as const;