import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { VerticalNavBar } from '../../navbar/navigation-bar';
import { TextField } from '@mui/material';
import { ExpenseType } from '../../../../shared/dtos/expense-type-dto';
import { KanbanCard } from 'libs/common/cards/chart-card/report-card';

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

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 1fr)); 
    gap: 20px;
    max-height: 80vh;
    overflow-y: auto;
    padding-right: 10px;
`;

const headerText = "Reports Page";

// Mock data for demonstration
const reportData = [
  { title: "Total Expenses by Expense Type", content: "Pie Chart showing total expenses by expense type." },
  { title: "Monthly Expense Trends", content: "Line Chart showing monthly expense trends." },
  { title: "Top 10 Most Expensive Items", content: "Bar Chart showing top 10 most expensive items." },
  { title: "Expenses by User", content: "Stacked Bar Chart showing expenses by user." },
  { title: "Daily Expenses for a Specific Month", content: "Area Chart showing daily expenses for a specific month." },
  { title: "Yearly Comparison of Expenses", content: "Multi-line Chart showing yearly comparison of expenses." },
  { title: "Expense Distribution by Payment Recipient", content: "Horizontal Bar Chart showing expense distribution by payment recipient." },
  { title: "Average Expense Amount by Expense Type", content: "Box Plot showing average expense amount by expense type." },
  { title: "Monthly Budget vs. Actual Expenses", content: "Combo Chart showing monthly budget vs. actual expenses." },
  { title: "Expenses Over a Custom Date Range", content: "Scatter Plot showing expenses over a custom date range." },
  { title: "Frequency of Expense Types", content: "Histogram showing frequency of expense types." },
  { title: "User Expense Contribution", content: "Donut Chart showing user expense contribution." },
  { title: "Today's Expenses vs. Same Day Last Week", content: "Comparison of today's expenses vs. the same day last week." },
  { title: "This Week's Expenses vs. Same Week Last Month", content: "Comparison of this week's expenses vs. the same week last month." },
  { title: "This Month's Expenses vs. Same Month Last Year", content: "Comparison of this month's expenses vs. the same month last year." },
  { title: "Utility Expenses: Today's Expenses vs. Same Day Last Week", content: "Comparison of today's utility expenses vs. the same day last week." },
  { title: "Food Expenses: This Week's Expenses vs. Same Week Last Month", content: "Comparison of this week's food expenses vs. the same week last month." },
  { title: "Transportation Expenses: Today's Expenses vs. Same Day Last Week", content: "Comparison of today's transportation expenses vs. the same day last week." },
  { title: "Entertainment Expenses: This Week's Expenses vs. Same Week Last Month", content: "Comparison of this week's entertainment expenses vs. the same week last month." }
];

export const ReportsPage: FC = () => {
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
            <TextField
              label="Search Reports"
              variant="outlined"
              name="title"
              value={filter.title}
              onChange={handleFilterChange}
            />
          </FilterField>
        </FilterHeader>
        <CardGrid>
          {reportData.map((report, index) => (
            <KanbanCard key={index} title={report.title} content={report.content} />
          ))}
        </CardGrid>
      </Content>
    </Container>
  );
}
