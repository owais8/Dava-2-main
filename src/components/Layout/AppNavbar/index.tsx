'use client';

import * as React from 'react';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { tabsClasses } from '@mui/material/Tabs';
import MuiToolbar from '@mui/material/Toolbar';

import MenuButton from '../MenuButton';
import SideMenuMobile from '../SideMenu/SideMenuMobile';
import { LogoDarkIcon } from '@/components';
import { Link } from '@/i18n/routing';

const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '16px !important',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

export default function AppNavbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: 'auto', md: 'none' },
        boxShadow: 0,
        bgcolor: 'custom.card',
        backgroundImage: 'none',
        borderColor: 'divider',
        top: 'var(--template-frame-height, 0px)',
      }}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            width: '100%',
            gap: 1,
          }}
        >
          <Link href="/" passHref className="flex items-center">
            <LogoDarkIcon className="w-[180px] h-[28px]" />
          </Link>

          <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuRoundedIcon className="text-text-primary -mr-2" />
          </MenuButton>
          <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
