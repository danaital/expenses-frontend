import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { VerticalNavBar } from '../navbar/navigation-bar';
import { TextField, Button, Drawer, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ArrowDownward as ArrowDownwardIcon, ArrowUpward as ArrowUpwardIcon, Edit as EditIcon } from '@mui/icons-material';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// TODO: Mobile version
//TODO: Add move to seperate file
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
  max-height: 65vh; 
  overflow-y: auto;
  padding-right: 10px; 
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

// TODO: add translations to Text constants
const headerTitleText = "User Expenses";
const headerDescriptionText = "Manage your expenses effectively.";
const idText = "ID";
const amountText = "Amount";
const descriptionText = "Description";
const dateText = "Date";
const paidToText = "Paid To";
const expenseTypeIdText = "Expense Type ID";
const filterText = "Filter by:";
const addExpenseButtonText = "Add New Expense";
const titleLabelText = "Title";
const minAmountLabelText = "Min Amount";
const maxAmountLabelText = "Max Amount";
const startDateLabelText = "Start Date";
const endDateLabelText = "End Date";
const expenseTypeIdLabelText = "Expense Type ID";
const editExpenseText = "Edit Expense";
const createExpenseText = "Add Expense";
const saveChangesText = "Save Changes";
const createText = "Create";
const cancelText = "Cancel";
const sortByIdAscText = "Sort by ID (Ascending)";
const sortByIdDescText = "Sort by ID (Descending)";
const unsavedChangesTitleText = "Unsaved Changes";
const unsavedChangesMessageText = "You have unsaved changes. Number of unsaved changes: ";
const closeText = "Close";
const returnToEditingText = "Return to Editing";

// TODO: add translations to Validation error messages
const titleRequiredText = "Title is required";
const amountRequiredText = "Amount is required";
const amountNonNegativeText = "Amount must be non-negative";
const dateRequiredText = "Date is required";
const expenseTypeIdRequiredText = "Expense Type ID is required";
const expenseTypeIdIntegerText = "Expense Type ID must be an integer";
const paidToRequiredText = "Paid to is required";


// TODO: add translations to toast notifications
const minAmountAlertText = "Min Amount should be less than or equal to Max Amount."; // TODO: Change to toast notification
const startDateAlertText = "Start Date should be less than or equal to End Date."; // TODO: Change to toast notification

