'use client';

import { Fragment } from 'react';

import { Card as MuiCard, CardContent, Stack, Typography } from '@mui/material';

import { Button } from '@/components';
import type { TEditBilling } from '@/modules/user';

interface IBillingInfo extends TEditBilling {
  onEdit: () => void;
}

export function BillingInfo({ billingName, billingAddress, onEdit }: IBillingInfo) {
  return (
    <Fragment>
      <MuiCard elevation={0} className="shadow-none h-full bg-custom-secondary">
        <CardContent className="p-4 sm:p-6">
          <Typography component="h5" variant="h6">
            Billing Information
          </Typography>
          <Stack alignItems="flex-start" rowGap={4} mt={6}>
            <Stack>
              <Typography variant="subtitle2" className="text-text-secondary">
                Billing Name
              </Typography>
              <Typography>{billingName}</Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2" className="text-text-secondary">
                Billing Address
              </Typography>
              <Typography>{billingAddress}</Typography>
            </Stack>
            <Button size="small" variant="text" className="px-2" onClick={onEdit}>
              Edit billing information
            </Button>
          </Stack>
        </CardContent>
      </MuiCard>
    </Fragment>
  );
}
