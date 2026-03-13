import React from 'react';
import MatchPage from './pages/MatchPage';
import { MatchProvider } from './context/MatchContext';
import './index.css';

function App() {
  return (
    <MatchProvider>
      <MatchPage />
    </MatchProvider>
  );
}

export default App;
