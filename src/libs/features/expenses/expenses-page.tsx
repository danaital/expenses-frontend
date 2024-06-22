import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { VerticalNavBar } from '../navbar/navigation-bar';
import { TextField, Button } from '@mui/material';

interface Expense {
  id: number;
  userId: number;
  expenseTypeId: number;
  title: string;
  amount: number;
  description: string;
  expenseDate: Date;
  paidTo: string;
  metadata: Record<string, any>;
}

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Header = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const FilterHeader = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

const ExpensesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 80vh; /* Adjusted height for scrolling */
  overflow-y: auto;
  padding-right: 10px; /* Add some padding for better appearance with the scrollbar */
`;

const ExpenseRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ExpenseDetail = styled.div`
  flex: 1;
  margin: 0 10px;

  h3 {
    margin-top: 0;
  }
`;

const FilterField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Added space between inputs */
`;

const AddExpenseButton = styled(Button)`
  && {
    background-color: #007bff;
    color: #fff;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

// Text constants
const headerTitleText = "User Expenses";
const headerDescriptionText = "Manage your expenses effectively.";
const amountText = "Amount:";
const descriptionText = "Description:";
const dateText = "Date:";
const paidToText = "Paid To:";
const expenseTypeIdText = "Expense Type ID:";
const filterText = "Filter by:";
const addExpenseButtonText = "Add New Expense";
const titleLabelText = "Title";
const minAmountLabelText = "Min Amount";
const maxAmountLabelText = "Max Amount";
const startDateLabelText = "Start Date";
const endDateLabelText = "End Date";
const expenseTypeIdLabelText = "Expense Type ID";

export const ExpensesPage: FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState({
    title: '',
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
    expenseTypeId: '',
  });

  useEffect(() => {
    axios.get<Expense[]>('http://localhost:3001/api/expenses/getAllByUser/1')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the expenses!', error);
      });
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.expenseDate);
    const startDate = filter.startDate ? new Date(filter.startDate) : null;
    const endDate = filter.endDate ? new Date(filter.endDate) : null;

    return (
      (filter.title === '' || expense.title.toLowerCase().includes(filter.title.toLowerCase())) &&
      (filter.minAmount === '' || expense.amount >= parseFloat(filter.minAmount)) &&
      (filter.maxAmount === '' || expense.amount <= parseFloat(filter.maxAmount)) &&
      (startDate === null || expenseDate >= startDate) &&
      (endDate === null || expenseDate <= endDate) &&
      (filter.expenseTypeId === '' || expense.expenseTypeId === parseInt(filter.expenseTypeId))
    );
  });

  const handleAddExpense = () => {
    // Logic to add new expense
    console.log('Add new expense button clicked');
  };

  return (
    <Container>
      <VerticalNavBar />
      <Content>
        <Header>
          <h1>{headerTitleText}</h1>
          <p>{headerDescriptionText}</p>
        </Header>
        <FilterHeader>
          <FilterField>
            <label>{filterText}</label>
            <TextField
              label={titleLabelText}
              variant="outlined"
              name="title"
              value={filter.title}
              onChange={handleFilterChange}
            />
            <TextField
              label={minAmountLabelText}
              variant="outlined"
              type="number"
              name="minAmount"
              value={filter.minAmount}
              onChange={handleFilterChange}
            />
            <TextField
              label={maxAmountLabelText}
              variant="outlined"
              type="number"
              name="maxAmount"
              value={filter.maxAmount}
              onChange={handleFilterChange}
            />
            <TextField
              label={startDateLabelText}
              variant="outlined"
              type="date"
              name="startDate"
              value={filter.startDate}
              onChange={handleFilterChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label={endDateLabelText}
              variant="outlined"
              type="date"
              name="endDate"
              value={filter.endDate}
              onChange={handleFilterChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label={expenseTypeIdLabelText}
              variant="outlined"
              type="number"
              name="expenseTypeId"
              value={filter.expenseTypeId}
              onChange={handleFilterChange}
            />
          </FilterField>
          <AddExpenseButton variant="contained" onClick={handleAddExpense}>{addExpenseButtonText}</AddExpenseButton>
        </FilterHeader>
        <ExpensesList>
          {filteredExpenses.map(expense => (
            <ExpenseRow key={expense.id}>
              <ExpenseDetail>
                <h3>{expense.title}</h3>
                <p><strong>{amountText}</strong> ${(+expense.amount).toFixed(2)}</p>
              </ExpenseDetail>
              <ExpenseDetail>
                <p><strong>{descriptionText}</strong> {expense.description}</p>
                <p><strong>{dateText}</strong> {new Date(expense.expenseDate).toLocaleDateString()}</p>
              </ExpenseDetail>
              <ExpenseDetail>
                <p><strong>{paidToText}</strong> {expense.paidTo}</p>
                <p><strong>{expenseTypeIdText}</strong> {expense.expenseTypeId}</p>
              </ExpenseDetail>
            </ExpenseRow>
          ))}
        </ExpensesList>
      </Content>
    </Container>
  );
};
