import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Button,
    Menu,
    MenuItem,
} from '@mui/material';
import React, { FC } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'constants/paths';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'features/auth/store/login';
import { logoutUser } from 'features/auth/store/logout';

const Nav: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLogoutClick = () => {
        dispatch(logoutUser());
        setAnchorEl(null);
    };

    const handleLogoClick = () => {
        navigate(Paths.Home);
    };

    // if (!user) {
    //     return null;
    // }

    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Button sx={{ color: 'white' }} onClick={handleLogoClick}>
                        Courses
                    </Button>
                    <MenuItemsContainer>
                        {user ? (
                            <>
                                <Button
                                    variant="outlined"
                                    id="basic-button"
                                    aria-controls={
                                        open ? 'basic-menu' : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    {user.name[0] + user.surname[0]}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleLogoutClick}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleLogoutClick}>
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
