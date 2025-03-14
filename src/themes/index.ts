'use client';

import { createTheme } from '@mui/material/styles';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config.ts';
import { palette } from '@/themes/palette';
import { typography } from '@/themes/typography';

const defaultTheme = createTheme();
const tailwindTheme = resolveConfig(tailwindConfig);

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  palette: {
    ...palette,
    divider: tailwindTheme.theme.colors.custom.border,
  },
  typography,
  spacing: 4,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        sizeSmall: {
          fontSize: '13px',
        },
        sizeMedium: {
          padding: '9px 24px 7px',
          fontSize: '14px',
        },
        sizeLarge: {
          fontSize: '15px',
          padding: '8px 24px',
        },
        contained: {
          '&:not(.MuiButton-colorInherit):not(.Mui-disabled)': {
            color: defaultTheme.palette.common.white,
          },
        },
        containedSecondary: {
          '&.Mui-disabled': {
            backgroundColor: tailwindTheme.theme.colors.secondary.dark,
          },
        },
        outlinedSecondary: {
          '&.Mui-disabled': {
            color: tailwindTheme.theme.colors.secondary.dark,
            borderColor: tailwindTheme.theme.colors.secondary.dark,
          },
        },
        outlinedError: {
          '&.Mui-disabled': {
            borderColor: tailwindTheme.theme.colors.error.light,
            color: tailwindTheme.theme.colors.error.light,
          },
        },
        outlinedInherit: {
          '&.Mui-disabled': {
            color: tailwindTheme.theme.colors.action.active,
            borderColor: tailwindTheme.theme.colors.action.active,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        sizeSmall: {
          fontSize: 12,
          height: 20,
        },
        filled: {
          '&:not(.MuiChip-filledDefault)': {
            color: defaultTheme.palette.common.white,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '.MuiInputBase-input': {
            '&:not(.MuiInputBase-inputSizeSmall):not(.MuiInputBase-inputMultiline)': {
              padding: '10px 14px',
              height: defaultTheme.typography.pxToRem(30),
            },
          },
          '.MuiInputLabel-root': {
            '&:not(.MuiInputLabel-sizeSmall)': {
              lineHeight: defaultTheme.typography.pxToRem(20),
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '13.5px 14px',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.MuiInputLabel-sizeMedium': {
            lineHeight: defaultTheme.typography.pxToRem(20),
          },
          '&.MuiFormLabel-colorError': {
            color: tailwindTheme.theme.colors.error.DEFAULT,
          },
        },
      },
    },
  },
});

export default theme;
