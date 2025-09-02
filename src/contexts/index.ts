/**
 * Contexts barrel export for easy imports.
 * 
 * This file re-exports all context providers and hooks for convenient
 * importing throughout the application.
 */

export { AuthProvider, useAuthContext } from './AuthContext';
export { ChatProvider, useChatContext } from './ChatContext';
export { UIProvider, useUIContext } from './UIContext';
export type { Theme, ModalType } from './UIContext';
export { AppProviders } from './AppProviders';