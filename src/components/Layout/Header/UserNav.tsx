'use client';

import * as React from 'react';

import {
  AdminPanelSettingsOutlined,
  BusinessOutlined,
  CreditCardOutlined,
  GroupsOutlined,
  Logout,
  NotificationsOutlined,
  PersonOutline,
} from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import constants from '@/constants';
import { usePathname, useRouter } from '@/i18n/routing';
import { logout } from '@/modules/auth';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const USER_NAV_ITEMS = [
  {
    icon: <PersonOutline />,
    label: 'Profile',
    href: constants.routePages.private.SETTING_PROFILE_PAGE,
  },
  {
    icon: <BusinessOutlined />,
    label: 'Organisation',
    href: constants.routePages.private.SETTING_ORGANISATION_PAGE,
  },
  {
    icon: <GroupsOutlined />,
    label: 'Team',
    href: constants.routePages.private.SETTING_TEAM_PAGE,
  },
  {
    icon: <NotificationsOutlined />,
    label: 'Notifications',
    href: constants.routePages.private.SETTING_NOTIFICATION_PAGE,
  },
  {
    icon: <AdminPanelSettingsOutlined />,
    label: 'Security',
    href: constants.routePages.private.SETTING_SECURITY_PAGE,
  },
  {
    icon: <CreditCardOutlined />,
    label: 'Billing',
    href: constants.routePages.private.SETTING_BILLING_PAGE,
  },
];

export default function UserNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" spacing={2} className="ml-2">
      <StyledBadge
        overlap="circular"
        variant="dot"
        onClick={handleClick}
        className="cursor-pointer"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar alt="Remy Sharp" src="/images/avatar.jpg" />
      </StyledBadge>
      <Menu
        elevation={2}
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {USER_NAV_ITEMS.map((item) => (
          <MenuItem
            key={item.label}
            className="px-6 py-2 cursor-pointer"
            selected={pathname === item.href}
            onClick={() => router.push(item.href)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.label}
          </MenuItem>
        ))}

        <MenuItem className="px-6 py-2 cursor-pointer" onClick={logout}>
          <ListItemIcon>
            <Logout className="w-6 h-6 min-w-0 mr-2" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </Stack>
  );
}
