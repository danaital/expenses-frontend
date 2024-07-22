import React, { FC } from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { Expense } from '../../../../shared/dtos/expense-dto';
interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
}

const dateText = "Date";
const paidToText = "Paid To";
const expenseTypeIdText = "Expense Type";
const idText = "ID";
const amountText = "Amount";
const descriptionText = "Description";

const ExpenseCardHeader = styled.h3`
  border-bottom: 1px dashed;
  padding-bottom: 5px;
  margin-top: 0;
  width: 100%;
`;

const ExpenseCardContainer = styled.div`
  width: 100%;
`;
// TODO: add translations to Text constants
// TODO: Maybe add image to the card

export const ExpenseCard: FC<ExpenseCardProps> = ({ expense, onEdit }) => {
  return (
    <ExpenseCardContainer>
      <ExpenseCardHeader>
        {expense.title}
        <IconButton onClick={() => onEdit(expense)}>
          <EditIcon style={{ fontSize: '14px' }} />
        </IconButton>
      </ExpenseCardHeader>
      <p><strong>{idText+":"}</strong> {expense.id}</p>
      <p><strong>{amountText+":"}</strong> ${(+expense.amount).toFixed(2)}</p>
      <p><strong>{dateText+":"}</strong> {new Date(expense.expenseDate).toLocaleDateString()}</p>
      <p><strong>{paidToText+":"}</strong> {expense.paidTo}</p>
      <p><strong>{descriptionText+":"}</strong> {expense.description}</p>
      <p><strong>{expenseTypeIdText+":"}</strong> {expense.expenseType?.name}</p>
    </ExpenseCardContainer>
  );
};
