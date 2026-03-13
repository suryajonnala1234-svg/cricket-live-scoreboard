import React from 'react';
import { useMatchContext } from '../context/MatchContext';

const BattingScoreCard = () => {
  const { batters, currentStrikerIndex, currentNonStrikerIndex } = useMatchContext();

  const calculateStrikeRate = (runs, balls) => {
    if (balls === 0) return '0.00';
    return ((runs / balls) * 100).toFixed(2);
  };

  return (
    <div className="card table-container">
      <h3 className="card-title">Batting Scorecard</h3>
      <table>
        <thead>
          <tr>
            <th>Batter</th>
            <th>R</th>
            <th>B</th>
            <th>4s</th>
            <th>6s</th>
            <th>SR</th>
          </tr>
        </thead>
        <tbody>
          {batters.filter(b => b.balls > 0 || b.isOut || batters.indexOf(b) === currentStrikerIndex || batters.indexOf(b) === currentNonStrikerIndex).map((batter, index) => {
            const originalIndex = batters.indexOf(batter);
            const isStriker = originalIndex === currentStrikerIndex;
            const isNonStriker = originalIndex === currentNonStrikerIndex;
            
            let statusClass = '';
            if (isStriker) statusClass = 'striker';
            else if (batter.isOut) statusClass = 'out';
            
            return (
              <tr key={originalIndex}>
                <td>
                  <span className={statusClass}>
                    {batter.name} {isNonStriker && !isStriker ? '(nb)' : ''}
                    {batter.isOut ? ' (out)' : ''}
                  </span>
                </td>
                <td>{batter.runs}</td>
                <td>{batter.balls}</td>
                <td>{batter.fours}</td>
                <td>{batter.sixes}</td>
                <td>{calculateStrikeRate(batter.runs, batter.balls)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BattingScoreCard;
