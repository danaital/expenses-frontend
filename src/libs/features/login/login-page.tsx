import React, { useState, FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import { TextField, Button , IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { Link } from 'react-router-dom';

const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f4f8; 
`;

const LoginForm = styled.form`
    background-color: #ffffff; 
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 300px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 4px;
`;

const RegisterLink = styled.div`
    text-align: center;
    font-family: Arial, sans-serif;
    font-size: 14px;
`;

export const LoginPage: FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    // TODO: Add translations
    const loginTitle = "Expense Tracker Login";
    const usernameLabel = "Username";
    const passwordLabel = "Password";
    const loginButtonLabel = "Login";
    const usernameRequiredError = "Username is required";
    const passwordRequiredError = "Password is required";
    const loginError = "Invalid username or password";
    const loginSuccess = "Login successful";
    const registerLinkLabel = "Don't have an account? Register here";

    const handleSubmit = async (values: { username: string; password: string }) => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', values);
            console.log(response);
            // TODO Handle successful login via toast notification
            // TODO Redirect to home page
        } catch (error) {
            // TODO Handle login error
        }
    };

    const validationSchema = yup.object({
        username: yup.string().required(usernameRequiredError),
        password: yup.string().required(passwordRequiredError),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    // TODO: Add create reusable component for form fields
    return (
        <LoginPageContainer>
            <LoginForm onSubmit={formik.handleSubmit}>
                <h2 style={{ textAlign: 'center' }}>{loginTitle}</h2>
                <TextField
                    id="username"
                    name="username"
                    label={usernameLabel}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={(formik.touched.username && formik.errors.username) || ' '}
                    fullWidth
                    required
                    style={{ width: '85%' }}
                />
                <div style={{ marginBottom: 20 }} />
                <TextField
                    id="password"
                    name="password"
                    label={passwordLabel}
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={(formik.touched.password && formik.errors.password) || ' '}
                    fullWidth
                    required
                    style={{ width: '85%' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle-password-visibility"
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <div style={{ marginBottom: 20 }} />
                <Button type="submit" variant="contained" color="primary" style={{ width: "85%" }}>
                    {loginButtonLabel}
                </Button>
            </LoginForm>
            <RegisterLink>
                <Link to="/register" style={{ textDecoration: 'none', color: '007bff' }}>
                   {registerLinkLabel}
                </Link>
            </RegisterLink>
        </LoginPageContainer>
    );
};