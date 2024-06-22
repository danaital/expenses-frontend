import React, { FC, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconButton, Tooltip } from '@mui/material';
import { Home, AccountCircle, AccountBalanceWallet, Sell, Assessment} from '@mui/icons-material';
import { ProfileMenu } from './profile-menu';

const NavContainer = styled.div`
  width: 80px;
  background-color: #333;
  height: 100vh;
  padding-top: 20px;
`;

const NavItem = styled.div<{ isActive: boolean }>`
  color: #FFF
  text-decoration: none;
  padding: 10px;
  cursor: pointer;
  ${(props) => props.isActive && `color: #555;`}
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;


export const VerticalNavBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    navigate('/login');
  }
  
  return (
    <NavContainer>
      <Link to="/home" style={{ textDecoration: 'none', color: '#fff' }}>
        <Tooltip title="Home" placement="right">
          <NavItem isActive={location.pathname === "/home"}>
            <IconContainer>
              <Home />
            </IconContainer>
          </NavItem>
        </Tooltip>
      </Link>
      <Link to="/expenses" style={{ textDecoration: 'none', color: '#fff' }}>
        <Tooltip title="Expenses" placement="right">
          <NavItem isActive={location.pathname === "/expenses"}>
            <IconContainer>
              <AccountBalanceWallet />
            </IconContainer>
          </NavItem>
        </Tooltip>
      </Link>
      <Link to="/expensesTypes" style={{ textDecoration: 'none', color: '#fff' }}>
        <Tooltip title="Expense Types" placement="right">
          <NavItem isActive={location.pathname === "/expensesTypes"}>
            <IconContainer>
              <Sell />
            </IconContainer>
          </NavItem>
        </Tooltip>
      </Link>
      <Link to="/reports" style={{ textDecoration: 'none', color: '#fff' }}>
        <Tooltip title="Reports" placement="right">
          <NavItem isActive={location.pathname === "/reports"}>
            <IconContainer>
              <Assessment />
            </IconContainer>
          </NavItem>
        </Tooltip>
      </Link>
      <Tooltip title="Profile/Logout" placement="right">
        <NavItem isActive={false}>
          <IconButton onClick={handleMenuOpen} style={{ color: '#fff' }}>
            <AccountCircle/>
          </IconButton>
        </NavItem>
      </Tooltip>
      <ProfileMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onLogout={onLogout}
      />
    </NavContainer>
  );
};
