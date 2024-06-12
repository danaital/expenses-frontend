import React, { FC } from 'react';
import { MenuItem, Menu } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onLogout: () => void;
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ anchorEl, onClose, onLogout }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
    onClose();
  };

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  const profileText = "Profile";
  const logoutText = "Logout";

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={handleProfileClick}>{profileText}</MenuItem>
      <MenuItem onClick={handleLogoutClick}>{logoutText}</MenuItem>
    </Menu>
  );
};
