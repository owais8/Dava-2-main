'use client';

import type { BoxProps, ButtonProps, TypographyProps } from '@mui/material';
import { Box, Stack, Typography } from '@mui/material';

import { Button } from '@/components';
import { cn } from '@/lib';

interface IPageHeadingProps extends BoxProps {
  title: string;
  titleVariant?: TypographyProps;
  description?: string;
  buttonText?: string;
  buttonProps?: ButtonProps;
  actionElement?: React.ReactNode;
  actionElementProps?: BoxProps;
}

export function PageHeading({
  title,
  titleVariant,
  description,
  buttonText,
  buttonProps,
  actionElement,
  actionElementProps,
  ...props
}: IPageHeadingProps) {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems={{ sm: 'center' }}
      justifyContent={{ sm: 'space-between' }}
      mb={6}
      rowGap={{ xs: 4, sm: 0 }}
      {...props}
    >
      <Stack flex={1} pr={{ sm: buttonText || actionElement ? 4 : 0 }}>
        <Typography component="h1" variant={titleVariant?.variant || 'h6'} {...titleVariant}>
          {title}
        </Typography>
        {!!description && <Typography mt={2}>{description}</Typography>}
      </Stack>

      {!!buttonText && <Button {...buttonProps}>{buttonText}</Button>}

      {!!actionElement && (
        <Box
          className={cn('flex items-center', actionElementProps?.className)}
          columnGap={2}
          {...actionElementProps}
        >
          {actionElement}
        </Box>
      )}
    </Box>
  );
}
