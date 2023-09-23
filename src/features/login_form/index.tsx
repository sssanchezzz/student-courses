import { FC } from 'react';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { getIsLoggingIn, loginUser } from 'features/login_form/store/login';
import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

const LoginForm: FC = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoggingIn);

    const initialValues = { login: '', password: '' };

    const validationSchema = yup.object({
        login: yup.string().email().required('Please enter your login'),
        password: yup.string().required('Please enter your password'),
    });

    const handleFormSubmit = (values: { login: string; password: string }) => {
        dispatch(loginUser(values));
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleFormSubmit,
    });

    return (
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
                error={formik.touched.login && Boolean(formik.errors.login)}
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
                    formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                disabled={isLoading}
            />

            <Button variant="contained" type="submit" disabled={isLoading}>
                Login
            </Button>
        </form>
    );
};

const TextInput = styled(TextField)`
    margin: 10px 0;
`;

export default LoginForm;
