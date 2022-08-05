import {extendTheme} from 'native-base';

const colors = {
  white: '#fbf2e6',
  blue: '#1cadc6',
  yellow: '#e2c943',
};

const Theme = extendTheme({
  colors: {
    primary: {
      50: '#dff6ff',
      100: '#b3e0ff',
      200: '#84cbfc',
      300: '#56b6fb',
      400: '#32a1fa',
      500: '#2388e1',
      600: '#186aaf',
      700: '#0c4b7e',
      800: '#002d4d',
      900: '#00101e',
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
  },
  components: {
    Button: {
      defaultProps: {
        rounded: 'lg',
        mx: 2,
        _text: {
          fontSize: 'lg',
          letterSpacing: 1.5,
          fontWeight: 'bold',
        },
        size: 'lg',
      },
      variants: {
        chip: {
          rounded: 'full',
          borderColor: 'primary.500',
          borderWidth: '2',
          size: 'sm',
          mt: '1',
          mb: '1',
        },
        chipSelected: {
          rounded: 'full',
          borderColor: 'primary.500',
          backgroundColor: 'primary.500',
          borderWidth: '2',
          size: 'sm',
        },
      },
    },
    Input: {
      defaultProps: {
        variant: 'underlined',
        size: 'lg',
      },
    },
    VStack: {
      variants: {
        section: {
          rounded: 'lg',
          bg: `light.50`,
          px: '5',
          py: '2.5',
          borderColor: 'light.100',
          borderWidth: '2',
        },
      },
    },
    Box: {
      variants: {
        section: {
          rounded: 'lg',
          bg: `light.50`,
          px: '5',
          py: '2.5',
          borderColor: 'light.100',
          borderWidth: '2',
        },
        pageTitle: {
          rounded: '3xl',
          bg: `secondary.400`,
          px: '5',
          py: '2.5',
        },
        stamped: {
          width: 60,
          height: 60,
          margin: 2,
          shadow: 7,
          alignItems: 'center',
          justifyContent: 'center',
          rounded: 'lg',
        },
        unstamped: {
          width: 60,
          height: 60,
          margin: 2,
          alignItems: 'center',
          justifyContent: 'center',
          rounded: 'lg',
        },
      },
    },
    Text: {
      variants: {
        section: {
          fontSize: 'lg',
          pb: '2',
        },
        field: {
          fontSize: 'md',
          fontWeight: 'semibold',
        },
      },
    },
    Heading: {
      defaultProps: {
        textAlign: 'center',
      },
    },
  },
});

export default Theme;
