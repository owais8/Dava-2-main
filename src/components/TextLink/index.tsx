'use client';

import React from 'react';

import { Typography, type TypographyProps } from '@mui/material';
import type { FC } from 'react';

import { Link } from '@/i18n/routing';

interface ITextLinkProps extends TypographyProps {
  href?: string;
}

export const TextLink: FC<ITextLinkProps> = ({
  href,
  color = 'textPrimary',
  variant = 'body1',
  children,
  component = Link,
  ...props
}) => {
  return (
    <Typography href={href} component={component} variant={variant} color={color} {...props}>
      {children}
    </Typography>
  );
};
