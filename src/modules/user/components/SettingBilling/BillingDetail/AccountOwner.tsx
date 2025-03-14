'use client';

import { Fragment, useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { TransferAccountModal } from './TransferAccountModal';
import { Button } from '@/components';

export function AccountOwner() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Box>
        <Typography component="h3" variant="h6" mb={4}>
          Account Owner
        </Typography>
        <Box
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center"
          rowGap={{ xs: 2, sm: 0 }}
        >
          <Stack className="flex-1 sm:pr-2">
            <Typography component="h5" variant="subtitle1" fontWeight="bold">
              Sarah Wilson
            </Typography>
            <Typography className="text-text-secondary" variant="caption">
              sarah.wilson@company.com
            </Typography>
          </Stack>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Change account owner
          </Button>
        </Box>
      </Box>
      {open && <TransferAccountModal open={open} onCancel={() => setOpen(false)} />}
    </Fragment>
  );
}
