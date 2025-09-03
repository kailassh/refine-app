/**
 * Custom hook for managing chat state and operations.
 * 
 * This hook provides a comprehensive interface for chat functionality
 * including message sending, chat management, loading states, and
 * persistence. It integrates with the ChatService for data operations.
 * 
 * @fileoverview Custom hook for chat state management
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  type Message, 
  type ChatState, 
  type MessageSender
} from '../../types/chat';
import { chatService } from '../../services/api/chat.service';
import { ErrorUtils } from '../../services/error';

/**
 * Custom hook for chat state management and operations.
 * 
 * @returns Chat state and control functions
 */
export const useChat = () => {
  // Chat state
  const [chatState, setChatState] = useState<ChatState>({
    currentChat: null,
    chats: [],
    isLoading: false,
    isSidebarOpen: false,
    error: null
  });

  // Ref to track if we're currently generating a response
  const isGeneratingRef = useRef(false);

  /**
   * Initialize chat state from localStorage on mount.
   */
  useEffect(() => {
    const loadInitialState = () => {
      try {
        const chats = chatService.loadChats();
        const currentChatId = chatService.loadCurrentChatId();
        const currentChat = currentChatId 
          ? chats.find(chat => chat.id === currentChatId) || null
          : null;

        setChatState(prev => ({
          ...prev,
          chats,
          currentChat
        }));
      } catch (error) {
        ErrorUtils.handleAsyncError('Load initial chat state', error, 'ChatHook');
        setChatState(prev => ({
          ...prev,
          error: 'Failed to load chat history'
        }));
      }
    };

    loadInitialState();
  }, []);

  /**
   * Save chats to localStorage whenever chat state changes.
   */
  useEffect(() => {
    if (chatState.chats.length > 0) {
      chatService.saveChats(chatState.chats);
    }
    
    if (chatState.currentChat) {
      chatService.saveCurrentChatId(chatState.currentChat.id);
    }
  }, [chatState.chats, chatState.currentChat]);

  /**
   * Set error state with automatic clearing.
   */
  const setError = useCallback((error: string | null) => {
    setChatState(prev => ({ ...prev, error }));
    
    // Auto-clear error after 5 seconds
    if (error) {
      setTimeout(() => {
        setChatState(prev => prev.error === error ? { ...prev, error: null } : prev);
      }, 5000);
    }
  }, []);

  /**
   * Create a new chat conversation.
   */
  const createNewChat = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      currentChat: null,
      error: null
    }));
    chatService.saveCurrentChatId(null);
  }, []);

  /**
   * Select and switch to an existing chat.
   */
  const selectChat = useCallback((chatId: string) => {
    setChatState(prev => {
      const selectedChat = prev.chats.find(chat => chat.id === chatId);
      if (!selectedChat) {
        return { ...prev, error: 'Chat not found' };
      }

      return {
        ...prev,
        currentChat: selectedChat,
        error: null
      };
    });
  }, []);

  /**
   * Delete a chat by ID.
   */
  const deleteChat = useCallback((chatId: string) => {
    setChatState(prev => {
      const updatedChats = chatService.deleteChat(prev.chats, chatId);
      const isCurrentChat = prev.currentChat?.id === chatId;
      
      return {
        ...prev,
        chats: updatedChats,
        currentChat: isCurrentChat ? null : prev.currentChat
      };
    });

    // Clear current chat ID if we deleted the current chat
    setChatState(prev => {
      if (prev.currentChat?.id === chatId) {
        chatService.saveCurrentChatId(null);
      }
      return prev;
    });
  }, []);

  /**
   * Add a message to the current or new chat.
   */
  const addMessage = useCallback(async (content: string, sender: MessageSender, chatId?: string) => {
    if (!content.trim()) return;

    const message = chatService.createMessage(content, sender);

    setChatState(prev => {
      let updatedChats = [...prev.chats];
      let currentChat = prev.currentChat;

      if (chatId) {
        // Add to specific existing chat
        const chatIndex = updatedChats.findIndex(c => c.id === chatId);
        if (chatIndex >= 0) {
          updatedChats[chatIndex] = chatService.addMessageToChat(updatedChats[chatIndex], message);
          currentChat = updatedChats[chatIndex];
        }
      } else if (currentChat) {
        // Add to current chat
        const chatIndex = updatedChats.findIndex(c => c.id === currentChat!.id);
        if (chatIndex >= 0) {
          updatedChats[chatIndex] = chatService.addMessageToChat(currentChat, message);
          currentChat = updatedChats[chatIndex];
        }
      } else {
        // Create new chat
        currentChat = chatService.createChat(message);
        updatedChats = [currentChat, ...updatedChats];
      }

      return {
        ...prev,
        chats: updatedChats,
        currentChat,
        error: null
      };
    });

    return message;
  }, []);

  /**
   * Update a specific message (useful for loading states).
   */
  const updateMessage = useCallback((messageId: string, updates: Partial<Message>) => {
    setChatState(prev => {
      if (!prev.currentChat) return prev;

      const updatedChat = chatService.updateMessageInChat(prev.currentChat, messageId, updates);
      const chatIndex = prev.chats.findIndex(c => c.id === updatedChat.id);
      
      if (chatIndex >= 0) {
        const updatedChats = [...prev.chats];
        updatedChats[chatIndex] = updatedChat;

        return {
          ...prev,
          chats: updatedChats,
          currentChat: updatedChat
        };
      }

      return prev;
    });
  }, []);

  /**
   * Send a user message and get AI response.
   */
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isGeneratingRef.current) return;

    setChatState(prev => ({ ...prev, isLoading: true, error: null }));
    isGeneratingRef.current = true;

    try {
      // Add user message
      await addMessage(content, 'user');

      // Create loading AI message
      const loadingMessage = chatService.createMessage('', 'assistant');
      loadingMessage.isLoading = true;
      await addMessage('', 'assistant');

      // Update the loading message ID for tracking
      const messageId = loadingMessage.id;

      // Generate AI response
      const aiResponse = await chatService.generateAIResponse(content);

      if (aiResponse.success) {
        // Update the loading message with actual content
        updateMessage(messageId, {
          content: aiResponse.content,
          isLoading: false
        });
      } else {
        // Update with error message
        updateMessage(messageId, {
          content: aiResponse.content,
          isLoading: false
        });
        setError(aiResponse.error || 'Failed to generate response');
      }
    } catch (error) {
      ErrorUtils.handleAsyncError('Send message', error, 'ChatHook');
      setError('Failed to send message. Please try again.');
    } finally {
      setChatState(prev => ({ ...prev, isLoading: false }));
      isGeneratingRef.current = false;
    }
  }, [addMessage, updateMessage, setError]);

  /**
   * Clear all chats.
   */
  const clearAllChats = useCallback(() => {
    chatService.clearAllChats();
    setChatState(prev => ({
      ...prev,
      chats: [],
      currentChat: null,
      error: null
    }));
  }, []);

  /**
   * Export all chats as JSON.
   */
  const exportChats = useCallback(() => {
    return chatService.exportChats(chatState.chats);
  }, [chatState.chats]);

  /**
   * Import chats from JSON.
   */
  const importChats = useCallback((jsonData: string) => {
    try {
      const importedChats = chatService.importChats(jsonData);
      setChatState(prev => ({
        ...prev,
        chats: [...importedChats, ...prev.chats],
        error: null
      }));
    } catch {
      setError('Failed to import chats. Please check the file format.');
    }
  }, [setError]);

  /**
   * Get statistics about current chats.
   */
  const getChatStats = useCallback(() => {
    const totalMessages = chatState.chats.reduce((total, chat) => total + chat.messages.length, 0);
    const lastChatDate = chatState.chats.length > 0 
      ? new Date(Math.max(...chatState.chats.map(chat => chat.updatedAt.getTime())))
      : undefined;

    return {
      totalChats: chatState.chats.length,
      totalMessages,
      lastChatDate
    };
  }, [chatState.chats]);

  /**
   * Clear current error.
   */
  const clearError = useCallback(() => {
    setChatState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    // State
    chatState,
    isLoading: chatState.isLoading || isGeneratingRef.current,
    
    // Chat management
    createNewChat,
    selectChat,
    deleteChat,
    clearAllChats,
    
    // Message operations
    sendMessage,
    addMessage,
    updateMessage,
    
    // Utility
    exportChats,
    importChats,
    getChatStats,
    clearError,
    setError
  };
};