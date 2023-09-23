import {
    AppBar,
    Box,
    Toolbar,
    Button,
    Menu,
    MenuItem,
    styled as styledMUI,
} from '@mui/material';
import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Paths } from 'utils/paths';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'features/login_form/store/login';
import { logoutUser } from 'features/nav/store';

const Nav: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleUserButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogoutClick = () => {
        dispatch(logoutUser());
        setAnchorEl(null);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    if (!user) {
        return null;
    }

    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Link to={Paths.Home()}>
                        <Button sx={{ color: 'white' }}>Courses</Button>
                    </Link>
                    <MenuItemsContainer>
                        {user && (
                            <>
                                <UserButton
                                    variant="outlined"
                                    id="user-button"
                                    aria-controls={
                                        open ? 'basic-menu' : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleUserButtonClick}
                                >
                                    {user.name[0] + user.surname[0]}
                                </UserButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleCloseMenu}
                                    MenuListProps={{
                                        'aria-labelledby': 'user-button',
                                    }}
                                >
                                    <MenuItem onClick={handleLogoutClick}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </MenuItemsContainer>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Box>
    );
};

const UserButton = styledMUI(Button)(({ theme }) => ({
    color: theme.palette.common.white,
}));

const MenuItemsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
`;

export default Nav;
