import React, { FC } from 'react';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';

const FilterHeader = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

const FilterField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; 
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

interface ExpensesFilterBarProps {
  filter: {
    title: string;
    minAmount: string;
    maxAmount: string;
    startDate: string;
    endDate: string;
    expenseTypeId: string;
  };
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAddExpense: () => void;
}
const filterText = "Filter by:";
const titleLabelText = "Title";
const minAmountLabelText = "Min Amount";
const maxAmountLabelText = "Max Amount";
const startDateLabelText = "Start Date";
const endDateLabelText = "End Date";
const expenseTypeIdLabelText = "Expense Type ID";
const addExpenseButtonText = "Add New Expense";

  // TODO: add translations to toast notifications  
const minAmountAlertText = "Min Amount should be less than or equal to Max Amount."; // TODO: Change to toast notification
const startDateAlertText = "Start Date should be less than or equal to End Date."; // TODO: Change to toast notification
export const ExpensesFilterBar: FC<ExpensesFilterBarProps> = ({ filter, onFilterChange, onAddExpense }) => {
  return (
    <FilterHeader>
      <FilterField>
        <label>{filterText}</label>
        <TextField
          label={titleLabelText}
          variant="outlined"
          name="title"
          value={filter.title}
          onChange={onFilterChange}
        />
        <TextField
          label={minAmountLabelText}
          variant="outlined"
          type="number"
          name="minAmount"
          value={filter.minAmount}
          onChange={onFilterChange}
        />
        <TextField
          label={maxAmountLabelText}
          variant="outlined"
          type="number"
          name="maxAmount"
          value={filter.maxAmount}
          onChange={onFilterChange}
        />
        <TextField
          label={startDateLabelText}
          variant="outlined"
          type="date"
          name="startDate"
          value={filter.startDate}
          onChange={onFilterChange}
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
          onChange={onFilterChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label={expenseTypeIdLabelText}
          variant="outlined"
          type="number"
          name="expenseTypeId" // TODO: make it the name of the expense type & colorize according to the type or change to icon for card
          value={filter.expenseTypeId}
          onChange={onFilterChange}
        />
      </FilterField>
      <AddExpenseButton variant="contained" onClick={onAddExpense}>{addExpenseButtonText}</AddExpenseButton>   
    </FilterHeader>
    
  );
};
