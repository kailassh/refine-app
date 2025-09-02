/**
 * Custom hook for managing sidebar state and responsive behavior.
 * 
 * Simplified sidebar state management with cleaner responsive behavior
 * and reduced complexity. Focuses on essential state with better performance.
 * 
 * @fileoverview Simplified sidebar state management hook
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Sidebar state interface - simplified for better maintainability
 */
interface SidebarState {
  isOpen: boolean;
  isMobile: boolean;
}

/**
 * Mobile breakpoint threshold (matches Tailwind md)
 */
const MOBILE_BREAKPOINT = 768;

/**
 * Storage key for persisting sidebar preferences
 */
const SIDEBAR_STORAGE_KEY = 'sidebar-state';

/**
 * Custom hook for simplified sidebar state management.
 * 
 * @returns Sidebar state and control functions
 */
export const useSidebar = () => {
  // Determine if current screen is mobile
  const getIsMobile = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  }, []);

  // Load initial sidebar state
  const getInitialState = useCallback((): SidebarState => {
    const isMobile = getIsMobile();
    
    // On mobile, always start closed
    if (isMobile) {
      return { isOpen: false, isMobile: true };
    }

    // On desktop, try to load saved preference
    try {
      const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (saved) {
        const { isOpen } = JSON.parse(saved);
        return { isOpen: Boolean(isOpen), isMobile: false };
      }
    } catch (error) {
      console.warn('Failed to load sidebar state:', error);
    }

    // Default to open on desktop
    return { isOpen: true, isMobile: false };
  }, [getIsMobile]);

  const [state, setState] = useState<SidebarState>(getInitialState);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = getIsMobile();
      setState(prev => {
        // If switching to mobile, close sidebar
        if (isMobile && !prev.isMobile) {
          return { isOpen: false, isMobile: true };
        }
        // If switching from mobile to desktop, restore previous preference or default to open
        if (!isMobile && prev.isMobile) {
          try {
            const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
            const isOpen = saved ? JSON.parse(saved).isOpen : true;
            return { isOpen: Boolean(isOpen), isMobile: false };
          } catch {
            return { isOpen: true, isMobile: false };
          }
        }
        // Update mobile status without changing open state
        return { ...prev, isMobile };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getIsMobile]);

  // Save desktop state to localStorage (don't save mobile state)
  useEffect(() => {
    if (!state.isMobile) {
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify({ isOpen: state.isOpen }));
      } catch (error) {
        console.warn('Failed to save sidebar state:', error);
      }
    }
  }, [state.isOpen, state.isMobile]);

  // Toggle sidebar open/closed
  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  // Open sidebar
  const openSidebar = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true }));
  }, []);

  // Close sidebar
  const closeSidebar = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  // Handle overlay click (close on mobile)
  const handleOverlayClick = useCallback(() => {
    if (state.isMobile) {
      closeSidebar();
    }
  }, [state.isMobile, closeSidebar]);

  return {
    // State
    isOpen: state.isOpen,
    isMobile: state.isMobile,
    isVisible: state.isOpen,
    
    // Actions
    toggleSidebar,
    openSidebar,
    closeSidebar,
    handleOverlayClick
  };
};