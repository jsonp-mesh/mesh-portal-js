import React, { useState, useContext } from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import { PortalContext } from '../context/PortalContext';
import WalletBalanceCard from '../components/WalletInfo';

export default function ParentComponent() {
  const { portalInstance, isPortalReady } = useContext(PortalContext);
  const [error, setError] = useState(null);

  if (error) {
    return (
      <Typography color="error" align="center">
        Error: {error.message}
      </Typography>
    );
  }

  if (!isPortalReady) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
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
          <WalletBalanceCard />
        </>
      )}
    </div>
  );
}
