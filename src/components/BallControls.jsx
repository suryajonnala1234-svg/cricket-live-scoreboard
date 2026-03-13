import React, { useState } from 'react';
import { useMatchContext } from '../context/MatchContext';

const BallControls = () => {
  const { 
    addBall, status, pendingBatter, pendingBowler, 
    addNewBatter, addNewBowler, startSecondInnings 
  } = useMatchContext();
  
  const [batterName, setBatterName] = useState('');
  const [bowlerName, setBowlerName] = useState('');
  
  const [strikerName, setStrikerName] = useState('');
  const [nonStrikerName, setNonStrikerName] = useState('');
  const [openingBowler, setOpeningBowler] = useState('');

  if (status === 'innings_break') {
    return (
      <div className="card">
        <h3 className="card-title">Start 2nd Innings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <label>Striker Name</label>
            <input type="text" placeholder="New Striker" value={strikerName} onChange={e => setStrikerName(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Non-Striker Name</label>
            <input type="text" placeholder="New Non-Striker" value={nonStrikerName} onChange={e => setNonStrikerName(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Opening Bowler</label>
            <input type="text" placeholder="Bowler Name" value={openingBowler} onChange={e => setOpeningBowler(e.target.value)} />
          </div>
          <button 
            className="primary-btn btn-success" 
            onClick={() => {
              if (strikerName && nonStrikerName && openingBowler) {
                startSecondInnings(strikerName, nonStrikerName, openingBowler);
              }
            }}
          >
            Start 2nd Innings
          </button>
        </div>
      </div>
    );
  }

  if (status !== 'playing') return null;

  if (pendingBatter) {
    return (
      <div className="card">
        <h3 className="card-title" style={{ color: 'var(--danger)' }}>Wicket! Next Batter</h3>
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <div className="input-group">
            <label>New Batter Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={batterName}
              onChange={(e) => setBatterName(e.target.value)}
            />
          </div>
          <button className="primary-btn btn-danger" onClick={() => {
             if(batterName) { addNewBatter(batterName); setBatterName(''); }
          }}>Confirm Batter</button>
        </div>
      </div>
    );
  }

  if (pendingBowler) {
    return (
      <div className="card">
        <h3 className="card-title" style={{ color: 'var(--warning)' }}>End of Over! Next Bowler</h3>
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <div className="input-group">
            <label>Next Bowler Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={bowlerName}
              onChange={(e) => setBowlerName(e.target.value)}
            />
          </div>
          <button className="primary-btn" style={{ background: 'var(--warning)', color: '#0f172a' }} onClick={() => {
             if(bowlerName) { addNewBowler(bowlerName); setBowlerName(''); }
          }}>Confirm Bowler</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="card-title">Ball Controls</h3>
      <div className="controls-grid">
        <button className="control-btn btn-run" onClick={() => addBall({ runs: 1 })}>
          1<small>Run</small>
        </button>
        <button className="control-btn btn-run" onClick={() => addBall({ runs: 2 })}>
          2<small>Runs</small>
        </button>
        <button className="control-btn btn-run" onClick={() => addBall({ runs: 3 })}>
          3<small>Runs</small>
        </button>
        <button className="control-btn btn-boundary" onClick={() => addBall({ runs: 4 })}>
          4<small>Fours</small>
        </button>
        <button className="control-btn btn-boundary" onClick={() => addBall({ runs: 6 })}>
          6<small>Sixes</small>
        </button>
        <button className="control-btn" onClick={() => addBall({ runs: 0, isDot: true })}>
          0<small>Dot Ball</small>
        </button>
        <button className="control-btn btn-wicket" onClick={() => addBall({ runs: 0, isWicket: true })}>
          W<small>Wicket</small>
        </button>
        <button className="control-btn btn-extra" onClick={() => addBall({ runs: 0, isWide: true })}>
          Wd<small>Wide</small>
        </button>
        <button className="control-btn btn-extra" onClick={() => addBall({ runs: 0, isNoBall: true })}>
          Nb<small>No Ball</small>
        </button>
      </div>
    </div>
  );
};

export default BallControls;
