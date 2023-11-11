import React, { createContext, useState, useEffect } from 'react';
import Portal from '@portal-hq/web'; // Adjust the import according to your SDK


const defaultState = {};

export const PortalContext = createContext(defaultState);

 const PortalProvider = ({ children }) => {
     const [portalInstance, setPortalInstance] = useState(null);
     const [isPortalReady, setIsPortalReady] = useState(false);
     const [portalError, setPortalError] = useState(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const portalClientKey = process.env.NEXT_PUBLIC_MESH_CLIENT_KEY;
      const gatewayConfig = process.env.NEXT_PUBLIC_PORTAL_GATEWAY_URL;

      const portal = new Portal({
        apiKey: portalClientKey,
        autoApprove: process.env.NODE_ENV === 'development',
        chainId: 5,
        gatewayConfig: gatewayConfig
      });
        
        console.log('Setting portal instance', portal);

        
        setPortalInstance(portal);

      portal.onReady(async () => {
        try {
          // Check if a wallet already exists

          if (!portal.address) {
              await portal.createWallet();
                        setIsPortalReady(true); // Update when the portal is ready

          }
            
            console.log('Portal is ready, calling onReady callback');
                      setIsPortalReady(true); // Update when the portal is ready

        } catch (error) {
          // Handle errors during onReady execution
         
            setPortalError(error);
            setIsPortalReady(true); // Update when the portal is ready
          
        }
      });
    }
  }, []);

    const state = {
        portalInstance,
        isPortalReady,
        portalError,
        
    };

 return (
  <PortalContext.Provider value={ state }>
    {children}
  </PortalContext.Provider>
);
};

export default PortalProvider;