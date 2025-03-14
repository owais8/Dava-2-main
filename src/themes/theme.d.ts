import '@material-ui/core/styles';

import type { Color } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeColor extends Color {
    main: string;
    primary?: string;
    secondary?: string;
    light?: string;
  }

  interface TypeText {
    body: string;
    description: string;
    placeholder: string;
    onfill: string;
    link: string;
    error: string;
    disabled: string;
  }

  interface TypeCustomColor {
    border: string;
    overlay: string;
    snapbar: string;
    icon: string;
    secondary: string;
    background: string;
    background2: string;
    card: string;
    chip: string;
    tab: string;
    switch: string;
    primary: string;
  }

  interface TypeBackground {
    primary?: string;
    secondary?: string;
    error?: string;
    warning?: string;
    info?: string;
    success?: string;
  }

  interface Palette {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    error?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    info?: PaletteColorOptions;
    success?: PaletteColorOptions;
    mode?: PaletteMode;
    tonalOffset?: PaletteTonalOffset;
    contrastThreshold?: number;
    common?: Partial<CommonColors>;
    grey?: ColorPartial;
    text?: Partial<TypeText>;
    divider?: string;
    action?: Partial<TypeAction>;
    background?: Partial<TypeBackground>;
    custom?: Partial<TypeCustomColor>;
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    error?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    info?: PaletteColorOptions;
    success?: PaletteColorOptions;
    mode?: PaletteMode;
    tonalOffset?: PaletteTonalOffset;
    contrastThreshold?: number;
    common?: Partial<CommonColors>;
    grey?: ColorPartial;
    text?: Partial<TypeText>;
    divider?: string;
    action?: Partial<TypeAction>;
    background?: Partial<TypeBackground>;
    custom?: Partial<TypeCustomColor>;
  }
}
