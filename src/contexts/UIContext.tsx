/**
 * UI context provider for managing global UI state.
 * 
 * This context manages sidebar state, theme preferences, and other
 * global UI state throughout the app. It centralizes UI-related
 * state management and replaces individual UI hooks.
 */

import React, { createContext, useContext, type ReactNode } from 'react';
import { useSidebar } from '../hooks/ui/useSidebar';

/**
 * Theme options.
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Modal types that can be opened.
 */
export type ModalType = 'settings' | 'profile' | 'help' | null;

/**
 * UI context value interface.
 */
interface UIContextValue {
  // Sidebar state
  isSidebarVisible: boolean;
  isSidebarOverlay: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  
  // Theme state
  theme: Theme;
  
  // Modal state
  activeModal: ModalType;
  
  // Sidebar actions
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  
  // Theme actions
  setTheme: (theme: Theme) => void;
  
  // Modal actions
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

/**
 * UI context.
 */
const UIContext = createContext<UIContextValue | undefined>(undefined);

/**
 * Props for the UIProvider component.
 */
interface UIProviderProps {
  children: ReactNode;
}

/**
 * UI provider component.
 * 
 * Wraps the application to provide global UI state and methods.
 * Manages sidebar state, theme preferences, and modal state.
 */
export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const sidebar = useSidebar();
  const [theme, setThemeState] = React.useState<Theme>('light');
  const [activeModal, setActiveModal] = React.useState<ModalType>(null);
  
  // Theme management
  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    // Could add localStorage persistence here
    localStorage.setItem('ui-theme', newTheme);
  }, []);
  
  // Modal management
  const openModal = React.useCallback((modal: ModalType) => {
    setActiveModal(modal);
  }, []);
  
  const closeModal = React.useCallback(() => {
    setActiveModal(null);
  }, []);
  
  // Load theme from localStorage on mount
  React.useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('ui-theme') as Theme;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error);
    }
  }, []);
  
  const contextValue: UIContextValue = {
    // Sidebar state
    isSidebarVisible: sidebar.isVisible,
    isSidebarOverlay: sidebar.isOverlay,
    isMobile: sidebar.isMobile,
    isTablet: sidebar.isTablet,
    isDesktop: sidebar.isDesktop,
    
    // Theme state
    theme,
    
    // Modal state
    activeModal,
    
    // Sidebar actions
    toggleSidebar: sidebar.toggleSidebar,
    openSidebar: sidebar.openSidebar,
    closeSidebar: sidebar.closeSidebar,
    
    // Theme actions
    setTheme,
    
    // Modal actions
    openModal,
    closeModal,
  };

  return (
    <UIContext.Provider value={contextValue}>
      {children}
    </UIContext.Provider>
  );
};

/**
 * Hook to access UI context.
 * 
 * @returns UI context value with state and methods
 * @throws Error if used outside of UIProvider
 */
export const useUIContext = (): UIContextValue => {
  const context = useContext(UIContext);
  
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  
  return context;
};

