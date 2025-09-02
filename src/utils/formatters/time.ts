/**
 * Time and date formatting utilities.
 * 
 * This module provides consistent time and date formatting functions
 * used throughout the application.
 */

/**
 * Format chat timestamp for display in chat list.
 * 
 * Shows relative time (now, 5m, 2h, 3d) or absolute date for older messages.
 * 
 * @param timestamp - Date to format
 * @returns Formatted time string
 */
export const formatChatTime = (timestamp: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / 60000);
  
  if (diffInMinutes < 1) return 'now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d`;
  
  return timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

/**
 * Format full date and time for display.
 * 
 * @param timestamp - Date to format
 * @returns Formatted date and time string
 */
export const formatFullDateTime = (timestamp: Date): string => {
  return timestamp.toLocaleDateString([], { 
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format time only for display.
 * 
 * @param timestamp - Date to format
 * @returns Formatted time string (HH:MM AM/PM)
 */
export const formatTimeOnly = (timestamp: Date): string => {
  return timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format date only for display.
 * 
 * @param timestamp - Date to format
 * @returns Formatted date string (Month DD, YYYY)
 */
export const formatDateOnly = (timestamp: Date): string => {
  return timestamp.toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get relative time string (e.g., "2 hours ago", "just now").
 * 
 * @param timestamp - Date to format
 * @returns Relative time string
 */
export const getRelativeTime = (timestamp: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
  
  return formatDateOnly(timestamp);
};