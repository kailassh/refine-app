/**
 * HomePage component - Chat interface for authenticated users.
 * 
 * This component serves as the main chat interface for authenticated users
 * after successful login. It includes a responsive sidebar with chat history,
 * main chat area with message display, and input functionality. The component
 * implements a Claude-like chat experience with proper state management.
 * 
 * @fileoverview Main chat interface component for authenticated users
 */

import React, { useState } from 'react';
import { Header } from '../../../layout/Header';
import { ChatSidebar } from '../ChatSidebar';
import { ChatArea } from '../ChatArea';
import { AnimatedHamburger } from '../../../ui';
import { useChat } from '../../../../hooks/chat';
import { useSidebar } from '../../../../hooks/ui';
import { type User } from '../../../../types/auth';

/**
 * Props interface for the HomePage component.
 */
interface HomePageProps {
  /** Current authenticated user data */
  user: User;
  /** Callback function triggered when user signs out */
  onSignOut?: () => void;
  /** Whether sign out operation is in progress */
  isSigningOut?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * HomePage functional component with chat interface.
 * 
 * Renders the main chat interface including responsive sidebar with chat history,
 * main chat area for message display, and proper state management for chat
 * functionality. Implements Claude-like UX patterns with mobile-first responsive design.
 * 
 * @param props - Component props including user data and callbacks
 * @returns JSX element representing the chat interface
 */
export const HomePage: React.FC<HomePageProps> = ({
  user,
  onSignOut,
  isSigningOut = false,
  className = ''
}) => {
  // Chat state management
  const {
    chatState,
    isLoading,
    createNewChat,
    selectChat,
    deleteChat,
    sendMessage,
    clearError
  } = useChat();

  // Sidebar state management
  const { 
    isVisible: isSidebarVisible,
    isMobile,
    toggleSidebar
  } = useSidebar();

  // Local UI state
  const [error, setError] = useState<string | null>(null);

  // Handle message sending with error handling
  const handleSendMessage = async (message: string) => {
    try {
      await sendMessage(message);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
    }
  };

  // Handle chat selection
  const handleSelectChat = (chatId: string) => {
    selectChat(chatId);
    clearError();
  };

  // Handle chat deletion with error handling
  const handleDeleteChat = (chatId: string) => {
    try {
      deleteChat(chatId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete chat';
      setError(errorMessage);
    }
  };

  // Handle new chat creation
  const handleNewChat = () => {
    createNewChat();
    clearError();
  };

  // Clear any local errors when chat state error changes
  React.useEffect(() => {
    if (chatState.error) {
      setError(chatState.error);
    }
  }, [chatState.error]);

  return (
    <div className={`flex flex-col h-screen bg-gray-50 ${className}`}>
      {/* Header Navigation */}
      <Header 
        user={user}
        onSignOut={onSignOut}
        isSigningOut={isSigningOut}
      />

      {/* Main Chat Interface */}
      <div className="flex flex-1 overflow-hidden">
        {/* Hamburger menu button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-30 p-2 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl"
          aria-label={isSidebarVisible ? "Close chat history" : "Open chat history"}
          title={isSidebarVisible ? "Close chat history" : "Open chat history"}
        >
          <AnimatedHamburger 
            isOpen={isSidebarVisible} 
            className="text-gray-600" 
            size="md" 
          />
        </button>

        {/* Chat Sidebar */}
        <ChatSidebar
          user={user}
          chats={chatState.chats}
          currentChatId={chatState.currentChat?.id}
          isLoading={isLoading && !chatState.currentChat}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
        />

        {/* Main Chat Area */}
        <div className={`flex flex-col min-w-0 ${
          isSidebarVisible && !isMobile ? 'flex-1' : 'w-full'
        }`}>
          <ChatArea
            currentChat={chatState.currentChat}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            error={error || chatState.error}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;