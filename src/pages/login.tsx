import styled from '@emotion/styled';
import { Button, LinearProgress, TextField, Typography } from '@mui/material';
import { Paths } from 'constants/paths';
import { FormikHelpers, useFormik } from 'formik';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const LoginPage: FC = () => {
    const navigate = useNavigate();

    const initialValues = { login: '', password: '' };

    const validationSchema = yup.object({
        login: yup.string().email().required('Please enter your login'),
        password: yup.string().required('Please enter your password'),
    });

    const handleFormSubmit = (
        values: {
            login: string;
            password: string;
        },
        formikHelpers: FormikHelpers<{
            login: string;
            password: string;
        }>
    ) => {
        localStorage.setItem('user', values.login);
        setTimeout(() => {
            navigate(Paths.Home);
        }, 1000);
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleFormSubmit,
    });

    return (
        <>
            {formik.isSubmitting && <LinearProgress />}

            <InputContainer>
                <Typography>Login</Typography>

                <Form onSubmit={formik.handleSubmit}>
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
                        disabled={formik.isSubmitting}
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
                        disabled={formik.isSubmitting}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={formik.isSubmitting}
                    >
                        Login
                    </Button>
                </Form>
            </InputContainer>
        </>
    );
};

const InputContainer = styled.div`
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Form = styled.form``;

const TextInput = styled(TextField)`
    margin: 10px 0;
`;

export default LoginPage;
