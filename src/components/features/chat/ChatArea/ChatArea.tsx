/**
 * Chat area component for displaying messages and managing chat interface.
 * 
 * Simplified chat area with improved responsive behavior and cleaner layout.
 * Removes complex layout dependencies and focuses on core functionality.
 * 
 * @fileoverview Simplified chat area component for message display
 */

import React, { useEffect, useRef, useState } from 'react';
import { type Chat } from '../../../../types/chat';
import { MessageBubble } from '../../../ui/MessageBubble';
import { ChatInput } from '../ChatInput';
import { ChatLoadingState } from '../../../ui/LoadingIndicator';

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
  /** Additional CSS classes */
  className?: string;
}

/**
 * Empty state component for when no chat is selected.
 */
const EmptyState: React.FC<{
  onGetStarted?: () => void;
}> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="max-w-md space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
            <svg 
              className="w-8 h-8 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-gray-900">
            Welcome to Text Refine Chat
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Start a conversation by typing a message below. I'm here to help you with 
            text refinement, writing assistance, and answer any questions you might have.
          </p>
        </div>

        {/* Example prompts */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500 font-medium">Try asking:</p>
          <div className="space-y-2 text-sm">
            {[
              "Help me improve this paragraph",
              "What's the best way to structure an email?",
              "Can you help me brainstorm ideas?"
            ].map((prompt, index) => (
              <button
                key={index}
                onClick={() => onGetStarted?.()}
                className="block w-full p-3 text-left text-gray-700 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
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
    <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
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
  className = ''
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
   * Check if user is near bottom of messages.
   */
  const isNearBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return false;
    
    const threshold = 100; // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  };

  /**
   * Handle scroll events to determine auto-scroll behavior.
   */
  const handleScroll = () => {
    const nearBottom = isNearBottom();
    setShouldAutoScroll(nearBottom);
    setShowScrollToBottom(!nearBottom && !!(currentChat && currentChat.messages.length > 0));
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
      <div className={`flex flex-col h-full ${className}`}>
        <ChatLoadingState message="Loading chat..." />
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Error banner */}
      {error && (
        <ErrorBanner 
          error={error} 
          onDismiss={() => {/* Could add error dismissal */}}
        />
      )}

      {/* Messages area */}
      <div className="flex-1 relative overflow-hidden">
        {currentChat ? (
          <>
            {/* Messages container */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="h-full overflow-y-auto scroll-smooth"
            >
              <div className="max-w-4xl px-4 py-6 mx-auto space-y-1">
                {currentChat.messages.length > 0 ? (
                  <>
                    {currentChat.messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                    {/* Scroll anchor */}
                    <div ref={messagesEndRef} />
                  </>
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>

            {/* Scroll to bottom button */}
            {showScrollToBottom && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-20 right-6 flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                title="Scroll to bottom"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Chat input - always at bottom */}
      <div className="flex-shrink-0">
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
      </div>
    </div>
  );
};

export default ChatArea;