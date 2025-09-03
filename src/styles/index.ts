/**
 * Reusable style objects and sx prop patterns for consistent MUI styling.
 * 
 * This module provides standardized style objects that can be reused across
 * components to ensure visual consistency and reduce code duplication.
 * All styles use design system constants for maintainability.
 * 
 * @fileoverview Centralized MUI style patterns and utilities
 */

import type { SxProps, Theme } from '@mui/material/styles';
import {
  SPACING,
  MUI_SPACING,
  BORDER_RADIUS,
  HEIGHT,
  Z_INDEX,
  ANIMATION_DURATION,
  FOCUS_CONFIG,
} from '../constants';

/**
 * Common flex layout patterns.
 */
export const flexStyles = {
  /** Flex container with row direction and center alignment */
  centerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as const,

  /** Flex container with column direction and center alignment */
  centerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as const,

  /** Flex container with row direction, space between items */
  spaceBetweenRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as const,

  /** Flex container with row direction, items aligned to start */
  startRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  } as const,

  /** Flex container with row direction, items aligned to end */
  endRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  } as const,

  /** Flex container with column direction, full height */
  fullHeightColumn: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  } as const,

  /** Flex item that grows to fill available space */
  grow: {
    flexGrow: 1,
  } as const,
} as const;

/**
 * Common positioning patterns.
 */
export const positionStyles = {
  /** Absolute positioning at top-left */
  absoluteTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  } as const,

  /** Absolute positioning at top-right */
  absoluteTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  } as const,

  /** Absolute positioning centered */
  absoluteCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  } as const,

  /** Fixed positioning with full viewport coverage */
  fixedFullscreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as const,

  /** Sticky positioning at top */
  stickyTop: {
    position: 'sticky',
    top: 0,
    zIndex: Z_INDEX.DROPDOWN,
  } as const,
} as const;

/**
 * Common spacing patterns.
 */
export const spacingStyles = {
  /** Standard padding for containers */
  containerPadding: {
    padding: SPACING.MD,
  } as const,

  /** Large padding for main sections */
  sectionPadding: {
    padding: SPACING.LG,
  } as const,

  /** Standard margin bottom for stacked elements */
  stackedMargin: {
    marginBottom: SPACING.MD,
  } as const,

  /** No margin/padding reset */
  noSpacing: {
    margin: 0,
    padding: 0,
  } as const,
} as const;

/**
 * Common card and container styles.
 */
export const containerStyles = {
  /** Standard card container */
  card: {
    borderRadius: `${BORDER_RADIUS.LG}px`,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    padding: SPACING.LG,
    boxShadow: 'none',
  } as const,

  /** Simple bordered container */
  bordered: {
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: `${BORDER_RADIUS.MD}px`,
    padding: SPACING.MD,
  } as const,

  /** Modal container styles */
  modal: {
    backgroundColor: 'background.paper',
    borderRadius: `${BORDER_RADIUS.LG}px`,
    padding: SPACING.LG,
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: 24,
  } as const,

  /** Page container with max width and centering */
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `${SPACING.LG}px ${SPACING.MD}px`,
  } as const,
} as const;

/**
 * Form and input styles.
 */
export const formStyles = {
  /** Standard form container */
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.MD,
    width: '100%',
    maxWidth: '400px',
  } as const,

  /** Form section with spacing */
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.SM,
    marginBottom: SPACING.LG,
  } as const,

  /** Input field group */
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.XS,
  } as const,

  /** Form actions/buttons container */
  actions: {
    display: 'flex',
    gap: SPACING.SM,
    justifyContent: 'flex-end',
    marginTop: SPACING.LG,
  } as const,
} as const;

/**
 * Navigation and header styles.
 */
export const navigationStyles = {
  /** Standard header styles */
  header: {
    height: HEIGHT.HEADER,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${SPACING.LG}px`,
    borderBottom: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    position: 'sticky',
    top: 0,
    zIndex: Z_INDEX.DROPDOWN,
  } as const,

  /** Navigation list styles */
  navList: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.SM,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  } as const,
} as const;

/**
 * Interactive element styles.
 */
export const interactiveStyles = {
  /** Hover effect for clickable elements */
  hover: {
    cursor: 'pointer',
    transition: `all ${ANIMATION_DURATION.STANDARD}ms ease-in-out`,
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  } as const,

  /** Focus styles for accessibility */
  focus: {
    '&:focus-visible': {
      outline: `${FOCUS_CONFIG.OUTLINE_WIDTH}px ${FOCUS_CONFIG.OUTLINE_STYLE}`,
      outlineColor: 'primary.main',
      outlineOffset: `${FOCUS_CONFIG.OUTLINE_OFFSET}px`,
    },
  } as const,

  /** Disabled state styles */
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  } as const,
} as const;

/**
 * Utility functions for creating common sx prop patterns.
 */
export const sxUtils = {
  /**
   * Creates a flex container with custom gap using MUI spacing units.
   */
  flexWithGap: (gap: number): SxProps<Theme> => ({
    display: 'flex',
    gap: gap,
  }),

  /**
   * Creates responsive padding using breakpoints.
   */
  responsivePadding: (mobile: number, desktop: number): SxProps<Theme> => ({
    padding: mobile,
    '@media (min-width: 768px)': {
      padding: desktop,
    },
  }),

  /**
   * Creates a truncated text style with ellipsis.
   */
  truncateText: (maxWidth?: string): SxProps<Theme> => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...(maxWidth && { maxWidth }),
  }),

  /**
   * Creates a circular element style.
   */
  circle: (size: number): SxProps<Theme> => ({
    width: size,
    height: size,
    borderRadius: '50%',
  }),

  /**
   * Creates a full viewport height container.
   */
  fullViewport: (): SxProps<Theme> => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }),

  /**
   * Creates standardized button styling with consistent spacing.
   */
  buttonBase: (size: 'small' | 'medium' | 'large' = 'medium'): SxProps<Theme> => ({
    py: size === 'small' ? MUI_SPACING.HALF : size === 'large' ? MUI_SPACING.TWO : MUI_SPACING.ONE_HALF,
    px: size === 'small' ? MUI_SPACING.ONE : size === 'large' ? MUI_SPACING.THREE : MUI_SPACING.TWO,
    borderRadius: `${BORDER_RADIUS.MD}px`,
    textTransform: 'none',
    fontWeight: 500,
  }),

  /**
   * Creates standardized input field styling.
   */
  inputField: (): SxProps<Theme> => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: `${BORDER_RADIUS.MD}px`,
    },
    '& .MuiInputBase-input': {
      py: MUI_SPACING.ONE_HALF,
      px: MUI_SPACING.TWO,
    },
  }),

  /**
   * Creates standardized card styling.
   */
  card: (elevation: 'none' | 'low' | 'medium' | 'high' = 'low'): SxProps<Theme> => ({
    borderRadius: `${BORDER_RADIUS.LG}px`,
    border: elevation === 'none' ? 'none' : '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    boxShadow: elevation === 'none' ? 'none' : elevation === 'low' ? 1 : elevation === 'medium' ? 2 : 4,
    p: MUI_SPACING.THREE,
  }),

  /**
   * Creates standardized modal/dialog styling.
   */
  modal: (): SxProps<Theme> => ({
    backgroundColor: 'background.paper',
    borderRadius: `${BORDER_RADIUS.LG}px`,
    p: MUI_SPACING.FOUR,
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: 24,
  }),

  /**
   * Creates standardized spacing between elements.
   */
  stack: (direction: 'row' | 'column' = 'column', spacing: number = MUI_SPACING.TWO): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: direction,
    gap: spacing,
  }),
} as const;