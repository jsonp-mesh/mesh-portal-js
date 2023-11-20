import React, { useState, useContext } from 'react';
import { PortalContext } from '../context/PortalContext';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import { buildTransaction } from '../utils/portalUtils';

const SendModal = ({ open, onClose, onSuccess, onExit }) => {
  const { portalInstance } = useContext(PortalContext);

  const [amount, setAmount] = useState('1');
  const [recipient, setRecipient] = useState(
    '0xBc4174D1E09b59a108964d0417110591FD7a156c'
  );
  const [signing, setSigning] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState('');

  const handleSend = async () => {
    setSigning(true);
    console.log('Sending', amount, 'to', recipient);

    const transaction = await buildTransaction(recipient, amount);

    try {
      const signature = await portalInstance.simulateTransaction(transaction);
      //const signature = await portalInstance.ethSendTransaction(transaction);

      console.log('Transaction simulation results:', signature);

      // Check the signature object for errors
      if (signature.error) {
        console.error('Transaction Error:', signature.error);
        setTransactionMessage('Transaction Error: ' + signature.error.message);
      } else if (signature.requestError) {
        console.error('Request Error:', signature.requestError.message);
        setTransactionMessage(
          'Request Error: ' + signature.requestError.message
        );
      } else {
        console.log('Transaction Successful');
        setTransactionMessage('Transaction successful!');
      }
    } catch (error) {
      console.error('Transaction error:', error);
      if (error.requestError) {
        setTransactionMessage(
          'Transaction failed: ' + error.requestError.message
        );
      } else {
        setTransactionMessage('Transaction failed: An unknown error occurred');
      }
    }

    setSigning(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Send Funds</DialogTitle>
      <DialogContent>
        {signing ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
            <p>Signing your transaction...</p>
          </div>
        ) : (
          <>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              label="Recipient Address"
              fullWidth
              margin="normal"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            {transactionMessage && <p>{transactionMessage}</p>}
          </>
        )}
      </DialogContent>
      {!signing && (
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            Send
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default SendModal;
