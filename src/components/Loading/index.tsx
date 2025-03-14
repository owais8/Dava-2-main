import React from 'react';

import type { CircularProgressProps } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';

import { cn } from '@/lib';

interface ILoadingProps extends CircularProgressProps {
  rootClassName?: string;
}

export const Loading = ({
  rootClassName,
  size = 'small',
  color = 'secondary',
  ...props
}: ILoadingProps) => {
  return (
    <Box className={cn('flex justify-center items-center h-full w-full', rootClassName)}>
      <CircularProgress size={size} color={color} {...props} />
    </Box>
  );
};
