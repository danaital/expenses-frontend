import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../libs/features/pages/login/login-page';
import { RegisterPage } from '../../libs/features/pages/register/register-page';
import { HomePage } from '../../libs/features/pages/home/home-page';
import { ExpensesPage } from '../../libs/features/pages/expenses/expenses-page';
import { ExpenseTypesPage } from '../../libs/features/pages/expense-types/expense-types-page';
import { ReportsPage } from '../../libs/features/pages/reports/reports-page';
// import HomePage from '../pages/HomePage';
// Import other page components

export const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/expenses" element={<ExpensesPage/>} />
      <Route path="/expensesTypes" element={<ExpenseTypesPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/profile" element={<HomePage />} />
    </Routes>
  );
}
