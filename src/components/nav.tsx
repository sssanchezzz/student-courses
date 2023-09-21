import { AppBar, Box, Toolbar, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Nav: FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography>Courses App</Typography>
        <Box>
          <Typography>Courses</Typography>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
