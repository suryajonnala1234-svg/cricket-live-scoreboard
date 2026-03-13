import React from 'react';
import { useMatchContext } from '../context/MatchContext';

const Header = () => {
  const { status, team1, team2, resetMatch } = useMatchContext();

  return (
    <header className="header">
      <h1>CricScore Pro</h1>
      <p>Live Cricket Dashboard</p>
      {status !== 'setup' && (
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <button onClick={resetMatch} className="btn-danger primary-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Reset Match
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
