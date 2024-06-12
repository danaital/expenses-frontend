import React, { FC } from 'react';
import styled from 'styled-components';
import { VerticalNavBar } from '../navbar/navigation-bar';

const HomePageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f4f8; 
`;

const WelcomeMessage = styled.h2`
  margin-bottom: 20px;
`;

export const HomePage: FC = () => {
  const welcomeMessageText = "Welcome to the Expense Tracker App!";
  const startMessageText = "To get started, navigate through the options in the sidebar.";

  return (
    <HomePageContainer>
      <VerticalNavBar/>
      <ContentContainer>
        <WelcomeMessage>{welcomeMessageText}</WelcomeMessage>
        <p>{startMessageText}</p>
      </ContentContainer>
    </HomePageContainer>
  );
};