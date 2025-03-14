'use client';

import Box from '@mui/material/Box';

import { ComponentContent } from '@/modules/app/components/ComponentContent';

export function DesignSystemContainer() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 8 }}>
      <ComponentContent />
    </Box>
  );
}
