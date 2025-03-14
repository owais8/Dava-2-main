'use client';

import React from 'react';

import type { CardProps } from '@mui/material';
import { Card, CardContent, CardHeader } from '@mui/material';

interface ComponentSectionProps extends CardProps {
  title: string;
  children: React.ReactNode;
}

export function ComponentSection({ title, children, ...props }: ComponentSectionProps) {
  return (
    <Card {...props}>
      <CardHeader component="h3" title={title} sx={{ my: 0, bgcolor: '#ddd' }} />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
