import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export const theme = extendTheme(
  {
    colors: {
      primary: {
        50: '#ff9432',
        100: '#ff8a28',
        200: '#ff801e',
        300: '#ff7614',
        400: '#ff6c0a',
        500: '#fd6200',
        600: '#f35800',
        700: '#e94e00',
        800: '#df4400',
        900: '#d53a00',
        transparent: '#fd620055',
      },
      secondary: {
        50: '#9865fe',
        100: '#8e5bf4',
        200: '#8451ea',
        300: '#7a47e0',
        400: '#703dd6',
        500: '#6633cc',
        600: '#5c29c2',
        700: '#521fb8',
        800: '#4815ae',
        900: '#3e0ba4',
        transparent: '#6633cc55',
      },
    },
    fonts: {
      heading: 'Barlow, sans-serif',
      body: 'inter, sans-serif',
    },
    components: {
      Button: {
        defaultProps: {
          focusBorderColor: 'secondary.500',
        },
      },
      Input: {
        defaultProps: {
          focusBorderColor: 'secondary.500',
        },
      },
      IconButton: {
        defaultProps: {
          focusBorderColor: 'secondary.500',
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' })
);
