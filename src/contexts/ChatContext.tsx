/**
 * Chat context provider for managing global chat state.
 * 
 * This context provides chat state and methods throughout the app,
 * centralizing chat management logic and eliminating prop drilling.
 * It wraps the existing useChat hook to provide a global state layer.
 */

import React, { createContext, useContext, type ReactNode } from 'react';
import { useChat } from '../hooks/chat/useChat';
import { type Chat, type ChatState, type Message } from '../types/chat';

/**
 * Chat context value interface.
 */
interface ChatContextValue {
  // State
  chatState: ChatState;
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  createNewChat: () => void;
  selectChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  sendMessage: (message: string) => Promise<void>;
  clearError: () => void;
}

/**
 * Chat context.
 */
const ChatContext = createContext<ChatContextValue | undefined>(undefined);

/**
 * Props for the ChatProvider component.
 */
interface ChatProviderProps {
  children: ReactNode;
}

/**
 * Chat provider component.
 * 
 * Wraps the application to provide global chat state and methods.
 * Uses the existing useChat hook internally to maintain current functionality
 * while adding context-based state management.
 */
export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const chat = useChat();
  
  const contextValue: ChatContextValue = {
    // State
    chatState: chat.chatState,
    chats: chat.chatState.chats,
    currentChat: chat.chatState.currentChat,
    messages: chat.chatState.currentChat?.messages || [],
    isLoading: chat.isLoading,
    error: chat.chatState.error,
    
    // Actions
    createNewChat: chat.createNewChat,
    selectChat: chat.selectChat,
    deleteChat: chat.deleteChat,
    sendMessage: chat.sendMessage,
    clearError: chat.clearError,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

/**
 * Hook to access chat context.
 * 
 * @returns Chat context value with state and methods
 * @throws Error if used outside of ChatProvider
 */
export const useChatContext = (): ChatContextValue => {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  
  return context;
};

