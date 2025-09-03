/**
 * Authentication context provider for managing global auth state.
 * 
 * This context provides authentication state and methods throughout the app,
 * eliminating prop drilling and centralizing auth logic. It wraps the existing
 * useAuth hook to provide a global state layer.
 */

import React, { createContext, useContext, type ReactNode } from 'react';
import { useAuth } from '../hooks/auth/useAuth';
import { type User, type AuthState } from '../types/auth';

/**
 * Authentication context value interface.
 */
interface AuthContextValue {
  // State
  authState: AuthState;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loginWithEmail: (email: string) => Promise<void>;
  verifyOTP: (token: string) => Promise<void>;
  resendOTP: () => Promise<void>;
  logout: () => Promise<void>;
  goBackToEmail: () => void;
}

/**
 * Authentication context.
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Props for the AuthProvider component.
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication provider component.
 * 
 * Wraps the application to provide global authentication state and methods.
 * Uses the existing useAuth hook internally to maintain current functionality
 * while adding context-based state management.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();
  
  const contextValue: AuthContextValue = {
    // State
    authState: auth.authState,
    user: auth.authState.user,
    isAuthenticated: auth.authState.isAuthenticated,
    isLoading: auth.authState.isLoading,
    error: auth.authState.error,
    
    // Actions
    loginWithEmail: auth.loginWithEmail,
    verifyOTP: auth.verifyOTP,
    resendOTP: auth.resendOTP,
    logout: auth.logout,
    goBackToEmail: auth.goBackToEmail,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access authentication context.
 * 
 * @returns Authentication context value with state and methods
 * @throws Error if used outside of AuthProvider
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
};

