import { extendTheme } from 'native-base';

const colors = {
  white: '#fbf2e6',
  blue: '#1cadc6',
  yellow:'#e2c943'
}

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
    secondary: 
{
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
    tertiary: 
{
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
}
  }
});

export default Theme
