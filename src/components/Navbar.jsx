import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


function NavBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Basic E-Commerce
          </Typography>
          <Typography onClick={props.connectWalletHandler} variant="h6" component="div" >
          {props.acc}
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
