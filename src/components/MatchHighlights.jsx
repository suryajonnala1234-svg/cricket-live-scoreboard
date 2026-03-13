import React from 'react';
import { useMatchContext } from '../context/MatchContext';

const MatchHighlights = () => {
  const { runs, balls, target, oversLimit, currentInnings, lastBalls, matchSummary, status } = useMatchContext();

  const calculateCRR = () => {
    if (balls === 0) return '0.00';
    const overs = (Math.floor(balls / 6) + (balls % 6) / 6);
    return (runs / overs).toFixed(2);
  };

  const calculateRRR = () => {
    if (currentInnings !== 2 || !target) return null;
    const runsNeeded = target - runs;
    const ballsRemaining = (oversLimit * 6) - balls;
    if (ballsRemaining <= 0) return '0.00';
    const oversRemaining = (Math.floor(ballsRemaining / 6) + (ballsRemaining % 6) / 6);
    return (runsNeeded / oversRemaining).toFixed(2);
  };

  return (
    <div className="card">
      <h3 className="card-title">Match Highlights</h3>
      
      {matchSummary && status !== 'playing' && (
        <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary-accent)', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: '600', fontSize: '1.2rem', textAlign: 'center' }}>
          {matchSummary}
        </div>
      )}

      <div className="highlights-container">
        <div className="stat-box">
          <div className="stat-label">Current Run Rate (CRR)</div>
          <div className="stat-value">{calculateCRR()}</div>
        </div>
        
        {currentInnings === 2 && target && (
          <div className="stat-box">
            <div className="stat-label">Required Run Rate (RRR)</div>
            <div className="stat-value">{calculateRRR()}</div>
          </div>
        )}

        <div className="stat-box" style={{ gridColumn: '1 / -1' }}>
          <div className="stat-label">Last 6 Balls</div>
          <div className="last-balls">
            {lastBalls.length === 0 ? (
              <span style={{ color: 'var(--text-muted)' }}>No balls bowled yet</span>
            ) : (
              lastBalls.map((ball, index) => (
                <div key={index} className={`ball-circle ball-${ball}`}>
                  {ball}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchHighlights;
