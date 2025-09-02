/**
 * Chat area component for displaying messages with Material-UI components.
 * 
 * Modern chat area using MUI components with clean theming, 
 * improved responsive behavior and elegant layout.
 * 
 * @fileoverview Chat area component using MUI components
 */

import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Stack, 
  Alert,
  IconButton,
  Fab
} from '@mui/material';
import { type Chat } from '../../../../types/chat';
import { MessageBubble } from '../../../ui/MessageBubble';
import { ChatInput } from '../ChatInput';
import { ChatLoadingState } from '../../../ui/LoadingIndicator';
import { MessageCircle, ChevronDown, X } from 'lucide-react';

/**
 * Props interface for the ChatArea component.
 */
interface ChatAreaProps {
  /** Current active chat to display */
  currentChat: Chat | null;
  /** Whether a message is being sent/processed */
  isLoading: boolean;
  /** Callback when user sends a message */
  onSendMessage: (message: string) => void;
  /** Error message to display, if any */
  error?: string | null;
  /** Custom styling */
  sx?: object;
}

/**
 * Empty state component for when no chat is selected.
 */
const EmptyState: React.FC<{
  onGetStarted?: () => void;
}> = ({ onGetStarted }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        px: 3,
        textAlign: 'center'
      }}
    >
      <Box sx={{ maxWidth: 480 }}>
        <Stack spacing={4}>
          {/* Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 64,
                bgcolor: 'secondary.main',
                borderRadius: '50%',
                color: 'secondary.contrastText'
              }}
            >
              <MessageCircle size={32} />
            </Box>
          </Box>

          {/* Content */}
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 500, color: 'text.primary' }}>
              Welcome to Text Refine Chat
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              Start a conversation by typing a message below. I'm here to help you with 
              text refinement, writing assistance, and answer any questions you might have.
            </Typography>
          </Stack>

          {/* Example prompts */}
          <Stack spacing={2}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Try asking:
            </Typography>
            <Stack spacing={1}>
              {[
                "Help me improve this paragraph",
                "What's the best way to structure an email?",
                "Can you help me brainstorm ideas?"
              ].map((prompt, index) => (
                <Button
                  key={index}
                  variant="text"
                  onClick={() => onGetStarted?.()}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    p: 2,
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'text.primary',
                      bgcolor: 'action.hover'
                    }
                  }}
                  fullWidth
                >
                  "{prompt}"
                </Button>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

/**
 * Error banner component for displaying errors.
 */
const ErrorBanner: React.FC<{
  error: string;
  onDismiss?: () => void;
}> = ({ error, onDismiss }) => {
  return (
    <Box sx={{ mx: 2, mb: 2 }}>
      <Alert 
        severity="error" 
        action={
          onDismiss && (
            <IconButton
              size="small"
              onClick={onDismiss}
              sx={{ color: 'error.main' }}
            >
              <X size={16} />
            </IconButton>
          )
        }
      >
        {error}
      </Alert>
    </Box>
  );
};

/**
 * Chat area component for displaying messages and handling input.
 * 
 * Manages the main chat interface including message display, scrolling,
 * input handling, and various states (empty, loading, error).
 * 
 * @param props - Component props including chat data and callbacks
 * @returns JSX element representing the chat area
 */
export const ChatArea: React.FC<ChatAreaProps> = ({
  currentChat,
  isLoading,
  onSendMessage,
  error,
  sx = {}
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  /**
   * Scroll to bottom of messages container.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Auto-scroll to bottom when new messages arrive (if user is near bottom).
   */
  useEffect(() => {
    if (shouldAutoScroll && currentChat) {
      scrollToBottom();
    }
  }, [currentChat?.messages, shouldAutoScroll, currentChat]);

  /**
   * Reset scroll state when switching chats.
   */
  useEffect(() => {
    setShouldAutoScroll(true);
    setShowScrollToBottom(false);
    if (currentChat) {
      // Small delay to ensure messages are rendered
      setTimeout(scrollToBottom, 100);
    }
  }, [currentChat]);

  // Show loading state for initial load
  if (isLoading && !currentChat) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', ...sx }}>
        <ChatLoadingState message="Loading chat..." />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        bgcolor: 'background.default',
        ...sx 
      }}
    >
      {/* Error banner */}
      {error && (
        <ErrorBanner 
          error={error} 
          onDismiss={() => {/* Could add error dismissal */}}
        />
      )}

      {/* Messages area */}
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {currentChat ? (
          <>
            {/* Messages container */}
            <Box 
              ref={messagesContainerRef}
              sx={{ 
                height: '100%', 
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px'
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '4px'
                }
              }}
            >
              <Box 
                sx={{ 
                  maxWidth: 1024, 
                  px: 2, 
                  py: 3, 
                  mx: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5
                }}
              >
                {currentChat.messages.length > 0 ? (
                  <>
                    {currentChat.messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                    {/* Scroll anchor */}
                    <Box ref={messagesEndRef} />
                  </>
                ) : (
                  <EmptyState />
                )}
              </Box>
            </Box>

            {/* Scroll to bottom button */}
            {showScrollToBottom && (
              <Fab
                size="small"
                onClick={scrollToBottom}
                sx={{
                  position: 'absolute',
                  bottom: 80,
                  right: 24,
                  zIndex: 1
                }}
                title="Scroll to bottom"
              >
                <ChevronDown size={20} />
              </Fab>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </Box>

      {/* Chat input - always at bottom */}
      <Box sx={{ flexShrink: 0 }}>
        <ChatInput
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          disabled={!currentChat && !isLoading}
          placeholder={
            currentChat 
              ? "Type your message..." 
              : "Start a new conversation..."
          }
        />
      </Box>
    </Box>
  );
};

export default ChatArea;