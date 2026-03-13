import React, { createContext, useContext, useState, useEffect } from 'react';

const MatchContext = createContext();

export const useMatchContext = () => useContext(MatchContext);

export const MatchProvider = ({ children }) => {
  const [matchData, setMatchData] = useState(() => {
    const saved = localStorage.getItem('cricketMatchState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse match state', e);
      }
    }
    return {
      status: 'setup',
      team1: '',
      team2: '',
      oversLimit: 20,
      currentInnings: 1,
      target: null,
      battingTeamName: '',
      bowlingTeamName: '',
      runs: 0,
      wickets: 0,
      balls: 0,
      extras: 0,
      batters: [],
      bowlers: [],
      currentStrikerIndex: 0,
      currentNonStrikerIndex: 1,
      currentBowlerIndex: 0,
      lastBalls: [],
      matchSummary: '',
      pendingBatter: false,
      pendingBowler: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('cricketMatchState', JSON.stringify(matchData));
  }, [matchData]);

  const startMatch = (t1, t2, overs, strikerName, nonStrikerName, bowlerName) => {
    setMatchData({
      status: 'playing', team1: t1, team2: t2, oversLimit: overs,
      currentInnings: 1, target: null, battingTeamName: t1, bowlingTeamName: t2,
      runs: 0, wickets: 0, balls: 0, extras: 0,
      batters: [
        { name: strikerName, runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false },
        { name: nonStrikerName, runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false }
      ],
      bowlers: [{ name: bowlerName, balls: 0, runs: 0, wickets: 0, oversString: '0.0' }],
      currentStrikerIndex: 0, currentNonStrikerIndex: 1, currentBowlerIndex: 0,
      lastBalls: [], matchSummary: `${t1} elected to bat.`,
      pendingBatter: false, pendingBowler: false,
    });
  };

  const startSecondInnings = (strikerName, nonStrikerName, bowlerName) => {
    setMatchData(prev => ({
      ...prev, status: 'playing', currentInnings: 2, target: prev.runs + 1,
      battingTeamName: prev.team2, bowlingTeamName: prev.team1,
      runs: 0, wickets: 0, balls: 0, extras: 0,
      batters: [
        { name: strikerName, runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false },
        { name: nonStrikerName, runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false }
      ],
      bowlers: [{ name: bowlerName, balls: 0, runs: 0, wickets: 0, oversString: '0.0' }],
      currentStrikerIndex: 0, currentNonStrikerIndex: 1, currentBowlerIndex: 0,
      lastBalls: [], matchSummary: `Target: ${prev.runs + 1} runs in ${prev.oversLimit} overs.`,
      pendingBatter: false, pendingBowler: false,
    }));
  };

  const handleEndInnings = (state) => {
    if (state.currentInnings === 1) {
       return { ...state, status: 'innings_break', matchSummary: `Innings break. Target: ${state.runs + 1}` };
    }
    let res = state.runs >= state.target ? `${state.team2} won by ${10 - state.wickets} wkts!` :
              state.runs === state.target - 1 ? 'Match tied!' : `${state.team1} won by ${state.target - state.runs - 1} runs!`;
    return { ...state, status: 'finished', matchSummary: res };
  };

  const addBall = ({ runs, isWicket, isWide, isNoBall, isDot }) => {
    if (matchData.status !== 'playing' || matchData.pendingBatter || matchData.pendingBowler) return;

    setMatchData(prev => {
      const isExtra = isWide || isNoBall;
      const totalRuns = runs + (isExtra ? 1 : 0);
      
      const newBatters = [...prev.batters];
      const striker = { ...newBatters[prev.currentStrikerIndex] };
      if (!isWide) {
        striker.runs += runs;
        if (!isNoBall) striker.balls += 1;
        if (runs === 4) striker.fours += 1;
        if (runs === 6) striker.sixes += 1;
      }
      if (isWicket) striker.isOut = true;
      newBatters[prev.currentStrikerIndex] = striker;

      const newBowlers = [...prev.bowlers];
      const bowler = { ...newBowlers[prev.currentBowlerIndex] };
      bowler.runs += totalRuns;
      if (!isExtra) bowler.balls += 1;
      if (isWicket) bowler.wickets += 1;
      bowler.oversString = `${Math.floor(bowler.balls / 6)}.${bowler.balls % 6}`;
      newBowlers[prev.currentBowlerIndex] = bowler;

      let ballStr = isWicket ? 'W' : isWide ? 'wd' : isNoBall ? 'nb' : isDot ? '0' : runs.toString();
      const nextLastBalls = [...prev.lastBalls, ballStr].slice(-6);

      let sIdx = prev.currentStrikerIndex;
      let nsIdx = prev.currentNonStrikerIndex;
      if (!isWide && runs % 2 !== 0) {
        sIdx = prev.currentNonStrikerIndex;
        nsIdx = prev.currentStrikerIndex;
      }

      const nextRuns = prev.runs + totalRuns;
      const nextWickets = prev.wickets + (isWicket ? 1 : 0);
      const nextBalls = isExtra ? prev.balls : prev.balls + 1;
      const isOverComplete = nextBalls > 0 && nextBalls % 6 === 0 && !isExtra;
      
      if (isOverComplete) {
         const temp = sIdx; sIdx = nsIdx; nsIdx = temp;
      }

      let newState = {
        ...prev, runs: nextRuns, wickets: nextWickets, balls: nextBalls, extras: prev.extras + (isExtra ? 1 : 0),
        batters: newBatters, bowlers: newBowlers, currentStrikerIndex: sIdx, currentNonStrikerIndex: nsIdx, lastBalls: nextLastBalls,
      };

      let done = (prev.currentInnings === 2 && nextRuns >= prev.target) || nextWickets === 10 || Math.floor(nextBalls / 6) >= prev.oversLimit;

      if (done) newState = handleEndInnings(newState);
      else {
        if (isWicket) newState.pendingBatter = true;
        if (isOverComplete) newState.pendingBowler = true;
      }
      return newState;
    });
  };

  const addNewBatter = (name) => {
    setMatchData(prev => {
      const newBatters = [...prev.batters, { name, runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false }];
      let sIdx = prev.currentStrikerIndex;
      let nsIdx = prev.currentNonStrikerIndex;
      if (newBatters[sIdx].isOut) sIdx = newBatters.length - 1;
      else if (newBatters[nsIdx].isOut) nsIdx = newBatters.length - 1;

      return { ...prev, batters: newBatters, currentStrikerIndex: sIdx, currentNonStrikerIndex: nsIdx, pendingBatter: false };
    });
  };

  const addNewBowler = (name) => {
    setMatchData(prev => {
      let bIdx = prev.bowlers.findIndex(b => b.name === name);
      let newBowlers = [...prev.bowlers];
      if (bIdx === -1) {
        newBowlers.push({ name, balls: 0, runs: 0, wickets: 0, oversString: '0.0' });
        bIdx = newBowlers.length - 1;
      }
      return { ...prev, bowlers: newBowlers, currentBowlerIndex: bIdx, pendingBowler: false };
    });
  };

  const resetMatch = () => {
    localStorage.removeItem('cricketMatchState');
    setMatchData({
      status: 'setup', team1: '', team2: '', oversLimit: 20, currentInnings: 1, target: null,
      runs: 0, wickets: 0, balls: 0, batters: [], bowlers: [], pendingBatter: false, pendingBowler: false,
    });
  };

  return (
    <MatchContext.Provider value={{
      ...matchData, startMatch, startSecondInnings, addBall, addNewBatter, addNewBowler, resetMatch
    }}>
      {children}
    </MatchContext.Provider>
  );
};
