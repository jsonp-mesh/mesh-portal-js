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

function WalletBalanceCard({ setAuthData }) {
  const { portalInstance, walletAddress } = useContext(PortalContext);
  const [walletBalance, setWalletBalance] = useState(null);
  const [smartContractAddress, setSmartContractAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMeshModal, setOpenMeshModal] = useState(false);
  const [catalogLink, setCatalogLink] = useState(null);
  const [openSendModal, setOpenSendModal] = useState(false);

  useEffect(() => {
    if (portalInstance) {
      const fetchWalletBalance = async () => {
        try {
          const walletInfo = await portalInstance.getBalances();

          setWalletBalance(walletInfo[0].balance);
          setSmartContractAddress(walletInfo[0].contractAddress);
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

  const cardStyle = {
    backgroundColor: 'rgba(26, 32, 44, 0.8)', // Semi-transparent dark background        color: '#e2e8f0', // Light text for contrast
    color: '#e2e8f0',
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
    console.log(newAuthData);
    await setAuthData(newAuthData);
    handleMeshSuccess(newAuthData);
  };

  return (
    <div>
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h6" style={fieldStyle}>
            Wallet Address: {walletAddress}
          </Typography>
          <Typography variant="body2" style={fieldStyle}>
            Wallet Balance: $
            {walletBalance ? walletBalance : 'No balance data available'}
          </Typography>
          <Typography variant="body2" style={fieldStyle}>
            Smart Contract Address:{' '}
            {smartContractAddress
              ? smartContractAddress
              : 'No smart contract address data available'}
          </Typography>
          <Box display="flex" justifyContent="flex-end">
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
