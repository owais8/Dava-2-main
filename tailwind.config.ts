import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1536px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6BBEFF',
          dark: '#5698cc',
          light: '#8acbff',
        },
        'primary-red': {
          DEFAULT: '#EE4D52',
          dark: '#cc3f45',
          light: '#f17275',
        },
        secondary: {
          DEFAULT: '#000',
          dark: '#333',
          light: '#4D4D4D',
        },
        info: {
          DEFAULT: '#26C6F9',
          dark: '#21AEDB', // fill backcolor opacity 20%
          light: '#2DD7FF',
        },
        success: {
          DEFAULT: '#72E128',
          dark: '#64C623',
          light: '#7FFD3D',
        },
        warning: {
          DEFAULT: '#FDB528',
          dark: '#DF9F23',
          light: '#FFC93D',
        },
        error: {
          DEFAULT: '#FF4D49',
          dark: '#E04440',
          light: '#FF6E6B',
        },
        text: {
          primary: '#4C4E64',
          secondary: '#90919E',
          disabled: '#bbbcc5',
        },
        action: {
          active: '#9e9fab',
          hover: '#f6f6f7',
          selected: '#f1f1f3',
          disabled: '#d0d1d7',
          disabledBackground: '#eaeaec',
        },
        background: {
          default: '#f0f4fc',
          primary: '#fdeaeb',
          secondary: '#eeeff1',
          info: '#e5f8fe',
          success: '#D7FAE1',
          warning: '#fff7e5',
          error: '#ffeae9',
        },
        divider: '#eaeaec',
        custom: {
          border: '#E0E0E0',
          overlay: '#a5a6b1',
          snapbar: '#212121',
          icon: '#e4eaf5',
          secondary: '#F7F9FD',
          background: '#fbfcfe',
          background2: '#F0F4FB',
          card: '#FFFFFF',
          chip: '#616161',
          switch: '#D8E0EE',
          tab: '#353538',
          primary: '#0BD9C0',
        },
      },
    },

    spacing: {
      '0': '0px',
      '0.5': '2px',
      '1': '4px',
      '1.5': '6px',
      '2': '8px',
      '2.5': '10px',
      '3': '12px',
      '3.5': '14px',
      '4': '16px',
      '5': '20px',
      '6': '24px',
      '7': '28px',
      '8': '32px',
      '9': '36px',
      '10': '40px',
      '11': '44px',
      '12': '48px',
      '14': '56px',
      '16': '64px',
      '20': '80px',
      '24': '96px',
      '28': '112px',
      '32': '128px',
      '36': '144px',
      '40': '160px',
      '44': '176px',
      '48': '192px',
      '52': '208px',
      '56': '224px',
      '60': '240px',
      '64': '256px',
      '72': '288px',
      '80': '320px',
      '96': '384px',
    },
    boxShadow: {
      card: '0px 2px 10px rgba(76,78,100, 22%)',
      dot: '0px 2px 4px rgba(0,0,0, 30%)',
    },
  },
  important: true,
  plugins: [require('tailwindcss-animate')],
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
