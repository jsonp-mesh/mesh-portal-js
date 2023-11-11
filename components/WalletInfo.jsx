import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PortalContext } from '../context/PortalContext';

export default function WalletBalanceCard() {
      const { portalInstance, isPortalReady } = useContext(PortalContext);

    const [walletBalance, setWalletBalance] = useState(null);
    const [smartContractAddress, setSmartContractAddress] = useState(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

 // WalletBalanceCard.js
useEffect(() => {
  if (portalInstance) {
    const fetchWalletBalance = async () => {
      try {
          const wallettInfo = await portalInstance.getBalances();
          console.log('wallettInfo', wallettInfo);
          setWalletBalance(wallettInfo[0].balance);
          setSmartContractAddress(wallettInfo[0].contractAddress);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWalletBalance();
  } else {
    setLoading(false);
  }
}, [portalInstance]);



  if (loading) {
    return <Typography>Loading wallet balance...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Card>
          <CardContent>
              <Typography variant="h6">Wallet Address: {portalInstance?.address}</Typography>
        <Typography variant="body2">Wallet Balance:
          ${walletBalance ? walletBalance : 'No balance data available'}
              </Typography>
              <Typography variant="body2">
         Smart Contract Address: {smartContractAddress ? smartContractAddress : 'No smart contract address data available'}
        </Typography>
      </CardContent>
    </Card>
  );
}
