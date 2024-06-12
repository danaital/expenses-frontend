import React, { useState } from 'react';
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
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (values: { username: string; password: string }) => {
        try {
            const response = await axios.post('localhost:3000/api/auth/login', values);
            // Handle successful login
        } catch (error) {
            // Handle login error
        }
    };

    const validationSchema = yup.object({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
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
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={(formik.touched.username && formik.errors.username) || ' '}
                />
                <div style={{ marginBottom: 10 }} />
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={(formik.touched.password && formik.errors.password) || ' '}
                />
                <div style={{ marginBottom: 10 }} />
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </LoginForm>
        </LoginPageContainer>
    );
};