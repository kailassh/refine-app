/**
 * Composite provider component that wraps all context providers.
 * 
 * This component provides a clean way to wrap the entire app with all
 * necessary context providers in the correct order.
 */

import React, { type ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { UIProvider } from './UIContext';
import { ChatProvider } from './ChatContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <UIProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </UIProvider>
    </AuthProvider>
  );
};