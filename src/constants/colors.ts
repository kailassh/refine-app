/**
 * Color constants for consistent theming throughout the application.
 * 
 * This module defines standardized color values used across both light and dark themes.
 * Colors are defined using HSL values for better accessibility and theme consistency.
 * All colors follow the design system's color palette specifications.
 * 
 * @fileoverview Centralized color palette constants
 */

/**
 * Primary color variants - Teal color scheme.
 */
export const PRIMARY_COLORS = {
  /** Main primary color: mild teal */
  MAIN: 'hsl(173, 60%, 45%)',
  /** Light primary color: light teal */
  LIGHT: 'hsl(173, 40%, 60%)',
  /** Dark primary color: darker teal */
  DARK: 'hsl(173, 70%, 35%)',
  /** Primary contrast text: near white */
  CONTRAST_TEXT: 'hsl(0, 0%, 98%)',
  /** Primary color for dark mode: brighter teal */
  MAIN_DARK: 'hsl(173, 55%, 50%)',
  /** Light primary for dark mode */
  LIGHT_DARK: 'hsl(173, 45%, 65%)',
  /** Dark primary for dark mode */
  DARK_DARK: 'hsl(173, 65%, 40%)',
  /** Primary contrast for dark mode */
  CONTRAST_TEXT_DARK: 'hsl(240, 5.9%, 10%)',
} as const;

/**
 * Secondary color variants.
 */
export const SECONDARY_COLORS = {
  /** Main secondary color: light gray */
  MAIN: 'hsl(240, 4.8%, 95.9%)',
  /** Light secondary color */
  LIGHT: 'hsl(240, 4.8%, 98%)',
  /** Dark secondary color */
  DARK: 'hsl(240, 4.8%, 90%)',
  /** Secondary contrast text */
  CONTRAST_TEXT: 'hsl(240, 5.9%, 10%)',
  /** Secondary for dark mode */
  MAIN_DARK: 'hsl(240, 3.7%, 15.9%)',
  /** Light secondary for dark mode */
  LIGHT_DARK: 'hsl(240, 3.7%, 25%)',
  /** Dark secondary for dark mode */
  DARK_DARK: 'hsl(240, 3.7%, 10%)',
  /** Secondary contrast for dark mode */
  CONTRAST_TEXT_DARK: 'hsl(0, 0%, 98%)',
} as const;

/**
 * Error/destructive color variants.
 */
export const ERROR_COLORS = {
  /** Main error color: red */
  MAIN: 'hsl(0, 72%, 51%)',
  /** Light error color */
  LIGHT: 'hsl(0, 72%, 65%)',
  /** Dark error color */
  DARK: 'hsl(0, 72%, 40%)',
  /** Error contrast text */
  CONTRAST_TEXT: 'hsl(0, 0%, 98%)',
  /** Error for dark mode */
  MAIN_DARK: 'hsl(0, 62.8%, 30.6%)',
  /** Light error for dark mode */
  LIGHT_DARK: 'hsl(0, 62.8%, 45%)',
  /** Dark error for dark mode */
  DARK_DARK: 'hsl(0, 62.8%, 20%)',
  /** Error contrast for dark mode */
  CONTRAST_TEXT_DARK: 'hsl(0, 0%, 98%)',
} as const;

/**
 * Success color variants.
 */
export const SUCCESS_COLORS = {
  /** Main success color: green */
  MAIN: 'hsl(142, 76%, 36%)',
  /** Light success color */
  LIGHT: 'hsl(142, 76%, 50%)',
  /** Dark success color */
  DARK: 'hsl(142, 76%, 25%)',
  /** Success contrast text */
  CONTRAST_TEXT: 'hsl(0, 0%, 98%)',
} as const;

/**
 * Warning color variants.
 */
export const WARNING_COLORS = {
  /** Main warning color: orange */
  MAIN: 'hsl(38, 92%, 50%)',
  /** Light warning color */
  LIGHT: 'hsl(38, 92%, 65%)',
  /** Dark warning color */
  DARK: 'hsl(38, 92%, 35%)',
  /** Warning contrast text */
  CONTRAST_TEXT: 'hsl(240, 5.9%, 10%)',
} as const;

/**
 * Information color variants.
 */
