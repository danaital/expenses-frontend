import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { VerticalNavBar } from '../../navbar/navigation-bar';
import { TextField } from '@mui/material';
import { ExpenseType } from '../../../../shared/dtos/expense-type-dto';

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f5f5f5;
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
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

const FilterField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const headerText = "Expense Types Page";

export const ExpenseTypesPage: FC = () => {
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [filter, setFilter] = useState({ title: '' });

  useEffect(() => {
    axios.get<ExpenseType[]>('http://localhost:3001/api/expenseTypes/getAll')
      .then(response => {
        setExpenseTypes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the expense types!', error);
      });
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const filteredExpenseTypes = expenseTypes.filter(expenseType =>
    expenseType.name.toLowerCase().includes(filter.title.toLowerCase())
  );

  return (
    <Container>
      <VerticalNavBar />
      <Content>
        <Header>
          <h1>{headerText}</h1>
        </Header>
        <FilterHeader>
          <FilterField>
            <label>Title</label>
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={filter.title}
              onChange={handleFilterChange}
            />
          </FilterField>
        </FilterHeader>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Title</TableHeader>
                <TableHeader>Description</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredExpenseTypes.map(expenseType => (
                <tr key={expenseType.id}>
                  <TableData>{expenseType.id}</TableData>
                  <TableData>{expenseType.name}</TableData>
                  <TableData>{expenseType.description}</TableData>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Content>
    </Container>
  );
}
