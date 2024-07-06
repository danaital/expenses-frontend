import React, { useState, FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f4f8; 
`;

const RegisterForm = styled.form`
    background-color: #ffffff; 
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 400px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 4px;
`;

const FormField = styled(TextField)`
    width: 85%;
    margin-bottom: 20px;
`;

const LoginLink = styled.div`
    text-align: center;
    font-family: Arial, sans-serif;
    font-size: 14px;
    margin-top: 20px;
`;

export const RegisterPage: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // TODO: protection against entering url directly, block access to register page if user is already logged in
    // TODO: Add translations
    const registerTitle = "Expense Tracker Registration";
    const usernameLabel = "Username";
    const emailLabel = "Email";
    const firstNameLabel = "First Name";
    const lastNameLabel = "Last Name";
    const passwordLabel = "Password";
    const confirmPasswordLabel = "Confirm Password";
    const registerButtonLabel = "Register";
    const usernameRequiredError = "Username is required";
    const emailRequiredError = "Email is required";
    const emailInvalidError = "Invalid email address";
    const firstNameRequiredError = "First name is required";
    const lastNameRequiredError = "Last name is required";
    const passwordRequiredError = "Password is required";
    const middleNameLabel = "Middle Name";
    const confirmPasswordRequiredError = "Please confirm your password";
    const passwordMatchError = "Passwords must match";
    const registerError = "Registration failed. Please try again.";
    const registerSuccess = "Registration successful. You can now login.";
    const loginLinkLabel = "Already have an account? Login here";

    const handleSubmit = async (values: {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        middleName?: string;
        password: string;
    }) => {
        try {
            const response = await axios.post('http://localhost:3001/api/register/newuser', values);
            console.log(response);
            // TODO Handle successful registration via toast notification
            navigate('/login');
        } catch (error) {
            // TODO Handle registration error
            console.error(error);
        }
    };

    const validationSchema = yup.object({
        username: yup.string().required(usernameRequiredError),
        email: yup.string().email(emailInvalidError).required(emailRequiredError),
        firstName: yup.string().required(firstNameRequiredError),
        middleName: yup.string(),
        lastName: yup.string().required(lastNameRequiredError),
        password: yup.string().required(passwordRequiredError),
        confirmPassword: yup.string().oneOf([yup.ref('password'), undefined, ""], passwordMatchError),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            firstName: '',
            middleName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });
    // TODO: Add create reusable component for form fields
    // TODO: move colors to theme

    return (
        <RegisterPageContainer>
            <RegisterForm onSubmit={formik.handleSubmit}>
                <h2>{registerTitle}</h2>
                <FormField
                    id="username"
                    name="username"
                    label={usernameLabel + " *"}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={(formik.touched.username && formik.errors.username) || ' '}
                    fullWidth
                />
                <div style={{ marginBottom: 20 }} />
                <FormField
                    id="email"
                    name="email"
                    label={emailLabel + " *"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={(formik.touched.email && formik.errors.email) || ' '}
                    fullWidth
                />
                <div style={{ marginBottom: 20 }} />
                <FormField
                    id="firstName"
                    name="firstName"
                    label={firstNameLabel + " *"}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={(formik.touched.firstName && formik.errors.firstName) || ' '}
                    fullWidth
                />
                <div style={{ marginBottom: 20 }} />
                <FormField
                    id="middleName"
                    name="middleName"
                    label={middleNameLabel}
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                    error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                    helperText={(formik.touched.middleName && formik.errors.middleName) || ' '}
                    fullWidth
                />
                <div style={{ marginBottom: 20 }} />
                <FormField
                    id="lastName"
                    name="lastName"
                    label={lastNameLabel + " *"}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={(formik.touched.lastName && formik.errors.lastName) || ' '}
                    fullWidth
                />
                <div style={{ marginBottom: 20 }} />
                <FormField
                    id="password"
                    name="password"
                    label={passwordLabel + " *"}
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={(formik.touched.password && formik.errors.password) || ' '}
                    fullWidth
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
                <FormField
                    id="confirmPassword"
                    name="confirmPassword"
                    label={confirmPasswordLabel + " *"}
                    type= {showConfirmPassword ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={(formik.touched.confirmPassword && formik.errors.confirmPassword) || ' '}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle-confirm-password-visibility"
                                    onClick={toggleConfirmPasswordVisibility}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <div style={{ marginBottom: 20 }} />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {registerButtonLabel}
                </Button>
            </RegisterForm>
            <LoginLink>
                <Link to="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
                   {loginLinkLabel}
                </Link>
            </LoginLink>
        </RegisterPageContainer>
    );
};