// TODO: add translations to error messages
const fetchExpensesErrorText = "There was an error fetching the expenses!";
const saveExpenseErrorText = "There was an error saving the expense!";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(titleRequiredText),
  amount: Yup.number().required(amountRequiredText).min(0, amountNonNegativeText),
  description: Yup.string(),
  expenseDate: Yup.date().required(dateRequiredText),
  paidTo: Yup.string().required(paidToRequiredText),
  expenseTypeId: Yup.number().required(expenseTypeIdRequiredText).integer(expenseTypeIdIntegerText),
});
// TODO: SAME AS LOGIN VALIDATION (VISUAL PART)
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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [originalExpense, setOriginalExpense] = useState<Expense | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(0);
  const [unsavedChangesModalOpen, setUnsavedChangesModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios.get<Expense[]>('http://localhost:3001/api/expenses/getAllByUser/1') // TODO: Change HardCoded value assuming userId 1 for the example, you might want to change this as per your needs + move to an atom and API call
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error(fetchExpensesErrorText, error);
      });
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if ((name === 'minAmount' || name === 'maxAmount') && value !== '') {
      if (parseFloat(value) < 0) {
        return; 
      }
    }

    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  const handleSortToggle = () => {
    setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const validateFilters = () => {
    const { minAmount, maxAmount, startDate, endDate } = filter;

    if (minAmount !== '' && maxAmount !== '' && parseFloat(minAmount) > parseFloat(maxAmount)) {
      alert(minAmountAlertText);
      return false;
    }

    if (startDate !== '' && endDate !== '' && new Date(startDate) > new Date(endDate)) {
      alert(startDateAlertText);
      return false;
    }

    return true;
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  const filteredExpenses = sortedExpenses.filter(expense => {
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
    setIsEditMode(false);
    setSelectedExpense({
      id: 0,
      userId: 1, // TODO: Change HardCoded value assuming userId 1 for the example, you might want to change this as per your needs
      expenseTypeId: 0,
      title: '',
      amount: 0,
      description: '',
      expenseDate: new Date(),
      paidTo: '',
      metadata: {},
    });
    setDrawerOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setIsEditMode(true);
    setSelectedExpense({ ...expense, expenseDate: new Date(expense.expenseDate) });
    setOriginalExpense({ ...expense, expenseDate: new Date(expense.expenseDate) });
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    if (selectedExpense && originalExpense) {
        const changes = Object.keys(selectedExpense).reduce((acc, key: string) => {
            if (selectedExpense[key as keyof Expense] !== originalExpense[key as keyof Expense]) {
                return acc + 1;
            }
            return acc;
        }, 0);
        if (changes > 0) {
            setUnsavedChanges(changes);
            setUnsavedChangesModalOpen(true);
            return;
        }
    }
    setDrawerOpen(false);
    setSelectedExpense(null);
  };

  const handleCloseModal = () => {
    setUnsavedChangesModalOpen(false);
    setDrawerOpen(false);
    setSelectedExpense(null);
  };

  const handleReturnToEditing = () => {
    setUnsavedChangesModalOpen(false);
  };

  const handleSaveChanges = async (values: Expense) => {
    try {
      if (isEditMode) {
        await axios.patch(`http://localhost:3001/api/expenses/update/${selectedExpense?.id}`, values); // TODO: Change HardCoded value assuming userId 1 for the example, you might want to change this as per your needs
        setExpenses(prevExpenses => prevExpenses.map(expense => (expense.id === values.id ? values : expense)));
      } else {
        const response = await axios.post('http://localhost:3001/api/expenses/create', values); // TODO: Change HardCoded value assuming userId 1 for the example, you might want to change this as per your needs
        setExpenses(prevExpenses => [...prevExpenses, response.data]);
      }
      setDrawerOpen(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error(saveExpenseErrorText, error);
    }
  };

  return (
    <Container>
      <VerticalNavBar />
      <Content>
        <Header>
          <h1>{headerTitleText}</h1>
          <p>{headerDescriptionText}</p>
          <Tooltip title={sortOrder === 'asc' ? sortByIdAscText : sortByIdDescText}>
            <IconButton onClick={handleSortToggle}>
              {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            </IconButton>
          </Tooltip>
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
              name="expenseTypeId" // TODO: make it the name of the expense type & colorize according to the type
              value={filter.expenseTypeId}
              onChange={handleFilterChange}
            />
            {/* TODO: Add filter adding button + react-select menu? + paidTo Filter */}
          </FilterField>
          <AddExpenseButton variant="contained" onClick={handleAddExpense}>{addExpenseButtonText}</AddExpenseButton>
        </FilterHeader>
        <ExpensesList>
          {filteredExpenses.map(expense => ( // TODO: move to a separate component, add delete button (modal), make header with horizontal line, make it 2X3 like grid with same height of every row 
            <ExpenseRow key={expense.id}>
              <ExpenseDetail>
                <h3>{expense.title}
                <IconButton onClick={() => handleEditExpense(expense)}>
                    <EditIcon style={{fontSize: "14px"}} />
                  </IconButton>
                </h3>
                <p><strong>{idText+":"}</strong>{expense.id}</p>
                <p><strong>{amountText+":"}</strong> ${(+expense.amount).toFixed(2)}</p>
              </ExpenseDetail>
              <ExpenseDetail>
                <p><strong>{descriptionText+":"}</strong> {expense.description}</p>
                <p><strong>{dateText+":"}</strong> {new Date(expense.expenseDate).toLocaleDateString()}</p>
              </ExpenseDetail>
              <ExpenseDetail>
                <p><strong>{paidToText+":"}</strong> {expense.paidTo}</p>
                <p><strong>{expenseTypeIdText+":"}</strong> {expense.expenseTypeId}</p>
              </ExpenseDetail>
            </ExpenseRow>
          ))}
        </ExpensesList>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <DrawerContent>
            <h2>{isEditMode ? editExpenseText : createExpenseText}</h2>
            {selectedExpense && (// TODO: Export this to a separate component
              <Formik
                initialValues={selectedExpense}
                validationSchema={validationSchema}
                onSubmit={handleSaveChanges}
                enableReinitialize
              >
                {({ values, handleChange, handleSubmit, setFieldValue }) => (
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
                      <Button variant="outlined" onClick={handleDrawerClose}>
                        {cancelText}
                      </Button>
                    </DrawerFooter>
                  </Form>
                )}
              </Formik>
            )}
          </DrawerContent>
        </Drawer>
        <Dialog open={unsavedChangesModalOpen} onClose={() => setUnsavedChangesModalOpen(false)}> 
          <DialogTitle>{unsavedChangesTitleText}</DialogTitle>
          <DialogContent>
            {unsavedChangesMessageText} {unsavedChanges} {/* TODO: Move Dialog to seperate component */} 
          </DialogContent>
          <DialogActions>
          <Button onClick={handleCloseModal} style={{ backgroundColor: '#ff0000', color: '#fff' }}>
              {closeText}
            </Button>
            <Button onClick={handleReturnToEditing} style={{ backgroundColor: '#007bff', color: '#fff' }}>
              {returnToEditingText}
            </Button>
          </DialogActions>
        </Dialog>
      </Content>
    </Container>
  );
};
