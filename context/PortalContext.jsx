import React, { createContext, useState, useEffect } from 'react';
import Portal from '@portal-hq/web'; // Adjust the import according to your SDK
import PropTypes from 'prop-types';

const defaultState = {};

export const PortalContext = createContext(defaultState);

const PortalProvider = ({ children }) => {
  const [portalInstance, setPortalInstance] = useState(null);
  const [portalError, setPortalError] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isPortalReady, setIsPortalReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const portalClientKey = process.env.NEXT_PUBLIC_MESH_CLIENT_KEY;
      const gatewayConfig = process.env.NEXT_PUBLIC_PORTAL_GATEWAY_URL;

      const portal = new Portal({
        apiKey: portalClientKey,
        autoApprove: process.env.NODE_ENV === 'development',
        chainId: 5, // this can be changed
        gatewayConfig: gatewayConfig,
      });
      console.log('Setting portal instance', portal);

      setPortalInstance(portal);

      portal.onReady(async () => {
        try {
          if (!portal.address) {
            await portal.createWallet();
            setIsPortalReady(true);
          }

          console.log('Portal is ready, calling onReady callback');
          setWalletAddress(portal.address);
          setIsPortalReady(true);
        } catch (error) {
          console.error('Error during Portal onReady execution:', error);

          setPortalError(error);
        }
      });
    }
  }, []);

  const state = {
    portalInstance,
    isPortalReady,
    portalError,
    walletAddress,
  };

  return (
    <PortalContext.Provider value={state}>{children}</PortalContext.Provider>
  );
};

PortalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PortalProvider;
