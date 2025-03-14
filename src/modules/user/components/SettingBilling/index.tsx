'use client';

import { Stack } from '@mui/material';

import { BillingDetail } from './BillingDetail';
import { InvoiceHistory } from './InvoiceHistory';
import { SettingContainer } from '@/modules/user';

export function SettingBilling() {
  return (
    <SettingContainer tab="billing">
      <Stack rowGap={7}>
        <BillingDetail />
        <InvoiceHistory />
      </Stack>
    </SettingContainer>
  );
}
