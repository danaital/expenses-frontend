import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../libs/features/login/login-page';
import { RegisterPage } from '../../libs/features/register/register-page';
import { HomePage } from '../../libs/features/home/home-page';
// import HomePage from '../pages/HomePage';
// Import other page components

export const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/expenses" element={<HomePage />} />
      <Route path="/expensesTypes" element={<HomePage />} />
      <Route path="/profile" element={<HomePage />} />
      <Route path="/reports" element={<HomePage />} />
    </Routes>
  );
}
