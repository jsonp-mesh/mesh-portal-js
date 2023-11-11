// In ParentComponent.js
import React, { useState, useContext } from 'react'; // Add useContext here
import { PortalContext } from '../context/PortalContext';
import WalletBalanceCard from '../components/WalletInfo'; // If it's a default export

export default function ParentComponent() {
  const { portalInstance, isPortalReady } = useContext(PortalContext);
  const [error, setError] = useState(null);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isPortalReady) {
    return <div>Loading portal...</div>;
  }

  return (
    <div>
      {isPortalReady && (
        <>
          <p>Portal is ready!</p>
         
          <WalletBalanceCard />
        </>
      )}
    </div>
  );
}
