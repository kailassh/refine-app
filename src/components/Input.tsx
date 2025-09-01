/**
 * Input component - Accessible form input with validation states.
 * 
 * A comprehensive input component that extends native HTML input functionality
 * with validation states, error handling, and accessibility features. Supports
 * labels, error messages, and visual validation feedback.
 * 
 * @fileoverview Form input component with validation and accessibility
 */

import { type InputHTMLAttributes, forwardRef } from 'react';

/**
 * Props interface for the Input component.
 * 
 * Extends standard HTML input attributes while adding custom properties
 * for labels, validation states, and error handling.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional label text displayed above the input */
  label?: string;
  /** Error message to display below input when validation fails */
  error?: string;
  /** Whether the input value is valid (shows green styling) */
  isValid?: boolean;
  /** Additional CSS classes to apply to the input */
  className?: string;
}

/**
 * Input component with forward ref support and comprehensive validation.
 * 
 * Uses forwardRef to allow parent components to access the input element
 * directly for focusing, form libraries, etc. Automatically handles
 * ARIA attributes for accessibility and provides visual feedback for
 * different validation states.
 * 
 * @param props - Input props including validation states and standard input attributes
 * @param ref - Forwarded ref to the input element
 * @returns Input field with optional label and error message
 * 
 * @example
 * ```tsx
 * // Basic input with label
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={handleChange}
 * />
 * 
 * // Input with error state
 * <Input
 *   id="password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 *   value={password}
 *   onChange={handlePasswordChange}
 * />
 * 
 * // Input with success state
 * <Input
 *   type="text"
 *   isValid={true}
 *   value={validatedValue}
 *   onChange={handleChange}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, isValid, className = '', ...props }, ref) => {
    // Use semantic utility classes based on validation state
    const getInputClasses = () => {
      if (error) return `input-error ${className}`;
      if (isValid) return `input-success ${className}`;
      return `input-default ${className}`;
    };

    return (
      <div className="space-y-2">
        {/* Optional Label */}
        {label && (
          <label htmlFor={props.id} className="input-label">
            {label}
          </label>
        )}
        
        {/* Main Input Element */}
        <input
          ref={ref}
          className={getInputClasses()}
          aria-invalid={!!error} // Accessibility: indicate invalid state
          aria-describedby={error ? `${props.id}-error` : undefined} // Associate with error message
          {...props}
        />
        
        {/* Error Message */}
        {error && (
          <p
            id={`${props.id}-error`}
            className="input-error-message"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

// Set display name for React DevTools and debugging\nInput.displayName = 'Input';

export default Input;