/**
 * ProtectedRoute component - Route guard for authenticated pages.
 * 
 * This component wraps protected content and redirects unauthenticated
 * users to the appropriate authentication step. It handles different
 * authentication states and ensures proper routing based on user status.
 * 
 * @fileoverview Protected route wrapper for authentication-required pages
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { type AuthState } from '../types/auth';

/**
 * Props interface for the ProtectedRoute component.
 */
interface ProtectedRouteProps {
  /** Children components to render when authenticated */
  children: React.ReactNode;
  /** Current authentication state */
  authState: AuthState;
  /** Redirect path for unauthenticated users (default: '/login') */
  redirectTo?: string;
}

/**
 * ProtectedRoute functional component.
 * 
 * Acts as a route guard that checks authentication status before rendering
 * protected content. Redirects users to appropriate authentication steps
 * based on their current auth state. Shows loading state while authentication
 * status is being determined.
 * 
 * @param props - Component props including children and auth state
 * @returns JSX element - either protected content or redirect
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  authState,
  redirectTo = '/login'
}) => {
  // Show loading spinner while authentication is being processed
  if (authState.isLoading) {
    return (
      <div className="page-container items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="loading-spinner">
            <svg 
              className="h-8 w-8 animate-spin text-gray-600" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
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
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!authState.isAuthenticated) {
    // Redirect to login or appropriate auth step
    return <Navigate to={redirectTo} replace />;
  }

  // User is authenticated, render protected content
  return <>{children}</>;
};

export default ProtectedRoute;