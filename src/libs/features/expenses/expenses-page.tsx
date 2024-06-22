import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { VerticalNavBar } from '../navbar/navigation-bar';
import { TextField, Button, Drawer, IconButton, Tooltip } from '@mui/material';
import { ArrowDownward as ArrowDownwardIcon, ArrowUpward as ArrowUpwardIcon, Edit as EditIcon } from '@mui/icons-material';

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
  max-height: 65vh; /* Adjusted height for scrolling */
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

const DrawerContent = styled.div`
  width: 300px;
  padding: 20px;
`;

// Text constants
const headerTitleText = "User Expenses";
const headerDescriptionText = "Manage your expenses effectively.";
const idText = "ID:";
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
const editExpenseText = "Edit Expense";
const saveChangesText = "Save Changes";
const sortByIdAscText = "Sort by ID (Ascending)";
const sortByIdDescText = "Sort by ID (Descending)";

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
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  const handleSortToggle = () => {
    setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
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
    // TODO: add Logic to add new expense 
    console.log('Add new expense button clicked');
  };

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedExpense(null);
  };

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedExpense) {
      const { name, value } = e.target;
      setSelectedExpense({
        ...selectedExpense,
        [name]: value,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (selectedExpense) {
      try {
        await axios.patch(`http://localhost:3001/api/expenses/update/${selectedExpense.id}`, selectedExpense);
        
        setExpenses(prevExpenses =>
          prevExpenses.map(expense => (expense.id === selectedExpense.id ? selectedExpense : expense))
        );

        setDrawerOpen(false);
        setSelectedExpense(null);
      } catch (error) {
        console.error('There was an error updating the expense!', error);
      }
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
              name="minAmount" // TODO: ensure value is a non negative number & smaller than maxAmount
              value={filter.minAmount}
              onChange={handleFilterChange}
            />
            <TextField
              label={maxAmountLabelText}
              variant="outlined"
              type="number"
              name="maxAmount" // TODO: ensure value bigger than minAmount (if minAmount is set make the value be minAmount + 1)
              value={filter.maxAmount}
              onChange={handleFilterChange}
            />
            <TextField
              label={startDateLabelText}
              variant="outlined"
              type="date"
              name="startDate" // TODO: ensure value is smaller than endDate, swtich to date picker
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
              name="endDate" // TODO: ensure value is smaller than endDate, swtich to date picker while keeping functionality
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
          {filteredExpenses.map(expense => ( // Change size of font of ID
            <ExpenseRow key={expense.id}>
              <ExpenseDetail>
                <h3>{expense.title}</h3>
                <p><strong>{idText}</strong> 
                  <IconButton onClick={() => handleEditExpense(expense)}>
                    {expense.id} 
                    <EditIcon fontSize="small" />
                  </IconButton>
                </p>
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
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}> 
          <DrawerContent>
            <h2>{editExpenseText}</h2>
            {selectedExpense && ( // TODO: Export this to a separate component, add validation via YUP
              <> 
                <TextField
                  label={titleLabelText}
                  variant="outlined"
                  name="title"
                  value={selectedExpense.title}
                  onChange={handleExpenseChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={amountText}
                  variant="outlined"
                  type="number"
                  name="amount"
                  value={selectedExpense.amount}
                  onChange={handleExpenseChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={descriptionText}
                  variant="outlined"
                  name="description"
                  value={selectedExpense.description}
                  onChange={handleExpenseChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={dateText}
                  variant="outlined"
                  type="date"
                  name="expenseDate"
                  value={(new Date(selectedExpense.expenseDate)).toISOString().split('T')[0]}
                  onChange={handleExpenseChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={paidToText}
                  variant="outlined"
                  name="paidTo"
                  value={selectedExpense.paidTo}
                  onChange={handleExpenseChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={expenseTypeIdText}
                  variant="outlined"
                  type="number"
                  name="expenseTypeId"
                  value={selectedExpense.expenseTypeId}
                  onChange={handleExpenseChange}
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSaveChanges} fullWidth>
                  {saveChangesText}
                </Button>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </Content>
    </Container>
  );
};
