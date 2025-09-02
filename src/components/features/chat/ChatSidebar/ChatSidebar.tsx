/**
 * Chat sidebar component with simplified responsive behavior.
 * 
 * Provides the left sidebar for the chat interface with cleaner layout,
 * improved responsive behavior, and better performance. Uses simplified
 * state management for easier maintenance.
 * 
 * @fileoverview Simplified responsive chat sidebar component
 */

import React from 'react';
import { type Chat } from '../../../../types/chat';
import { type User } from '../../../../types/auth';
import { useSidebar } from '../../../../hooks/ui';
import { ChatListSkeleton } from '../../../ui/LoadingIndicator';

/**
 * Props interface for the ChatSidebar component.
 */
interface ChatSidebarProps {
  /** Current authenticated user */
  user: User;
  /** List of all chats */
  chats: Chat[];
  /** Currently selected chat ID */
  currentChatId?: string | null;
  /** Whether chat data is loading */
  isLoading: boolean;
  /** Callback to create a new chat */
  onNewChat: () => void;
  /** Callback to select an existing chat */
  onSelectChat: (chatId: string) => void;
  /** Callback to delete a chat */
  onDeleteChat: (chatId: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Individual chat list item component.
 */
const ChatListItem: React.FC<{
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: (e: React.MouseEvent) => void;
}> = ({ chat, isSelected, onSelect, onDelete }) => {
  return (
    <div
      className={`
        chat-list-item relative flex items-center w-full p-3 rounded-lg text-left cursor-pointer
        transition-all duration-200 ease-out transform hover:scale-[1.02] hover:shadow-sm
        ${isSelected 
          ? 'bg-gray-900 text-white shadow-md' 
          : 'text-gray-700 hover:bg-gray-100 hover:border hover:border-gray-200'
        }
      `}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="flex-1 min-w-0">
        {/* Chat title */}
        <h4 className="text-sm font-medium truncate">
          {chat.title}
        </h4>
        
        {/* Last message preview and timestamp */}
        <div className="flex items-center justify-between mt-1">
          <p className={`text-xs truncate max-w-40 ${
            isSelected ? 'text-gray-300' : 'text-gray-500'
          }`}>
            {chat.messages.length > 0 
              ? chat.messages[chat.messages.length - 1].content 
              : 'New conversation'
            }
          </p>
          <span className={`text-xs ml-2 flex-shrink-0 ${
            isSelected ? 'text-gray-400' : 'text-gray-400'
          }`}>
            {formatChatTime(chat.updatedAt)}
          </span>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={onDelete}
        className={`
          chat-delete-btn ml-2 p-1 rounded opacity-0 transition-opacity duration-200
          ${isSelected 
            ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
          }
        `}
        title="Delete chat"
        aria-label="Delete chat"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

/**
 * Chat sidebar component with simplified responsive behavior.
 * 
 * Provides chat history navigation, new chat creation, and responsive
 * behavior with cleaner state management and improved performance.
 * 
 * @param props - Component props including chat data and callbacks
 * @returns JSX element representing the chat sidebar
 */
export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  user,
  chats,
  currentChatId,
  isLoading,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  className = ''
}) => {
  const { 
    isMobile,
    isVisible,
    closeSidebar,
    handleOverlayClick
  } = useSidebar();

  // Handle chat deletion with confirmation
  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this chat?')) {
      onDeleteChat(chatId);
    }
  };

  // Sort chats by most recently updated
  const sortedChats = [...chats].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  // Don't render sidebar if not visible (performance optimization)
  if (!isVisible) return null;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed' : 'relative'} 
        top-0 left-0 h-full w-80 bg-white border-r border-gray-200 z-50
        ${isMobile ? 'shadow-xl animate-slide-in-left' : 'shadow-sm'}
        ${className}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full">
                <span className="text-sm font-medium text-gray-700">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Chat History
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Close button (mobile only) */}
            {isMobile && (
              <button
                onClick={closeSidebar}
                className="p-1 text-gray-400 rounded-lg transition-colors duration-200 hover:text-gray-600 hover:bg-gray-100"
                aria-label="Close sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* New chat button */}
          <div className="px-4 py-4 flex-shrink-0">
            <button
              onClick={() => {
                onNewChat();
                if (isMobile) closeSidebar();
              }}
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg transition-all duration-200 transform hover:bg-gray-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Chat
            </button>
          </div>

          {/* Chat list */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full px-4 overflow-y-auto">
              {isLoading ? (
                <ChatListSkeleton count={5} />
              ) : sortedChats.length > 0 ? (
                <div className="space-y-1">
                  {sortedChats.map((chat, index) => (
                    <div
                      key={chat.id}
                      className="opacity-0 animate-fadeInUp"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <ChatListItem
                        chat={chat}
                        isSelected={chat.id === currentChatId}
                        onSelect={() => {
                          onSelectChat(chat.id);
                          if (isMobile) closeSidebar();
                        }}
                        onDelete={(e) => handleDeleteChat(e, chat.id)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <svg className="w-8 h-8 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-sm text-gray-500">No conversations yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Format chat timestamp for display in chat list.
 */
const formatChatTime = (timestamp: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / 60000);
  
  if (diffInMinutes < 1) return 'now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d`;
  
  return timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export default ChatSidebar;