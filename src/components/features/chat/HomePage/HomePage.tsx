/**
 * HomePage component - Full-width chat interface for authenticated users.
 * 
 * This component serves as the main chat interface for authenticated users
 * after successful login. It provides a clean, full-width chat experience
 * without sidebar distractions. The component implements a streamlined
 * chat experience with proper state management.
 * 
 * @fileoverview Main chat interface component for authenticated users
 */

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Header } from '../../../layout/Header';
import { ChatArea } from '../ChatArea';
import { useChat } from '../../../../hooks/chat';
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
 * HomePage functional component with full-width chat interface.
 * 
 * Renders the main chat interface with header and full-width chat area.
 * Implements clean, distraction-free chat experience with proper state management.
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
    sendMessage,
  } = useChat();

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

  // Clear any local errors when chat state error changes
  React.useEffect(() => {
    if (chatState.error) {
      setError(chatState.error);
    }
  }, [chatState.error]);

  return (
    <Box 
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: 'background.default'
      }}
    >
      {/* Header Navigation */}
      <Header 
        user={user}
        onSignOut={onSignOut}
        isSigningOut={isSigningOut}
      />

      {/* Full-Width Chat Interface */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <ChatArea
          currentChat={chatState.currentChat}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
          error={error || chatState.error}
        />
      </Box>
    </Box>
  );
};

export default HomePage;