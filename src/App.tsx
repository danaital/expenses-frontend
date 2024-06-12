import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouterApp } from './controls/routers/router-app';

function App() {
  return (
    <Router>
      <RouterApp />
    </Router>
  );
}

export default App;