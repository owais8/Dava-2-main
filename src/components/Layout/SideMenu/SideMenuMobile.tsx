import * as React from 'react';

import { Divider } from '@mui/material';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';

import Notification from '../Header/Notification';
import UserNav from '../Header/UserNav';
import MenuContent from '../MenuContent';

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({ open, toggleDrawer }: SideMenuMobileProps) {
  return (
    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
          width: 260,
        },
      }}
    >
      <Stack sx={{ height: '100%' }}>
        <Stack
          direction="row"
          sx={{
            width: '100%',
            alignItems: 'center',
            px: { xs: 4, md: 6 },
            py: { xs: 3, sm: 5 },
          }}
          spacing={2}
        >
          <Notification />
          <UserNav />
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
        </Stack>
      </Stack>
    </Drawer>
  );
}
