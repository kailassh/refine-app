/**
 * Timer component for displaying countdown and progress visualization.
 * 
 * This component renders a countdown timer with visual progress indicator
 * for OTP expiration. It formats time display and shows remaining time
 * as both text and a visual progress bar.
 * 
 * @fileoverview Timer component with countdown and progress visualization
 */

import React, { useMemo } from 'react';
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
export const Timer: React.FC<TimerProps> = React.memo(({
  timeRemaining,
  isActive,
  totalDuration = 120,
  className = ''
}) => {
  // Memoize calculations to prevent unnecessary re-computation
  const { progressPercentage, timerColor, progressColor } = useMemo(() => {
    const progress = Math.max(0, ((totalDuration - timeRemaining) / totalDuration) * 100);
    const percent = (timeRemaining / totalDuration) * 100;
    
    let timer: string;
    let progressBar: 'primary' | 'warning' | 'error';
    
    if (percent > 66) {
      timer = 'primary.main';
      progressBar = 'primary';
    } else if (percent > 33) {
      timer = 'hsl(36, 100%, 50%)';
      progressBar = 'warning';
    } else {
      timer = 'error.main';
      progressBar = 'error';
    }
    
    return {
      progressPercentage: progress,
      timerColor: timer,
      progressColor: progressBar
    };
  }, [timeRemaining, totalDuration]);
  
  // Memoize formatted time to prevent unnecessary re-computation
  const formattedTime = useMemo(() => formatTime(timeRemaining), [timeRemaining]);

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
          color: timerColor,
          transition: 'color 0.5s ease-in-out'
        }}
      >
        {formattedTime}
      </Typography>
      
      {/* Progress Bar */}
      <Box sx={{ width: '100%', maxWidth: 300 }}>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          color={progressColor}
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
      
    </Box>
  );
});

export default Timer;