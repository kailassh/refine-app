/**
 * Button component - Reusable button with variants and loading states.
 * 
 * A flexible button component that extends native HTML button functionality
 * with custom styling, loading states, and accessibility features. Supports
 * multiple visual variants and maintains semantic button behavior.
 * 
 * @fileoverview Reusable button component with loading states and variants
 */

import React, { type ButtonHTMLAttributes } from 'react';

/**
 * Props interface for the Button component.
 * 
 * Extends standard HTML button attributes while adding custom properties
 * for styling variants, loading states, and children content.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant - determines button appearance */
  variant?: 'primary' | 'secondary';
  /** Whether button should show loading state with spinner */
  isLoading?: boolean;
  /** Button content (text, icons, other elements) */
  children: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Loading spinner component displayed during button loading state.
 * 
 * An SVG-based spinner that rotates continuously using CSS animations.
 * Uses currentColor to inherit the button's text color for consistency.
 * 
 * @returns SVG spinner element
 */
const LoadingSpinner: React.FC = () => (
  <svg
    className="loading-spinner"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="loading-spinner-circle"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="loading-spinner-path"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Button component with variants and loading state support.
 * 
 * Renders a styled button with consistent design system patterns.
 * Automatically disables interaction during loading and provides
 * visual feedback through the loading spinner.
 * 
 * @param props - Button props including variant, loading state, and standard button attributes
 * @returns Styled button element with optional loading spinner
 * 
 * @example
 * ```tsx
 * // Primary button with loading
 * <Button variant="primary" isLoading={submitting} onClick={handleSubmit}>
 *   Submit Form
 * </Button>
 * 
 * // Secondary button
 * <Button variant="secondary" onClick={handleCancel}>
 *   Cancel
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Use semantic utility classes from our component CSS
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary'
  };

  // Button is disabled if explicitly disabled or loading
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`${variantStyles[variant]} ${className}`}
      disabled={isDisabled}
      aria-busy={isLoading} // Accessibility: indicate loading state
      {...props}
    >
      {/* Show loading spinner when in loading state */}
      {isLoading && <LoadingSpinner />}
      {children}
    </button>
  );
};

export default Button;