import * as React from 'react';

import { Box, Drawer as MuiDrawer, drawerClasses, styled } from '@mui/material';

import MenuContent from '../MenuContent';
import { LogoDarkIcon } from '@/components';
import { Link } from '@/i18n/routing';

const drawerWidth = 260;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
    boxShadow: 'none',
    border: 'none',
  },
});

export default function SideMenu() {
  return (
    <Drawer variant="permanent" sx={{ display: 'none' }}>
      <Box className="flex px-5 py-3">
        <Link href="/" passHref>
          <LogoDarkIcon className="w-[173px] h-[50px]" />
        </Link>
      </Box>
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
      </Box>
    </Drawer>
  );
}
