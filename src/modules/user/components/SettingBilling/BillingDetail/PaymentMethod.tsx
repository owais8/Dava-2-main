'use client';

import { AddOutlined } from '@mui/icons-material';
import { Box, Card as MuiCard, CardContent, Stack, Typography } from '@mui/material';

import type { IPaymentCardProps } from './PaymentCard';
import { PaymentCard } from './PaymentCard';
import { Button } from '@/components';

export interface IPaymentMethodProps {
  data: IPaymentCardProps[];
  handleAdd?: () => void;
}

export function PaymentMethod({ data, handleAdd }: IPaymentMethodProps) {
  return (
    <MuiCard elevation={0} className="shadow-none h-full bg-custom-secondary">
      <CardContent className="p-4 sm:p-6">
        <Box className="flex flex-col sm:flex-row justify-between" rowGap={{ xs: 4, sm: 0 }}>
          <Typography component="h5" variant="h6">
            Saved Payment Methods
          </Typography>
          <Button startIcon={<AddOutlined />} onClick={handleAdd}>
            Add new card
          </Button>
        </Box>

        <Stack alignItems="flex-start" rowGap={{ xs: 4, sm: 8 }} mt={{ xs: 8, sm: 6 }}>
          {data.map((e) => (
            <PaymentCard key={e.id} {...e} />
          ))}
        </Stack>
      </CardContent>
    </MuiCard>
  );
}
