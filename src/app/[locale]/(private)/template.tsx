'use client';

import { Box, Stack } from '@mui/material';

import AppNavbar from '@/components/Layout/AppNavbar';
import { Footer } from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

export default function PrivateTemplate({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <AppNavbar />
      <Box
        component="main"
        sx={{
          height: '100%',
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <Stack
          sx={{
            height: '100%',
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Header />
          <Box
            sx={{
              width: '100%',
              flex: 1,
              px: { xs: 4, md: 6 },
              pt: { xs: 6, sm: 8 },
              mt: { xs: 19, md: 0 },
            }}
          >
            {children}
          </Box>
          <Footer />
        </Stack>
      </Box>
    </Box>
  );
}
