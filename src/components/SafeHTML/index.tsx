'use client';

import React, { useMemo } from 'react';

import type { TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';
import DOMPurify from 'dompurify';
import type { FC } from 'react';

interface ISafeHTMLProps extends TypographyProps {
  content: string;
}

export const SafeHTML: FC<ISafeHTMLProps> = ({ content, ...props }) => {
  const sanitizedContent = useMemo(
    () => ({
      __html: DOMPurify.sanitize(content),
    }),
    [content],
  );

  return <Typography dangerouslySetInnerHTML={sanitizedContent} {...props} />;
};