export const INFO_COLORS = {
  /** Main info color: blue */
  MAIN: 'hsl(221, 83%, 53%)',
  /** Light info color */
  LIGHT: 'hsl(221, 83%, 68%)',
  /** Dark info color */
  DARK: 'hsl(221, 83%, 38%)',
  /** Info contrast text */
  CONTRAST_TEXT: 'hsl(0, 0%, 98%)',
} as const;

/**
 * Text color variants.
 */
export const TEXT_COLORS = {
  /** Primary text color: dark gray */
  PRIMARY: 'hsl(240, 10%, 3.9%)',
  /** Secondary text color: muted gray */
  SECONDARY: 'hsl(240, 3.8%, 45.1%)',
  /** Disabled text color */
  DISABLED: 'hsl(240, 3.8%, 60%)',
  /** Primary text for dark mode */
  PRIMARY_DARK: 'hsl(0, 0%, 98%)',
  /** Secondary text for dark mode */
  SECONDARY_DARK: 'hsl(240, 5%, 64.9%)',
  /** Disabled text for dark mode */
  DISABLED_DARK: 'hsl(240, 5%, 40%)',
} as const;

/**
 * Background color variants.
 */
export const BACKGROUND_COLORS = {
  /** Default background: white */
  DEFAULT: 'hsl(0, 0%, 100%)',
  /** Paper background: white */
  PAPER: 'hsl(0, 0%, 100%)',
  /** Muted background: light gray */
  MUTED: 'hsl(240, 4.8%, 95.9%)',
  /** Default background for dark mode */
  DEFAULT_DARK: 'hsl(240, 10%, 3.9%)',
  /** Paper background for dark mode */
  PAPER_DARK: 'hsl(240, 10%, 3.9%)',
  /** Muted background for dark mode */
  MUTED_DARK: 'hsl(240, 3.7%, 15.9%)',
} as const;

/**
 * Border color variants.
 */
export const BORDER_COLORS = {
  /** Default border: light gray */
  DEFAULT: 'hsl(240, 5.9%, 90%)',
  /** Muted border: very light gray */
  MUTED: 'hsl(240, 4.8%, 95.9%)',
  /** Focus border: primary color */
  FOCUS: PRIMARY_COLORS.MAIN,
  /** Error border: error color */
  ERROR: ERROR_COLORS.MAIN,
  /** Default border for dark mode */
  DEFAULT_DARK: 'hsl(240, 3.7%, 15.9%)',
  /** Muted border for dark mode */
  MUTED_DARK: 'hsl(240, 3.7%, 10%)',
  /** Focus border for dark mode */
  FOCUS_DARK: PRIMARY_COLORS.MAIN_DARK,
  /** Error border for dark mode */
  ERROR_DARK: ERROR_COLORS.MAIN_DARK,
} as const;

/**
 * Action color variants with opacity values.
 */
export const ACTION_COLORS = {
  /** Hover state opacity */
  HOVER_OPACITY: 0.04,
  /** Selected state opacity */
  SELECTED_OPACITY: 0.08,
  /** Disabled state opacity */
  DISABLED_OPACITY: 0.26,
  /** Disabled background opacity */
  DISABLED_BACKGROUND_OPACITY: 0.12,
  /** Focus outline opacity */
  FOCUS_OPACITY: 0.12,
  /** Hover state opacity for dark mode */
  HOVER_OPACITY_DARK: 0.08,
  /** Selected state opacity for dark mode */
  SELECTED_OPACITY_DARK: 0.16,
  /** Disabled state opacity for dark mode */
  DISABLED_OPACITY_DARK: 0.3,
  /** Disabled background opacity for dark mode */
  DISABLED_BACKGROUND_OPACITY_DARK: 0.12,
} as const;

/**
 * Utility colors for special use cases.
 */
export const UTILITY_COLORS = {
  /** Pure white */
  WHITE: 'hsl(0, 0%, 100%)',
  /** Pure black */
  BLACK: 'hsl(0, 0%, 0%)',
  /** Transparent */
  TRANSPARENT: 'transparent',
  /** Semi-transparent overlay */
  OVERLAY: 'hsla(0, 0%, 0%, 0.5)',
  /** Light overlay */
  OVERLAY_LIGHT: 'hsla(0, 0%, 0%, 0.1)',
} as const;