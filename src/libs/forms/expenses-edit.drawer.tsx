import React, { FC } from 'react';
import { Drawer, TextField, Button } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Expense } from '../../shared/dtos/expense-dto';

interface ExpenseEditDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedExpense: Expense | null;
  isEditMode: boolean;
  onSave: (values: Expense) => void;
}

const DrawerContent = styled.div`
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DrawerFooter = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid #ddd;
`;

const FormError = styled.div`
  color: red;
  margin-top: 5px;
`;

const titleRequiredText = "Title is required";
const amountRequiredText = "Amount is required";
const amountNonNegativeText = "Amount must be non-negative";
const dateRequiredText = "Date is required";
const expenseTypeIdRequiredText = "Expense Type ID is required";
const expenseTypeIdIntegerText = "Expense Type ID must be an integer";
const paidToRequiredText = "Paid to is required";
const editExpenseText = "Edit Expense";
const addExpenseText = "Add Expense";


const titleLabelText = "Title";
const amountText = "Amount";
const descriptionText = "Description";
const dateText = "Date";
const paidToText = "Paid To";
const expenseTypeIdText = "Expense Type ID";

const createText = "Create";
const cancelText = "Cancel";
const saveChangesText = "Save Changes";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(titleRequiredText),
  amount: Yup.number().required(amountRequiredText).min(0, amountNonNegativeText),
  description: Yup.string(),
  expenseDate: Yup.date().required(dateRequiredText),
  paidTo: Yup.string().required(paidToRequiredText),
  expenseTypeId: Yup.number().required(expenseTypeIdRequiredText).integer(expenseTypeIdIntegerText),
});

export const ExpenseEditDrawer: FC<ExpenseEditDrawerProps> = ({
  open,
  onClose,
  selectedExpense,
  isEditMode,
  onSave
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <DrawerContent>
        <h2>{isEditMode ? editExpenseText : addExpenseText}</h2>
        {selectedExpense && (
          <Formik
            initialValues={selectedExpense}
            validationSchema={validationSchema}
            onSubmit={onSave}
            enableReinitialize
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <TextField
                  label={titleLabelText + " *"}
                  variant="outlined"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="title" component={FormError} />
                <TextField
                  label={amountText + " *"}
                  variant="outlined"
                  type="number"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  inputProps={{ min: 0 }} 
                />
                <ErrorMessage name="amount" component={FormError} />
                <TextField
                  label={descriptionText}
                  variant="outlined"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="description" component={FormError} />
                <TextField
                  label={dateText + " *"}
                  variant="outlined"
                  type="date"
                  name="expenseDate"
                  value={new Date(values.expenseDate).toISOString().split('T')[0]}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="expenseDate" component={FormError} />
                <TextField
                  label={paidToText + " *"}
                  variant="outlined"
                  name="paidTo"
                  value={values.paidTo}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="paidTo" component={FormError} />
                <TextField
                  label={expenseTypeIdText + " *"}
                  variant="outlined"
                  type="number"
                  name="expenseTypeId"
                  value={values.expenseTypeId}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="expenseTypeId" component={FormError} />
                <DrawerFooter>
                  <Button variant="contained" color="primary" type="submit">
                    {isEditMode ? saveChangesText : createText}
                  </Button>
                  <Button variant="outlined" onClick={onClose}>
                    {cancelText}
                  </Button>
                </DrawerFooter>
              </Form>
            )}
          </Formik>
        )}
      </DrawerContent>
    </Drawer>
  );
};
