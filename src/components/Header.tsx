/**
 * Header component - Navigation header for authenticated pages.
 * 
 * This component provides the main navigation header for authenticated
 * users including the app logo, user information, and sign-out functionality.
 * It's designed to be responsive and accessible.
 * 
 * @fileoverview Header navigation component with user menu
 */

import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';
import { type User } from '../types/auth';

/**
 * Props interface for the Header component.
 */
interface HeaderProps {
  /** Current authenticated user data */
  user?: User | null;
  /** Callback function triggered when user clicks sign out */
  onSignOut?: () => void;
  /** Whether sign out operation is in progress */
  isSigningOut?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Header functional component.
 * 
 * Renders the main navigation header with logo, user menu, and sign-out
 * functionality. Includes a dropdown menu for user actions and proper
 * keyboard navigation support.
 * 
 * @param props - Component props including user data and callbacks
 * @returns JSX element representing the header navigation
 */
export const Header: React.FC<HeaderProps> = ({
  user,
  onSignOut,
  isSigningOut = false,
  className = ''
}) => {
  // Dropdown menu state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Dropdown reference for click outside detection
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Handles sign out button click.
   */
  const handleSignOutClick = () => {
    setIsDropdownOpen(false);
    if (onSignOut) {
      onSignOut();
    }
  };

  /**
   * Toggles dropdown menu visibility.
   */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  /**
   * Handles keyboard navigation for dropdown.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  return (
    <header className={`w-full border-b bg-white border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="relative" ref={dropdownRef}>
                {/* User menu button */}
                <button
                  onClick={toggleDropdown}
                  onKeyDown={handleKeyDown}
                  className="flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 transition-colors duration-200 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  {/* User avatar placeholder */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300">
                    <span className="text-sm font-medium text-gray-700">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  
                  {/* User email */}
                  <span className="hidden sm:block max-w-40 truncate">
                    {user.email}
                  </span>
                  
                  {/* Dropdown arrow */}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 w-56 mt-2 py-1 bg-white border rounded-lg border-gray-200 shadow-lg z-10">
                    {/* User info section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.emailConfirmed ? 'Verified' : 'Unverified'}
                      </p>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <button
                        onClick={handleSignOutClick}
                        disabled={isSigningOut}
                        className="flex items-center w-full space-x-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        role="menuitem"
                      >
                        {isSigningOut ? (
                          <>
                            <div className="w-4 h-4">
                              <svg 
                                className="h-4 w-4 animate-spin text-gray-400" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24"
                              >
                                <circle 
                                  className="opacity-25" 
                                  cx="12" 
                                  cy="12" 
                                  r="10" 
                                  stroke="currentColor" 
                                  strokeWidth="4"
                                />
                                <path 
                                  className="opacity-75" 
                                  fill="currentColor" 
                                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                            </div>
                            <span>Signing out...</span>
                          </>
                        ) : (
                          <>
                            <svg 
                              className="w-4 h-4" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                              />
                            </svg>
                            <span>Sign out</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;