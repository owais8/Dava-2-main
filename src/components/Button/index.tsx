'use client';

import React from 'react';

import type { ButtonProps } from '@mui/material';
import { Button as MuiButton, CircularProgress, styled } from '@mui/material';
import type { FC } from 'react';

interface IButtonProps extends ButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
}

const ButtonContainer = styled(MuiButton)({
  '&:hover': {
    boxShadow: 'none',
  },
});

export const Button: FC<IButtonProps> = ({
  isLoading = false,
  variant = 'contained',
  color = 'secondary',
  children,
  ...props
}) => {
  return (
    <ButtonContainer
      disableTouchRipple
      disableFocusRipple
      variant={variant}
      color={color}
      startIcon={
        isLoading ? (
          <CircularProgress size="16px" color={variant === 'contained' ? 'inherit' : 'secondary'} />
        ) : null
      }
      {...props}
    >
      {children}
    </ButtonContainer>
  );
};
