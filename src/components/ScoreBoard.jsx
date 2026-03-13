import React from 'react';
import { useMatchContext } from '../context/MatchContext';

const ScoreBoard = () => {
  const { battingTeamName, runs, wickets, balls, target, currentInnings, oversLimit } = useMatchContext();

  const overs = Math.floor(balls / 6);
  const currentBalls = balls % 6;

  return (
    <div className="card scoreboard-main">
      <div className="team-name">{battingTeamName}</div>
      <div className="score-display">
        <div className="main-score">
          {runs}/{wickets}
        </div>
        <div className="overs-display">
          ({overs}.{currentBalls} ov)
        </div>
      </div>
      
      {currentInnings === 2 && target && (
        <div className="target-info">
          Target: {target} runs in {oversLimit} overs
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
