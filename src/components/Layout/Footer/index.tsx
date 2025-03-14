import * as React from 'react';

import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import constants from '@/constants';

export function Footer() {
  return (
    <Stack
      direction="row"
      sx={{
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        pl: { xs: 4, md: 6 },
        py: 4,
      }}
      spacing={2}
    >
      <Typography color="textSecondary" className="text-xs sm:text-sm md:text-base">
        {`All Rights Reserved ${constants.shared.APP.NAME} © 2025. A WhoDoDo Company.`}
      </Typography>
    </Stack>
  );
}
