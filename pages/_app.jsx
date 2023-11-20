import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import PortalProvider from '../context/PortalContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <PortalProvider>
        <Component {...pageProps} />
      </PortalProvider>
    </ThemeProvider>
  );
}

export default MyApp;
