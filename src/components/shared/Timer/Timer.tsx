/**
 * Timer component for displaying countdown and progress visualization.
 * 
 * This component renders a countdown timer with visual progress indicator
 * for OTP expiration. It formats time display and shows remaining time
 * as both text and a visual progress bar.
 * 
 * @fileoverview Timer component with countdown and progress visualization
 */

import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

/**
 * Props interface for the Timer component.
 */
interface TimerProps {
  /** Time remaining in seconds */
  timeRemaining: number;
  /** Whether the timer is currently active */
  isActive: boolean;
  /** Total duration for calculating progress (default: 120 seconds) */
  totalDuration?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Formats seconds into MM:SS format.
 * 
 * @param seconds - Time in seconds to format
 * @returns Formatted time string (e.g., "02:30")
 */
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Timer functional component.
 * 
 * Displays a countdown timer with visual progress indicator. Shows remaining
 * time in MM:SS format and renders a progress bar showing how much time has
 * elapsed. Changes color based on remaining time (green -> yellow -> red).
 * 
 * @param props - Component props including time data and styling
 * @returns JSX element representing the timer
 */
export const Timer: React.FC<TimerProps> = ({
  timeRemaining,
  isActive,
  totalDuration = 120,
  className = ''
}) => {
  // Calculate progress percentage (0-100)
  const progressPercentage = Math.max(0, ((totalDuration - timeRemaining) / totalDuration) * 100);
  
  // Determine color based on remaining time (teal -> orange -> red)
  const getTimerColor = () => {
    const timePercent = (timeRemaining / totalDuration) * 100;
    if (timePercent > 66) return 'primary.main'; // teal for >66%
    if (timePercent > 33) return 'hsl(36, 100%, 50%)'; // orange for 33-66%
    return 'error.main'; // red for <33%
  };
  
  // Determine progress bar color (teal -> orange -> red)
  const getProgressColor = () => {
    const timePercent = (timeRemaining / totalDuration) * 100;
    if (timePercent > 66) return 'primary'; // teal
    if (timePercent > 33) return 'warning'; // orange 
    return 'error'; // red
  };

  if (!isActive) {
    return null;
  }

  return (
    <Box 
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      }}
    >
      {/* Time Display */}
      <Typography 
        variant="h6"
        sx={{
          fontWeight: 500,
          color: getTimerColor(),
          transition: 'color 0.5s ease-in-out'
        }}
      >
        {formatTime(timeRemaining)}
      </Typography>
      
      {/* Progress Bar */}
      <Box sx={{ width: '100%', maxWidth: 300 }}>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          color={getProgressColor()}
          sx={{
            height: 8,
            borderRadius: 1,
            backgroundColor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              transition: 'transform 1000ms ease-in-out'
            }
          }}
        />
      </Box>
      
      {/* Helper Text */}
      <Typography 
        variant="body2"
        sx={{ color: 'text.secondary' }}
      >
        Code expires in {formatTime(timeRemaining)}
      </Typography>
    </Box>
  );
};

export default Timer;