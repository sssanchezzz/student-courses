import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem,
} from '@mui/material';
import React, { FC } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';

const Nav: FC = () => {
    const title = 'Courses';
    const userName = localStorage.getItem('user');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Typography variant="h5">{title.toUpperCase()}</Typography>
                    <MenuItemsContainer>
                        {userName ? (
                            <>
                                <Button
                                    sx={{ color: 'white' }}
                                    variant="outlined"
                                    id="basic-button"
                                    aria-controls={
                                        open ? 'basic-menu' : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    {userName[0] + userName[1]}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <IconButton>
                                <AccountCircleIcon />
                            </IconButton>
                        )}
                    </MenuItemsContainer>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Box>
    );
};

const MenuItemsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
`;

export default Nav;
