import * as React from 'react';

import type { BadgeProps, IconButtonProps } from '@mui/material';
import { Badge, badgeClasses, IconButton } from '@mui/material';

export interface MenuButtonProps extends IconButtonProps {
  showBadge?: boolean;
  className?: string;
  badgeProps?: BadgeProps;
}

export default function MenuButton({ showBadge = false, badgeProps, ...props }: MenuButtonProps) {
  return (
    <Badge
      color="success"
      variant="dot"
      invisible={!showBadge}
      sx={{ [`& .${badgeClasses.badge}`]: { right: 12, top: 8 } }}
      {...badgeProps}
    >
      <IconButton {...props} />
    </Badge>
  );
}
