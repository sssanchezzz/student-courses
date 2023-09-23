import styled from '@emotion/styled';
import { Alert, Snackbar, Typography } from '@mui/material';
import Loader from 'components/loader';
import { Paths } from 'utils/paths';
import LoginForm from 'features/login_form';
import {
    clearLoginError,
    getReceivedLoginError,
    getIsLoggingIn,
    getIsUserLoggedIn,
} from 'features/login_form/store/login';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsUserLoggedIn);
    const isLoading = useSelector(getIsLoggingIn);
    const loginError = useSelector(getReceivedLoginError);

    useEffect(() => {
        if (isLoggedIn) {
            navigate(Paths.Home());
        }
    }, [isLoggedIn]);

    const handleMessageClose = () => {
        dispatch(clearLoginError());
    };

    return (
        <>
            {isLoading && <Loader />}
            <Container>
                <Typography>Login</Typography>
                <LoginForm />
                <Snackbar
                    open={loginError}
                    autoHideDuration={3000}
                    onClose={handleMessageClose}
                >
                    <Alert severity="error" onClose={handleMessageClose}>
                        Invalid Login or Password
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
};

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default LoginPage;
