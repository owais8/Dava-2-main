'use client';

import { NotificationsOutlined } from '@mui/icons-material';

import MenuButton from '../MenuButton';

export default function Notification() {
  return (
    <MenuButton
      showBadge
      aria-label="Open notifications"
      badgeProps={{ className: 'ml-auto md:ml-0' }}
    >
      <NotificationsOutlined className="icon" />
    </MenuButton>
  );
}
