/**
 * LoginPage component - The main authentication interface.
 * 
 * This component provides the primary login interface for the application,
 * including email validation, form submission, and error handling. It follows
 * accessibility best practices and includes comprehensive user feedback.
 * 
 * @fileoverview Main login page component with email authentication
 */

import React, { useState, type FormEvent } from 'react';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { type LoginFormData, type ValidationErrors } from '../../../../types/auth';

/**
 * Props interface for the LoginPage component.
 * 
 * Defines the callback functions and state that can be passed to the component
 * from parent components, typically the main App component.
 */
interface LoginPageProps {
  /** Callback function triggered when user submits email for OTP sending */
  onEmailLogin?: (email: string) => Promise<void>;
  /** Whether a login attempt is currently in progress */
  isLoading?: boolean;
  /** Error message to display if login fails */
  error?: string | null;
}

/**
 * Validates email address format and required field.
 * 
 * Performs client-side validation for the email input field, checking both
 * for presence of a value and valid email format using a regular expression.
 * 
 * @param email - The email string to validate
 * @returns Error message if validation fails, undefined if valid
 */
const validateEmail = (email: string): string | undefined => {
  // Check if email is provided (not empty after trimming whitespace)
  if (!email.trim()) {
    return 'Email is required';
  }
  
  // Validate email format using regex pattern
  // Pattern checks for: characters@characters.characters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  
  // Return undefined if validation passes
  return undefined;
};

/**
 * LoginPage functional component.
 * 
 * Renders the complete login interface including header with logo, email form,
 * error handling, and footer with legal links. Manages its own form state and
 * validation while communicating with parent components through callbacks.
 * 
 * @param props - Component props including callbacks and state
 * @returns JSX element representing the login page
 */
export const LoginPage: React.FC<LoginPageProps> = ({
  onEmailLogin,
  isLoading = false,
  error = null
}) => {
  // Form data state - tracks the email input value
  const [formData, setFormData] = useState<LoginFormData>({ email: '' });
  
  // Validation errors state - tracks field-level validation messages
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
  // Interaction tracking - determines when to show validation errors
  const [hasInteracted, setHasInteracted] = useState(false);

  /**
   * Handles email input field changes.
   * 
   * Updates form data state and performs real-time validation if the user
   * has already interacted with the form (to avoid showing errors immediately).
   * 
   * @param e - React change event from email input
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    
    // Update form data with new email value
    setFormData({ email });
    
    // Only validate in real-time if user has already attempted to submit
    // This prevents showing validation errors before user has finished typing
    if (hasInteracted) {
      const emailError = validateEmail(email);
      setValidationErrors({ email: emailError });
    }
  };

  /**
   * Handles form submission for email login.
   * 
   * Prevents default form submission, validates the email, updates error state,
   * and calls the onEmailLogin callback if validation passes.
   * 
   * @param e - Form submission event
   */
  const handleEmailSubmit = async (e: FormEvent) => {
    // Prevent default form submission behavior
    e.preventDefault();
    
    // Mark that user has interacted with the form (enables real-time validation)
    setHasInteracted(true);
    
    // Validate email and update error state
    const emailError = validateEmail(formData.email);
    setValidationErrors({ email: emailError });
    
    // If validation passes and callback exists, trigger login
    if (!emailError && onEmailLogin) {
      await onEmailLogin(formData.email.trim());
    }
  };

  return (
    <>
      {/* Welcome Section - Application title and description */}
      <div className="space-y-text text-center">
        <h1 className="heading-primary">
          Welcome to refine
        </h1>
        <p className="text-description">
          Refine anything you type or paste
        </p>
      </div>

      {/* Email Form Section - Login form with validation */}
      <div className="space-y-form">
        <form onSubmit={handleEmailSubmit} className="space-y-form">
          {/* Email Input Field */}
          <div className="text-left">
            <Input
              id="email"
              type="email"
              placeholder="Type your email"
              value={formData.email}
              onChange={handleEmailChange}
              error={validationErrors.email}
              disabled={isLoading}
              className="text-base"
              aria-label="Email address"
              autoComplete="email"
              autoFocus
            />
          </div>

          {/* Submit Button - Disabled during loading or validation errors */}
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading || !!validationErrors.email}
            className="w-full"
          >
            {isLoading ? 'Continuing...' : 'Continue with email'}
          </Button>
        </form>
      </div>

      {/* Error Message Display - Shows authentication errors */}
      {error && (
        <div className="text-center">
          <p className="input-error-message" role="alert">
            {error}
          </p>
        </div>
      )}
    </>
  );
};

export default LoginPage;