import React, { useContext } from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import { PortalContext } from '../context/PortalContext';
import WalletBalanceCard from '../components/WalletInfo';

export default function ParentComponent() {
  const { isPortalReady, portalError } = useContext(PortalContext);

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
          <WalletBalanceCard />
        </>
      )}
    </div>
  );
}
