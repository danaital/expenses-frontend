import React, { useState, FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const LoginPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f4f8; 
`;

const LoginForm = styled.form`
    background-color: #ffffff; 
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 4px;
`;

export const LoginPage: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // TODO: Add translations
    const loginTitle = "Expense Tracker Login";
    const usernameLabel = "Username";
    const passwordLabel = "Password";
    const loginButtonLabel = "Login";
    const usernameRequiredError = "Username is required";
    const passwordRequiredError = "Password is required";
    
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (values: { username: string; password: string }) => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', values);
            // TODO Handle successful login
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
                />
                <div style={{ marginBottom: 20 }} />
                <TextField
                    id="password"
                    name="password"
                    label={passwordLabel}
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={(formik.touched.password && formik.errors.password) || ' '}
                />
                <div style={{ marginBottom: 20 }} />
                <Button type="submit" variant="contained" color="primary">
                    {loginButtonLabel}
                </Button>
            </LoginForm>
        </LoginPageContainer>
    );
};