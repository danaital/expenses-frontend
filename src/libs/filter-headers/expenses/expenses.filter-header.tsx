import React, { FC, useState, useEffect } from 'react';
import { TextField, Button, Tooltip } from '@mui/material';
import styled from 'styled-components';
import Select, { MultiValue, StylesConfig, components } from 'react-select';
import axios from 'axios';
import { ExpenseType } from '../../../shared/dtos/expense-type-dto';

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
    height: 56px;
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
    expenseTypes: { label: string; value: string }[];
  };
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onExpenseTypeChange: (selectedOptions: MultiValue<{ label: string; value: string }>) => void;
  onAddExpense: () => void;
}

const filterText = "Filter by:";
const titleLabelText = "Title";
const minAmountLabelText = "Min Amount";
const maxAmountLabelText = "Max Amount";
const startDateLabelText = "Start Date";
const endDateLabelText = "End Date";
const expenseTypeLabelText = "Expense Type";
const addExpenseButtonText = "Add New Expense";

const customStyles: StylesConfig<{ label: string; value: string }, true> = {
  control: (provided) => ({
    ...provided,
    height: '56px',
    maxHeight: '56px',
    backgroundColor: '#f0f0f0',
    width: '300px',
    maxWidth: '300px', // Add max-width
    overflowY: 'auto', // Add overflowY : todo fix position of X and expand collapse button to center
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '150px', // Add max-height
  }),
};

const MenuList = (props: any) => {
  return (
    <components.MenuList {...props}>
      {props.children}
    </components.MenuList>
  );
};

export const ExpensesFilterBar: FC<ExpensesFilterBarProps> = ({ filter, onFilterChange, onExpenseTypeChange, onAddExpense }) => {
  const [expenseTypeOptions, setExpenseTypeOptions] = useState<{ label: string; value: string }[]>([]);
  // TODO: add reccuring expenses
  // TODO: add payment method. description, date
  // TODO: add payment status
  // TODO: add expense status
  // TODO: add alerts for overdue expenses, build escalation matrix
  // TODO: add expense currency, exchange rate, amount in local currency, date of exchange rate
  // TODO: make page, fliter bard, drawer generic, add filter for all fields, add sorting, add pagination
  // TODO: make filter buttons to be added dynamically, and not show all the time 
  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        const response = await axios.get<ExpenseType[]>('http://localhost:3001/api/expenseTypes/getAll');
        const options = response.data.map((expenseType) => ({
          label: expenseType.name,
          value: expenseType.name,
        }));
        setExpenseTypeOptions(options);
      } catch (error) {
        console.error('Error fetching expense types:', error);
      }
    };

    fetchExpenseTypes();
  }, []);

  const selectedExpenseTypesTooltip = filter.expenseTypes.length !== 0 
    ? filter.expenseTypes.map(ele => ele.label).join(', ') 
    : "Select one or more expense types"; // TODO: Move to translation section

  // TODO: Use generic templates
  // TODO: Use <> in 165
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
        <Tooltip title={selectedExpenseTypesTooltip} arrow placement="top">
          <div>
            <Select
              isMulti
              options={expenseTypeOptions}
              value={filter.expenseTypes}
              onChange={onExpenseTypeChange}
              styles={customStyles}
              components={{ MenuList }}
              placeholder={expenseTypeLabelText}
            />
          </div>
        </Tooltip>
      </FilterField>
      <AddExpenseButton variant="contained" onClick={onAddExpense}>{addExpenseButtonText}</AddExpenseButton>   
    </FilterHeader>
  );
};
