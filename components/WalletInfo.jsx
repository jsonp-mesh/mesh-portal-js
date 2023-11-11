import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { PortalContext } from '../context/PortalContext';
import MeshModal from './MeshModal';
import { handleOpenMeshModal, handleExit } from '../utils/meshUtils';

export default function WalletBalanceCard() {
    const { portalInstance, walletAddress } = useContext(PortalContext);
    const [walletBalance, setWalletBalance] = useState(null);
    const [smartContractAddress, setSmartContractAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openMeshModal, setOpenMeshModal] = useState(false);
    const [catalogLink, setCatalogLink] = useState(null);

    

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
        color: '#e2e8f0', // Light text for contrast
        border: '1px solid #2d3748', // Subtle border
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Shadow for depth
    };

    const buttonStyle = {
        marginTop: '20px', // Spacing from the last text element
        backgroundColor: '#F6B94C', // A strong color for the button
        '&:hover': {
            backgroundColor: '#388e3c', // Darken on hover
        },
    };

    
    
    return (
        <div>
        <Card style={cardStyle}>
            <CardContent>
                <Typography variant="h6">Wallet Address: {walletAddress}</Typography>
                <Typography variant="body2">
                    Wallet Balance: ${walletBalance ? walletBalance : 'No balance data available'}
                </Typography>
                <Typography variant="body2">
                    Smart Contract Address: {smartContractAddress ? smartContractAddress : 'No smart contract address data available'}
                </Typography>
                <Box display="flex" justifyContent="flex-end">
                    <Button 
                        style={buttonStyle}
                        variant="contained" 
                        color="primary" 
                         onClick={() => handleOpenMeshModal(setCatalogLink, setOpenMeshModal)}
                    >
                        Deposit
                    </Button>
                </Box>
            </CardContent>
        </Card>
        {openMeshModal && (
        <MeshModal
          open="true"
          onClose={() => setOpenMeshModal(false)}
          link={catalogLink}
          //onSuccess={handleSuccess}
          onExit={handleExit}
          //transferFinished={handleTransferFinished}
        />
            )}
            </div>

    );
}
