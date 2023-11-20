export const signPortalTransaction = async (amount, recipient) => {
  console.log('Sending', amount, 'to', recipient);
  await new Promise((resolve) => setTimeout(resolve, 5000));
};

export const buildTransaction = async (recipient, amount, from) => {
  const usdcSmallestUnitAmount = amount * 1e6; // Convert to USDC's smallest unit
  console.log(usdcSmallestUnitAmount, amount);
  console.log(from);
  // First, construct a transaction.
  const transaction = {
    to: recipient, // {string} The recipient address.
    from,
    value: '0x16345785D8A0000', // {?string} The value to be sent in Wei.
    data: '', // {?string} Data for the transaction (for contract interactions).
    // maxFeePerGas: undefined, // {?string} Maximum fee per gas.
    // maxPriorityFeePerGas: undefined, // {?string} Maximum priority fee per gas.
    // gas: undefined, // {?string} The gas limit.
    // gasPrice: undefined, // {?string} Gas price in Wei.
  };

  return transaction;
};
