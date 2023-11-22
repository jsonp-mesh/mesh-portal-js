import React, { useEffect, useContext } from 'react'; // Import useEffect here
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Select, MenuItem } from '@mui/material';
import { PortalContext } from '../context/PortalContext';

function Header() {
  const { initiatePortalInstance, chain, isPortalReady } =
    useContext(PortalContext);

  useEffect(() => {
    if (!isPortalReady) {
      initiatePortalInstance(5);
    }
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    initiatePortalInstance(event.target.value); // Convert string to number if necessary
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#333' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Portal-Mesh-Explorer
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <Select
            value={chain}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={1}>Chain 1</MenuItem>{' '}
            {/* Ensure these are numbers */}
            <MenuItem value={5}>Chain 5</MenuItem>
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
