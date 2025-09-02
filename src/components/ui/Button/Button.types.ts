/**
 * Type definitions for the Button component.
 */

import { type ButtonHTMLAttributes } from 'react';

/**
 * Button variant options.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/**
 * Button size options.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component props interface.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button is in loading state */
  isLoading?: boolean;
  /** Whether the button takes full width */
  fullWidth?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Button content */
  children: React.ReactNode;
}