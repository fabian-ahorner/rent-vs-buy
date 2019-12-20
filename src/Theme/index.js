import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';

const palette = {
  primary: {
    main: '#f9b282'
  },
  rent: {
    main: '#64ccda'
  },
  buy: {
    main: '#8f4426'
  },
  secondary: {
    dark: '#8f4426',
    main: '#de6b35',
    light: '#f9b282',
  }
}


const DARK_THEME = createMuiTheme({
  palette: {
    type: 'dark',
    ...palette,
    background: {
      default: '#F0F0F0'
    }
  },
});

const LIGHT_THEME = createMuiTheme({
  palette
})

export default function Theme({ children, dark }) {
  return (<ThemeProvider theme={dark ? DARK_THEME : LIGHT_THEME}>
    {children}
  </ThemeProvider>)
}
