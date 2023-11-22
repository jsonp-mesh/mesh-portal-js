import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  PropTypes,
} from '@mui/material';
import TransactionsDashboard from './Transactions';
import { PortalContext } from '../context/PortalContext';
import MeshModal from './MeshModal';
import {
  handleOpenMeshModal,
  handleExit,
  handleMeshSuccess,
  handleTransferFinished,
} from '../utils/meshUtils';
import SendModal from './SendModal';

function WalletBalanceCard({ setAuthData, authData }) {
  const { portalInstance, walletAddress, isPortalReady } =
    useContext(PortalContext);
  const [walletBalance, setWalletBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMeshModal, setOpenMeshModal] = useState(false);
  const [catalogLink, setCatalogLink] = useState(null);
  const [openSendModal, setOpenSendModal] = useState(false);

  useEffect(() => {
    if (portalInstance) {
      const fetchWalletBalance = async () => {
        try {
          console.log('Fetching wallet balance', portalInstance.address);
          const response = await portalInstance.provider.request({
            method: 'eth_getBalance',
            params: [portalInstance.address, 'latest'],
          });

          const weiBalance = BigInt(response);
          const precision = 1000n; // Adjust for 3 decimal places
          const weiToEth = 1000000000000000000n; // 10^18
          const ethValue = (weiBalance * precision) / weiToEth; // Multiply before division

          const ethValueString = ethValue.toString();
          const decimalPosition = ethValueString.length - 3; // Adjust for 3 decimal places
          const formattedEthValue =
            ethValueString.slice(0, decimalPosition) +
            '.' +
            ethValueString.slice(decimalPosition);

          setWalletBalance(formattedEthValue);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      if (isPortalReady && portalInstance.address) {
        fetchWalletBalance();
      }
    }
  }, [portalInstance, portalInstance.address]);

  if (loading) {
    return <Typography>Loading wallet balance...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  const cardStyle = {
    backgroundColor: '#9e9796', // Semi-transparent dark background        color: '#e2e8f0', // Light text for contrast
    color: '#171616',
    border: '2px solid #2d3748',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  };

  const buttonStyle = {
    marginTop: '20px', // Spacing from the last text element
    backgroundColor: '#F6B94C', // A strong color for the button
    '&:hover': {
      backgroundColor: '#388e3c', // Darken on hover
    },
  };

  const fieldStyle = {
    borderBottom: '1px solid #ddd', // Underline for each field
    paddingBottom: '8px', // Space below the text
    marginBottom: '8px', // Space between fields
    display: 'flex', // Use flexbox
    justifyContent: 'space-between', // Space between label and value
  };

  const withdraw = async () => {
    setOpenSendModal(true);
  };

  const handleSendExit = () => {
    console.log('Send Modal closed');

    setOpenSendModal(false);
  };

  const handleSuccess = async (newAuthData) => {
    await setAuthData(newAuthData);
    handleMeshSuccess(newAuthData);
  };

  return (
    <div>
      <Card style={cardStyle}>
        <CardContent style={{ border: '2px solid #2d3748' }}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              ...fieldStyle,
            }}
          >
            <Typography variant="h6">Wallet Address:</Typography>
            <Typography variant="h6">{walletAddress}</Typography>
          </Box>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              ...fieldStyle,
            }}
          >
            <Typography variant="h6">Wallet Balance:</Typography>
            <Typography variant="h6">
              {walletBalance ? walletBalance : 'No balance data available'}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end">
            {authData && (
              <Button
                style={buttonStyle}
                variant="contained"
                color="secondary"
                onClick={() =>
                  handleOpenMeshModal(setCatalogLink, setOpenMeshModal)
                }
              >
                Deposit
              </Button>
            )}
            <Button
              style={{ ...buttonStyle, marginLeft: '10px' }} // Add margin to separate the buttons
              variant="contained"
              color="secondary"
              onClick={withdraw}
            >
              Withdraw
            </Button>
          </Box>
        </CardContent>
      </Card>
      <TransactionsDashboard />
      {openMeshModal && (
        <MeshModal
          open="true"
          onClose={() => setOpenMeshModal(false)}
          link={catalogLink}
          onSuccess={handleSuccess}
          onExit={handleExit}
          transferFinished={handleTransferFinished}
        />
      )}
      {openSendModal && (
        <SendModal
          open="true"
          onClose={() => setOpenSendModal(false)}
          authData={authData}
          //onSuccess={handleSuccess}
          onExit={handleSendExit}
          //transferFinished={handleTransferFinished}
        />
      )}
    </div>
  );
}

WalletBalanceCard.propTypes = {
  setAuthData: PropTypes?.func,
};
export default WalletBalanceCard;
