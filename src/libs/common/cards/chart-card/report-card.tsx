import React, { FC } from 'react';
import styled from 'styled-components';

// Define the props for the KanbanCard component
interface KanbanCardProps {
  title: string;
  content: string;
}

// Define the styled components
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 250px;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  height: 30px;
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 8px 0;
`;

const Content = styled.p`
  margin: 0;
`;

// Define the KanbanCard component
export const KanbanCard: FC<KanbanCardProps> = ({ title, content }) => {
  // TODO: Fix name
  // TODO: Add capitalize
  return (
    <Card>
      <Title>{title}</Title>
      <Line />
      <Content>{content}</Content>
    </Card>
  );
};


