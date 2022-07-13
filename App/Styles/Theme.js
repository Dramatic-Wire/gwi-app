import {extendTheme} from 'native-base';

const colors = {
  white: '#fbf2e6',
  blue: '#1cadc6',
  yellow: '#e2c943',
};

const Theme = extendTheme({
  colors: {
    primary: {
      50: '#dbfcff',
      100: '#b4eef9',
      200: '#8ae2f0',
      300: '#5fd5ea',
      400: '#36c9e3',
      500: '#1cb0c9',
      600: '#0b899d',
      700: '#006271',
      800: '#003c46',
      900: '#00161a',
    },
    secondary: {
      50: '#fef9de',
      100: '#f6ecb7',
      200: '#eedf8e',
      300: '#e7d362',
      400: '#e0c638',
      500: '#c7ac1f',
      600: '#9b8615',
      700: '#6e600c',
      800: '#423903',
      900: '#181300',
    },
    tertiary: {
      50: '#e7f9ed',
      100: '#c9e7d4',
      200: '#a9d5b8',
      300: '#88c59d',
      400: '#67b481',
      500: '#4e9b68',
      600: '#3b7851',
      700: '#2a5639',
      800: '#173421',
      900: '#001306',
    },
    light: {
      50: '#fbf4e9',
      100: '#f1ddc2',
      200: '#e9c799',
      300: '#e2b06e',
      400: '#db9945',
      500: '#c2812e',
      600: '#976324',
      700: '#6b471a',
      800: '#402b10',
      900: '#160e04',
    },
  },
  components: {
    Box: {
      variants: {
        section: {
          rounded: 'lg',
          bg: `light.50`,
          px: '5',
          py: '2.5',
          mb: '5',
          borderColor: 'light.100',
          borderWidth: '2',
        },
        pageTitle: {
          rounded: '3xl',
          bg: `secondary.400`,
          px: '5',
          py: '2.5',
          mb: '5',
        },
        stamped: {
          backgroundColor: 'light.50',
          width: 60,
          height: 60,
          margin: 2,
          shadow: 7,
          alignItems: 'center',
          justifyContent: 'center',
          rounded:'lg',
        },
        unstamped: {
          backgroundColor: 'muted.500',
          width: 60,
          height: 60,
          margin: 2,
          alignItems: 'center',
          justifyContent: 'center',
          rounded:'lg'
        }
      },
    },
    Text: {
      variants: {
        section: {
          fontSize: 'lg',
          pb: '2',
        },
      },
    },
  },
});

export default Theme;
