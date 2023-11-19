export const signPortalTransaction = async (amount, recipient) => {
  console.log('Sending', amount, 'to', recipient);
  await new Promise((resolve) => setTimeout(resolve, 5000));
};

export const handleSimulateTransaction = async (recipient, amount) => {
  const usdcSmallestUnitAmount = amount * 1e6; // Convert to USDC's smallest unit
  console.log(usdcSmallestUnitAmount, amount);

  // First, construct a transaction.
  const transaction = {
    to: recipient, // {string} The recipient address.
    value: '0x10DE4A2A', // {?string} The value to be sent in Wei.
    data: undefined, // {?string} Data for the transaction (for contract interactions).
    maxFeePerGas: undefined, // {?string} Maximum fee per gas.
    maxPriorityFeePerGas: undefined, // {?string} Maximum priority fee per gas.
    gas: undefined, // {?string} The gas limit.
    gasPrice: undefined, // {?string} Gas price in Wei.
  };

  return transaction;
};