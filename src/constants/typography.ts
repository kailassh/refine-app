/**
 * Typography constants for consistent text styling throughout the application.
 * 
 * This module defines standardized typography values including font families,
 * font sizes, font weights, and line heights to ensure consistent text
 * presentation across all components.
 * 
 * @fileoverview Centralized typography constants
 */

/**
 * Font family stacks for different text types.
 */
export const FONT_FAMILIES = {
  /** Primary font stack for body text and UI elements */
  PRIMARY: [
    'system-ui',
    'Avenir',
    'Helvetica',
    'Arial',
    'sans-serif',
  ].join(','),
  
  /** Monospace font stack for code and technical content */
  MONOSPACE: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ].join(','),
} as const;

/**
 * Font weight values for consistent text emphasis.
 */
export const FONT_WEIGHTS = {
  /** Light font weight: 300 */
  LIGHT: 300,
  /** Regular/normal font weight: 400 */
  REGULAR: 400,
  /** Medium font weight: 500 */
  MEDIUM: 500,
  /** Semi-bold font weight: 600 */
  SEMI_BOLD: 600,
  /** Bold font weight: 700 */
  BOLD: 700,
} as const;

/**
 * Font size values in rem units for scalable typography.
 * Base font size is 14px (0.875rem).
 */
export const FONT_SIZES = {
  /** Extra small: 0.625rem (10px) */
  XS: '0.625rem',
  /** Small: 0.75rem (12px) */
  SM: '0.75rem',
  /** Base: 0.875rem (14px) - Default font size */
  BASE: '0.875rem',
  /** Medium: 1rem (16px) */
  MD: '1rem',
  /** Large: 1.125rem (18px) */
  LG: '1.125rem',
  /** Extra large: 1.25rem (20px) */
  XL: '1.25rem',
  /** 2X large: 1.5rem (24px) */
  XXL: '1.5rem',
  /** 3X large: 1.875rem (30px) */
  XXXL: '1.875rem',
  /** 4X large: 2.25rem (36px) */
  XXXXL: '2.25rem',
} as const;

/**
 * Heading-specific font sizes following type scale.
 */
export const HEADING_SIZES = {
  /** H1 heading: 2.25rem (36px) */
  H1: FONT_SIZES.XXXXL,
  /** H2 heading: 1.875rem (30px) */
  H2: FONT_SIZES.XXXL,
  /** H3 heading: 1.5rem (24px) */
  H3: FONT_SIZES.XXL,
  /** H4 heading: 1.25rem (20px) */
  H4: FONT_SIZES.XL,
  /** H5 heading: 1.125rem (18px) */
  H5: FONT_SIZES.LG,
  /** H6 heading: 1rem (16px) */
  H6: FONT_SIZES.MD,
} as const;

/**
 * Line height values for different text contexts.
 */
export const LINE_HEIGHTS = {
  /** Tight line height: 1.2 - for headings */
  TIGHT: 1.2,
  /** Snug line height: 1.3 - for subheadings */
  SNUG: 1.3,
  /** Normal line height: 1.4 - for captions */
  NORMAL: 1.4,
  /** Relaxed line height: 1.5 - for body text */
  RELAXED: 1.5,
  /** Loose line height: 1.6 - for reading content */
  LOOSE: 1.6,
} as const;

/**
 * Letter spacing values for text adjustment.
 */
export const LETTER_SPACING = {
  /** Tighter letter spacing: -0.05em */
  TIGHTER: '-0.05em',
  /** Tight letter spacing: -0.025em */
  TIGHT: '-0.025em',
  /** Normal letter spacing: 0em */
  NORMAL: '0em',
  /** Wide letter spacing: 0.025em */
  WIDE: '0.025em',
  /** Wider letter spacing: 0.05em */
  WIDER: '0.05em',
  /** Widest letter spacing: 0.1em */
  WIDEST: '0.1em',
} as const;

/**
 * Text transform values.
 */
export const TEXT_TRANSFORMS = {
  /** No text transformation */
  NONE: 'none',
  /** Uppercase text transformation */
  UPPERCASE: 'uppercase',
  /** Lowercase text transformation */
  LOWERCASE: 'lowercase',
  /** Capitalize text transformation */
  CAPITALIZE: 'capitalize',
} as const;

/**
 * Complete typography variant configurations.
 * These match MUI's typography variants but with our custom values.
 */
export const TYPOGRAPHY_VARIANTS = {
  h1: {
    fontSize: HEADING_SIZES.H1,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    lineHeight: LINE_HEIGHTS.TIGHT,
    letterSpacing: LETTER_SPACING.TIGHT,
  },
  h2: {
    fontSize: HEADING_SIZES.H2,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    lineHeight: LINE_HEIGHTS.SNUG,
    letterSpacing: LETTER_SPACING.TIGHT,
  },
  h3: {
    fontSize: HEADING_SIZES.H3,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    lineHeight: LINE_HEIGHTS.SNUG,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  h4: {
    fontSize: HEADING_SIZES.H4,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    lineHeight: LINE_HEIGHTS.NORMAL,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  h5: {
    fontSize: HEADING_SIZES.H5,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    lineHeight: LINE_HEIGHTS.NORMAL,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  h6: {
    fontSize: HEADING_SIZES.H6,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    lineHeight: LINE_HEIGHTS.RELAXED,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  body1: {
    fontSize: FONT_SIZES.MD,
    fontWeight: FONT_WEIGHTS.REGULAR,
    lineHeight: LINE_HEIGHTS.RELAXED,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  body2: {
    fontSize: FONT_SIZES.BASE,
    fontWeight: FONT_WEIGHTS.REGULAR,
    lineHeight: LINE_HEIGHTS.RELAXED,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  button: {
    fontSize: FONT_SIZES.BASE,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    textTransform: TEXT_TRANSFORMS.NONE,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  caption: {
    fontSize: FONT_SIZES.SM,
    fontWeight: FONT_WEIGHTS.REGULAR,
    lineHeight: LINE_HEIGHTS.NORMAL,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  overline: {
    fontSize: FONT_SIZES.SM,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    textTransform: TEXT_TRANSFORMS.UPPERCASE,
    letterSpacing: LETTER_SPACING.WIDER,
  },
} as const;