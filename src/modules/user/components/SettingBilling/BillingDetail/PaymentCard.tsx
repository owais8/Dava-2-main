'use client';

import { CreditCardOutlined } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';

import { Button } from '@/components';
import type { TPaymentCard } from '@/modules/user/schemas';
import theme from '@/themes';

export interface IPaymentCardProps extends TPaymentCard {
  onAction?: (id: number | string, actionType: TAction) => void;
}

export function PaymentCard({
  id,
  brand,
  lastFour,
  expiryDate,
  isDefault,
  onAction,
}: IPaymentCardProps) {
  return (
    <Box
      className="flex flex-col sm:flex-row items-start justify-between w-full"
      sx={{
        borderTop: { xs: `1px solid ${theme.palette.divider}`, sm: 'none' },
        paddingTop: { xs: 4, sm: 0 },
      }}
      gap={4}
    >
      <Box className="w-full flex-1" gap={2}>
        <Box className="w-full flex items-center" gap={2}>
          <CreditCardOutlined className="icon" />
          <Typography component="span" fontWeight={600}>
            {brand}
          </Typography>
          <span className="dot">
            <span />
            <span />
            <span />
            <span />
          </span>
          <Typography fontWeight={600}>{lastFour}</Typography>
          {isDefault && <Chip size="small" label="Default" className="bg-custom-chip text-white" />}
        </Box>
        <Typography variant="body2" pl={8} mt={2}>
          Expires {expiryDate}
        </Typography>
      </Box>
      <Box className="flex items-center ml-auto sm:ml-0" gap={2}>
        {!isDefault && (
          <Button
            size="small"
            variant="text"
            className="sm:px-2"
            onClick={() => onAction?.(id!, 'setAsDefault')}
          >
            Set as default
          </Button>
        )}
        <Button
          size="small"
          variant="text"
          className="sm:px-2"
          onClick={() => onAction?.(id!, 'edit')}
        >
          edit
        </Button>
        <Button
          color="error"
          size="small"
          variant="text"
          className="sm:px-2"
          onClick={() => onAction?.(id!, 'remove')}
        >
          remove
        </Button>
      </Box>
    </Box>
  );
}
