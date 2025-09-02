/**
 * Header component - Navigation header using Material-UI components.
 * 
 * This component provides the main navigation header for authenticated
 * users using MUI AppBar, Avatar, and Menu components with modern theming.
 * 
 * @fileoverview Header navigation component with MUI
 */

import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Avatar, 
  Button, 
  Menu, 
  MenuItem, 
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Box
} from '@mui/material';
import { Logo } from '../../shared/Logo';
import { type User } from '../../../types/auth';
import { ChevronDown, LogOut } from 'lucide-react';

/**
 * Props interface for the Header component.
 */
interface HeaderProps {
  /** Current authenticated user data */
  user?: User | null;
  /** Callback function triggered when user clicks sign out */
  onSignOut?: () => void;
  /** Whether sign out operation is in progress */
  isSigningOut?: boolean;
  /** Custom styling */
  sx?: object;
}

/**
 * Header functional component.
 * 
 * Renders the main navigation header with logo, user menu, and sign-out
 * functionality. Includes a dropdown menu for user actions using MUI Menu.
 * 
 * @param props - Component props including user data and callbacks
 * @returns JSX element representing the header navigation
 */
export const Header: React.FC<HeaderProps> = ({
  user,
  onSignOut,
  isSigningOut = false,
  sx = {}
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  /**
   * Handles menu open.
   */
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles menu close.
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handles sign out button click.
   */
  const handleSignOutClick = () => {
    handleMenuClose();
    if (onSignOut) {
      onSignOut();
    }
  };

  /**
   * Get user initials for avatar.
   */
  const getUserInitials = (user: User) => {
    // Handle user_metadata if it exists (for Supabase users)
    if ((user as any).user_metadata?.full_name) {
      return (user as any).user_metadata.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper', 
        borderBottom: 1, 
        borderColor: 'divider',
        color: 'text.primary',
        ...sx 
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 2, sm: 3 } }}>
        {/* Left side - Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Logo />
        </Box>

        {/* Right side - User menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <>
              {/* User menu button */}
              <Button
                onClick={handleMenuOpen}
                variant="text"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1.5, 
                  px: 1.5, 
                  py: 1,
                  minWidth: 'auto',
                  color: 'text.primary'
                }}
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
                aria-label="User menu"
              >
                {/* User avatar */}
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: 'secondary.main',
                    color: 'secondary.contrastText',
                    fontSize: '0.875rem'
                  }}
                >
                  {getUserInitials(user)}
                </Avatar>
                
                {/* User email */}
                <Box 
                  sx={{ 
                    display: { xs: 'none', sm: 'block' }, 
                    maxWidth: 160, 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  component="span"
                >
                  {user.email}
                </Box>
                
                {/* Dropdown arrow */}
                <ChevronDown
                  size={16}
                  style={{
                    transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }}
                />
              </Button>

              {/* Dropdown menu */}
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                slotProps={{
                  paper: {
                    sx: { minWidth: 200, mt: 1 }
                  }
                }}
              >
                <MenuItem onClick={handleSignOutClick} disabled={isSigningOut}>
                  <ListItemIcon>
                    {isSigningOut ? (
                      <CircularProgress size={20} />
                    ) : (
                      <LogOut size={20} />
                    )}
                  </ListItemIcon>
                  <ListItemText>
                    {isSigningOut ? 'Signing out...' : 'Sign out'}
                  </ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;