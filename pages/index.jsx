import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import { PortalContext } from '../context/PortalContext';
import WalletBalanceCard from '../components/WalletInfo';

export default function ParentComponent() {
  const { isPortalReady, portalError } = useContext(PortalContext);
  const [authData, setAuthData] = useState(() => {
    if (typeof window !== 'undefined') {
      // Initialize state from localStorage only in the browser
      const storedAuthData = localStorage.getItem('authData');
      return storedAuthData ? JSON.parse(storedAuthData) : null;
    }
    return null; // Return a default value (null) for server-side rendering
  });

  useEffect(() => {
    // Effect to run when authData state changes
    console.log('authData has been updated:', authData);
    // Any side effects related to authData change
  }, [authData]);

  if (portalError) {
    return (
      <Typography color="error" align="center">
        Portal Error: {portalError.message}
      </Typography>
    );
  }

  if (!isPortalReady) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" style={{ marginTop: 20 }}>
          Loading Wallet...
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      {isPortalReady && (
        <>
          <WalletBalanceCard setAuthData={setAuthData} authData={authData} />
          {authData && <p>Connected Broker</p>}
        </>
      )}
    </div>
  );
}
