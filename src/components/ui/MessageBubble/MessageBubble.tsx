/**
 * Message bubble component for displaying chat messages with Material-UI.
 * 
 * This component renders individual chat messages using MUI components
 * with modern styling, appropriate layouts for user vs AI messages, loading states,
 * and responsive design using the sx prop approach.
 * 
 * @fileoverview Message bubble component using MUI components
 */

import React from 'react';
import { Box, Card, Avatar, Typography } from '@mui/material';
import { type Message } from '../../../types/chat';
import { TypingIndicator } from '../LoadingIndicator/LoadingIndicator';
import { getRelativeTime } from '../../../utils/formatters';
import { Bot } from 'lucide-react';

/**
 * Props interface for the MessageBubble component.
 */
interface MessageBubbleProps {
  /** Message data to display */
  message: Message;
  /** Custom styling */
  sx?: object;
}

/**
 * Message bubble component for individual chat messages.
 * 
 * Renders messages with MUI Card components and different styling based on 
 * sender (user vs assistant), handles loading states with typing indicators,
 * and provides responsive design using MUI's sx prop approach.
 * 
 * @param props - Component props including message data
 * @returns JSX element representing a message bubble
 */
export const MessageBubble: React.FC<MessageBubbleProps> = React.memo(({
  message,
  sx = {}
}) => {
  const isUser = message.sender === 'user';
  const isAssistant = message.sender === 'assistant';

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 3,
        ...sx
      }}
    >
      {/* Avatar for assistant messages */}
      {isAssistant && (
        <Box sx={{ flexShrink: 0, mr: 1.5 }}>
          <Avatar 
            sx={{ 
              width: 32, 
              height: 32, 
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText'
            }}
          >
            <Bot size={16} />
          </Avatar>
        </Box>
      )}

      {/* Message content */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        maxWidth: { 
          xs: '75%', 
          sm: '60%', 
          md: '50%', 
          lg: '45%', 
          xl: '40%' 
        }
      }}>
        {/* Message bubble */}
        <Card
          sx={{
            p: 2,
            borderRadius: 2,
            borderBottomRightRadius: isUser ? 0.5 : 2,
            borderBottomLeftRadius: isUser ? 2 : 0.5,
            bgcolor: isUser ? 'primary.main' : 'background.paper',
            color: isUser ? 'primary.contrastText' : 'text.primary',
            border: isUser ? '1px solid' : '1px solid',
            borderColor: isUser ? 'primary.main' : 'divider',
            minHeight: message.isLoading ? 48 : 'auto',
            display: 'flex',
            alignItems: message.isLoading ? 'center' : 'flex-start'
          }}
        >
          {message.isLoading ? (
            <TypingIndicator size="small" />
          ) : (
            <Typography 
              variant="body2" 
              sx={{ 
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {message.content}
            </Typography>
          )}
        </Card>

        {/* Timestamp */}
        <Box 
          sx={{
            display: 'flex',
            justifyContent: isUser ? 'flex-end' : 'flex-start',
            mt: 0.5
          }}
        >
          <Typography 
            variant="caption" 
            component="time" 
            dateTime={message.timestamp.toISOString()}
            sx={{ color: 'text.secondary' }}
          >
            {getRelativeTime(message.timestamp)}
          </Typography>
        </Box>
      </Box>

      {/* Spacer for user messages (to maintain proper spacing) */}
      {isUser && <Box sx={{ flexShrink: 0, width: 44 }} />}
    </Box>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.content === nextProps.message.content &&
    prevProps.message.isLoading === nextProps.message.isLoading &&
    JSON.stringify(prevProps.sx) === JSON.stringify(nextProps.sx)
  );
});

export default MessageBubble;