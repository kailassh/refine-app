/**
 * Dimension constants for consistent spacing, sizing, and layout throughout the application.
 * 
 * This module provides standardized dimension values to ensure consistent
 * spacing, component sizing, and layout measurements across all components.
 * All values follow 8px grid system for optimal visual consistency.
 * 
 * @fileoverview Centralized dimension and spacing constants
 */

/**
 * Base spacing unit (8px) - All spacing should be multiples of this value
 */
export const BASE_SPACING_UNIT = 8;

/**
 * Standard spacing values based on 8px grid system.
 * Use these instead of hardcoded pixel values for consistent spacing.
 */
export const SPACING = {
  /** Extra small spacing: 4px (0.5 in MUI units) */
  XS: BASE_SPACING_UNIT * 0.5,
  /** Small spacing: 8px (1 in MUI units) */
  SM: BASE_SPACING_UNIT,
  /** Medium spacing: 16px (2 in MUI units) */
  MD: BASE_SPACING_UNIT * 2,
  /** Large spacing: 24px (3 in MUI units) */
  LG: BASE_SPACING_UNIT * 3,
  /** Extra large spacing: 32px (4 in MUI units) */
  XL: BASE_SPACING_UNIT * 4,
  /** Double extra large spacing: 48px (6 in MUI units) */
  XXL: BASE_SPACING_UNIT * 6,
  /** Triple extra large spacing: 64px (8 in MUI units) */
  XXXL: BASE_SPACING_UNIT * 8,
} as const;

/**
 * MUI-friendly spacing units (equivalent to theme.spacing values).
 * These can be used directly in sx props and MUI components.
 */
export const MUI_SPACING = {
  /** 0.5 units = 4px */
  HALF: 0.5,
  /** 1 unit = 8px */
  ONE: 1,
  /** 1.5 units = 12px */
  ONE_HALF: 1.5,
  /** 2 units = 16px */
  TWO: 2,
  /** 2.5 units = 20px */
  TWO_HALF: 2.5,
  /** 3 units = 24px */
  THREE: 3,
  /** 4 units = 32px */
  FOUR: 4,
  /** 5 units = 40px */
  FIVE: 5,
  /** 6 units = 48px */
  SIX: 6,
  /** 8 units = 64px */
  EIGHT: 8,
  /** 10 units = 80px */
  TEN: 10,
  /** 12 units = 96px */
  TWELVE: 12,
} as const;

/**
 * Border radius values for consistent component styling.
 */
export const BORDER_RADIUS = {
  /** Small radius: 4px - for small elements */
  SM: 4,
  /** Medium radius: 8px - default for most components */
  MD: 8,
  /** Large radius: 12px - for cards and larger elements */
  LG: 12,
  /** Extra large radius: 16px - for prominent elements */
  XL: 16,
  /** Round: 50% - for circular elements */
  ROUND: '50%',
  /** Full: 9999px - for pill-shaped elements */
  FULL: 9999,
} as const;

/**
 * Component height values for consistent sizing.
 */
export const HEIGHT = {
  /** Small component height: 32px */
  SM: 32,
  /** Medium component height: 36px */
  MD: 36,
  /** Large component height: 40px */
  LG: 40,
  /** Extra large component height: 48px */
  XL: 48,
  /** Header height: 64px */
  HEADER: 64,
  /** Button minimum heights */
  BUTTON: {
    SM: 32,
    MD: 36,
    LG: 40,
  },
} as const;

/**
 * Component width values for consistent sizing.
 */
export const WIDTH = {
  /** Sidebar width: 280px */
  SIDEBAR: 280,
  /** Sidebar collapsed width: 64px */
  SIDEBAR_COLLAPSED: 64,
  /** Modal default width: 480px */
  MODAL: 480,
  /** Modal large width: 640px */
  MODAL_LG: 640,
  /** Modal extra large width: 800px */
  MODAL_XL: 800,
} as const;

/**
 * Typography line height values.
 */
export const LINE_HEIGHT = {
  /** Tight line height: 1.2 - for headings */
  TIGHT: 1.2,
  /** Normal line height: 1.3 - for subheadings */
  NORMAL: 1.3,
  /** Relaxed line height: 1.4 - for captions */
  RELAXED: 1.4,
  /** Loose line height: 1.5 - for body text */
  LOOSE: 1.5,
} as const;

/**
 * Elevation/shadow levels for consistent depth.
 */
export const ELEVATION = {
  /** No shadow */
  NONE: 0,
  /** Subtle shadow for cards */
  LOW: 1,
  /** Medium shadow for dropdowns */
  MEDIUM: 2,
  /** High shadow for modals */
  HIGH: 3,
  /** Maximum shadow for tooltips */
  MAX: 4,
} as const;

/**
 * Z-index values for consistent layering.
 */
export const Z_INDEX = {
  /** Base level: 0 */
  BASE: 0,
  /** Dropdown level: 1000 */
  DROPDOWN: 1000,
  /** Modal backdrop level: 1200 */
  MODAL_BACKDROP: 1200,
  /** Modal content level: 1300 */
  MODAL: 1300,
  /** Tooltip level: 1500 */
  TOOLTIP: 1500,
  /** Notification level: 1600 */
  NOTIFICATION: 1600,
} as const;

/**
 * Animation duration values in milliseconds.
 */
export const ANIMATION_DURATION = {
  /** Fast animation: 150ms */
  FAST: 150,
  /** Normal animation: 200ms */
  NORMAL: 200,
  /** Slow animation: 300ms */
  SLOW: 300,
  /** Extra slow animation: 500ms */
  EXTRA_SLOW: 500,
} as const;

/**
 * Breakpoint values for responsive design.
 */
export const BREAKPOINTS = {
  /** Extra small screens: 0px */
  xs: 0,
  /** Small screens: 640px */
  sm: 640,
  /** Medium screens: 768px */
  md: 768,
  /** Large screens: 1024px */
  lg: 1024,
  /** Extra large screens: 1280px */
  xl: 1280,
} as const;