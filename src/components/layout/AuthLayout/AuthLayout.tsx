/**
 * AuthLayout component - Layout wrapper for authentication pages.
 * 
 * This component provides consistent layout and styling for all
 * authentication-related pages (login, OTP verification). It includes
 * the header with logo, main content area, and footer with legal links.
 * 
 * @fileoverview Layout component for authentication pages
 */

import React from 'react';
import { Logo } from '../../shared/Logo';

/**
 * Props interface for the AuthLayout component.
 */
interface AuthLayoutProps {
  /** Children components to render in the main content area */
  children: React.ReactNode;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * AuthLayout functional component.
 * 
 * Provides the standard layout structure for authentication pages including
 * header with logo, centered main content area, and footer with legal links.
 * Ensures consistent styling and responsive design across all auth flows.
 * 
 * @param props - Component props including children and styling
 * @returns JSX element representing the authentication page layout
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`page-container ${className}`}>
      {/* Header Section - Contains the application logo */}
      <header className="header-section">
        <Logo />
      </header>

      {/* Main Content Section - Contains the authentication forms */}
      <main className="content-center">
        <div className="form-section">
          {children}
        </div>
      </main>

      {/* Footer Section - Legal links and branding */}
      <footer className="footer-section">
        <div className="mx-auto max-w-md">
          <div className="space-y-form text-center">
            {/* Terms and Privacy Links */}
            <p className="text-small">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-link" tabIndex={0}>
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-link" tabIndex={0}>
                Privacy policy
              </a>
            </p>
            
            {/* Branding Section */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <span>curated by</span>
              <div className="font-medium text-gray-900">
                refine<span className="text-gray-400">.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;