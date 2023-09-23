import styled from '@emotion/styled';
import {
    Alert,
    Button,
    LinearProgress,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import { Paths } from 'constants/paths';
import {
    clearLoginError,
    getReceivedLoginError,
    getIsLoggingIn,
    getIsUserLoggedIn,
    loginUser,
} from 'features/auth/store/login';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const LoginPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues = { login: '', password: '' };
    const isLoggedIn = useSelector(getIsUserLoggedIn);
    const isLoading = useSelector(getIsLoggingIn);
    const loginError = useSelector(getReceivedLoginError);

    const validationSchema = yup.object({
        login: yup.string().email().required('Please enter your login'),
        password: yup.string().required('Please enter your password'),
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate(Paths.Home());
        }
    }, [isLoggedIn]);

    const handleFormSubmit = (values: { login: string; password: string }) => {
        dispatch(loginUser(values));
    };

    const handleMessageClose = () => {
        dispatch(clearLoginError());
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleFormSubmit,
    });

    return (
        <>
            {isLoading && <LinearProgress />}
            <InputContainer>
                <Typography>Login</Typography>

                <form onSubmit={formik.handleSubmit}>
                    <TextInput
                        fullWidth
                        id="login"
                        name="login"
                        label="Login"
                        type="text"
                        value={formik.values.login}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.login && Boolean(formik.errors.login)
                        }
                        helperText={formik.touched.login && formik.errors.login}
                        disabled={isLoading}
                    />
                    <TextInput
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                        disabled={isLoading}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                    >
                        Login
                    </Button>
                </form>

                <Snackbar
                    open={loginError}
                    autoHideDuration={3000}
                    onClose={handleMessageClose}
                >
                    <Alert severity="error" onClose={handleMessageClose}>
                        Invalid Login or Password
                    </Alert>
                </Snackbar>
            </InputContainer>
        </>
    );
};

const InputContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TextInput = styled(TextField)`
    margin: 10px 0;
`;

export default LoginPage;
