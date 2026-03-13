import React from 'react';
import { useMatchContext } from '../context/MatchContext';

const BowlingScoreCard = () => {
  const { bowlers, currentBowlerIndex } = useMatchContext();

  const calculateEconomy = (runs, balls) => {
    if (balls === 0) return '0.00';
    const overs = (Math.floor(balls / 6) + (balls % 6) / 6);
    return (runs / overs).toFixed(2);
  };

  return (
    <div className="card table-container">
      <h3 className="card-title">Bowling Scorecard</h3>
      <table>
        <thead>
          <tr>
            <th>Bowler</th>
            <th>O</th>
            <th>R</th>
            <th>W</th>
            <th>Econ</th>
          </tr>
        </thead>
        <tbody>
          {bowlers.map((bowler, index) => {
            return (
              <tr key={index}>
                <td>
                  <span className={index === currentBowlerIndex ? 'striker' : ''}>
                    {bowler.name}
                  </span>
                </td>
                <td>{bowler.oversString}</td>
                <td>{bowler.runs}</td>
                <td>{bowler.wickets}</td>
                <td>{calculateEconomy(bowler.runs, bowler.balls)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BowlingScoreCard;
