import React from 'react';
import Header from '../components/Header';
import MatchSetup from '../components/MatchSetup';
import ScoreBoard from '../components/ScoreBoard';
import BattingScoreCard from '../components/BattingScoreCard';
import BowlingScoreCard from '../components/BowlingScoreCard';
import BallControls from '../components/BallControls';
import MatchHighlights from '../components/MatchHighlights';
import { useMatchContext } from '../context/MatchContext';
import { Box } from '@mui/material';

const MatchPage = () => {
  const { status } = useMatchContext();

  return (
    <>
      {status === 'setup' ? (
        <MatchSetup />
      ) : (
        <div className="app-container">
          <Header />
          <div className="dashboard-grid">
            <div className="left-panel">
              <ScoreBoard />
              <BattingScoreCard />
              <BowlingScoreCard />
            </div>
            <div className="right-panel">
              {(status === 'playing' || status === 'innings_break') && <BallControls />}
              <MatchHighlights />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchPage;
