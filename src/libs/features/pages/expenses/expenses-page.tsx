import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { VerticalNavBar } from '../../navbar/navigation-bar';
import { IconButton, Tooltip  } from '@mui/material';
import { ArrowDownward as ArrowDownwardIcon, ArrowUpward as ArrowUpwardIcon, Edit as EditIcon } from '@mui/icons-material';
import { UnsavedChangesModal } from '../../../common/modals/unsaved-changes.modal';
import { ExpenseEditDrawer } from 'libs/forms/expenses-edit.drawer';
import { ExpensesFilterBar } from 'libs/filter-headers/expenses/expenses.filter-header';
import { Expense } from '../../../../shared/dtos/expense-dto';
import { ExpenseCard } from 'libs/common/cards/expense-card/expense-card';
//TODO: Mobile version
//TODO: Add tests to all components
//TODO: Add move to seperate files
//TODO: Add access token to API calls


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

const ExpensesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr)); 
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

// TODO: add translations to Text constants
const headerTitleText = "User Expenses";
const headerDescriptionText = "Manage your expenses effectively.";
const idText = "ID";
const dateText = "Date";
const paidToText = "Paid To";
const expenseTypeIdText = "Expense Type ID";
const amountText = "Amount";
const descriptionText = "Description";

const sortByIdAscText = "Sort by ID (Ascending)";
const sortByIdDescText = "Sort by ID (Descending)";


// TODO: add translations to error messages
const fetchExpensesErrorText = "There was an error fetching the expenses!";
const saveExpenseErrorText = "There was an error saving the expense!";


  // TODO: add translations to toast notifications  
const minAmountAlertText = "Min Amount should be less than or equal to Max Amount."; // TODO: Change to toast notification
const maxAmountAlertText = "Max Amount should be greater than or equal to Min Amount."; // TODO: Change to toast notification
const startDateAlertText = "Start Date should be before End Date."; // TODO: Change to toast notification
const endDateAlertText = "End Date should be after Start Date."; // TODO: Change to toast notification



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

  // move to a custom API
  useEffect(() => {
    axios.get<Expense[]>('http://localhost:3001/api/expenses/getAllByUser/1') // TODO: Change HardCoded value assuming userId 1 for the example, you might want to change this as per your needs + move to an atom and API call
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error(fetchExpensesErrorText, error);
      });
  }, []);

  // TODO: refactor to use a custom hook
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if ((name === 'minAmount' || name === 'maxAmount') && value !== '') {
      if (parseFloat(value) < 0) {
        return; // TODO: Add toast notification
      }
    }
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  const handleSortToggle = () => {
    setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  // TODO: refactor to use a custom hook, and multiple sort options
  // TODO: add option to clear filters
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  // TODO: refactor to use a custom hook
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

  // TODO: refactor to use a custom hook
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

  // TODO: refactor to use a custom hook
  const handleEditExpense = (expense: Expense) => {
    setIsEditMode(true);
    setSelectedExpense({ ...expense, expenseDate: new Date(expense.expenseDate) });
    setOriginalExpense({ ...expense, expenseDate: new Date(expense.expenseDate) });
    setDrawerOpen(true);
  };

  // TODO: refactor to use a custom hook
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

  // TODO: refactor to use a custom hook
  const handleCloseModal = () => {
    setUnsavedChangesModalOpen(false);
    setDrawerOpen(false);
    setSelectedExpense(null);
  };

  // TODO: refactor to use a custom hook
  const handleReturnToEditing = () => {
    setUnsavedChangesModalOpen(false);
  };
  // TODO: refactor to use a custom hook
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
      setSelectedExpense(null); // TODO: Add toast notification
    } catch (error) {
      console.error(saveExpenseErrorText, error); // TODO: Add toast notification
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
        <ExpensesFilterBar filter={filter} onFilterChange={handleFilterChange} onAddExpense={handleAddExpense}/>
        <ExpensesList>
          {filteredExpenses.map(expense => ( // TODO: move to a separate component, add delete button (modal), make header with horizontal line, make it 2X3 like grid with same height of every row 
            <ExpenseRow key={expense.id}>
              <ExpenseCard expense={expense} onEdit={handleEditExpense} />
            </ExpenseRow>
          ))}
        </ExpensesList>
        <ExpenseEditDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          selectedExpense={selectedExpense}
          isEditMode={isEditMode}
          onSave={handleSaveChanges}
        />
        <UnsavedChangesModal
          open={unsavedChangesModalOpen}
          unsavedChanges={unsavedChanges}
          onClose={handleCloseModal}
          onReturnToEditing={handleReturnToEditing}
        />
      </Content>
    </Container>
  );
};
