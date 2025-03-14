'use client';

import type { PaletteOptions } from '@mui/material/styles/createPalette';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config.ts';

const fullTailwindConfig = resolveConfig(tailwindConfig);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colorMapper = (tailwindColor: any) => {
  const { DEFAULT, ...color } = tailwindColor || {};

  return {
    ...color,
    main: DEFAULT,
  };
};

export const palette: PaletteOptions = {
  // Semantic color
  primary: colorMapper(fullTailwindConfig.theme?.colors?.primary),
  secondary: colorMapper(fullTailwindConfig.theme?.colors?.secondary),
  error: colorMapper(fullTailwindConfig.theme?.colors?.error),
  warning: colorMapper(fullTailwindConfig.theme?.colors?.warning),
  info: colorMapper(fullTailwindConfig.theme?.colors?.info),
  success: colorMapper(fullTailwindConfig.theme?.colors?.success),
  text: colorMapper(fullTailwindConfig.theme?.colors?.text),
  action: colorMapper(fullTailwindConfig.theme?.colors?.action),
  background: colorMapper(fullTailwindConfig.theme?.colors?.background),
  custom: colorMapper(fullTailwindConfig.theme?.colors?.custom),
};
