'use client';

import { createTheme } from '@mui/material/styles';
import type { Palette } from '@mui/material/styles/createPalette';
import type { TypographyOptions } from '@mui/material/styles/createTypography';

const defaultTheme = createTheme();

export const typography: (palette: Palette) => TypographyOptions = () => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  htmlFontSize: 16,
  h1: {
    fontSize: defaultTheme.typography.pxToRem(96),
    fontWeight: 300,
    lineHeight: defaultTheme.typography.pxToRem(112),
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(60),
    fontWeight: 300,
    lineHeight: defaultTheme.typography.pxToRem(72),
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 400,
    lineHeight: defaultTheme.typography.pxToRem(56),
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(34),
    fontWeight: 400,
    lineHeight: defaultTheme.typography.pxToRem(42),
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 400,
    lineHeight: defaultTheme.typography.pxToRem(32),
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 500,
    lineHeight: defaultTheme.typography.pxToRem(32),
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(16),
    fontWeight: 500,
    lineHeight: defaultTheme.typography.pxToRem(28),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
    lineHeight: defaultTheme.typography.pxToRem(21),
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(16),
    fontWeight: 400,
    lineHeight: defaultTheme.typography.pxToRem(24),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
    lineHeight: defaultTheme.typography.pxToRem(21),
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
    lineHeight: defaultTheme.typography.pxToRem(14),
  },
  overline: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
    lineHeight: defaultTheme.typography.pxToRem(14),
  },
});
