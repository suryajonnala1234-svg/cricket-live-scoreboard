import React, { useState } from 'react';
import { useMatchContext } from '../context/MatchContext';
import { Stepper, Step, StepLabel, Button, TextField, Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const steps = ['Team', 'Overs', 'Toss', 'Batting'];

const MatchSetup = () => {
  const { startMatch } = useMatchContext();
  const [activeStep, setActiveStep] = useState(0);

  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [overs, setOvers] = useState('');

  const [tossWinner, setTossWinner] = useState('');
  const [tossDecision, setTossDecision] = useState('');

  const [striker, setStriker] = useState('');
  const [nonStriker, setNonStriker] = useState('');
  const [bowler, setBowler] = useState('');

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      if (team1 && team2 && overs > 0 && striker && nonStriker && bowler) {
        let battingTeam = team1;
        let bowlingTeam = team2;
        if (tossWinner === team1) {
          if (tossDecision === 'bowl') { battingTeam = team2; bowlingTeam = team1; }
        } else if (tossWinner === team2) {
          if (tossDecision === 'bat') { battingTeam = team2; bowlingTeam = team1; }
        }
        startMatch(battingTeam, bowlingTeam, overs, striker, nonStriker, bowler);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepValid = () => {
    if (activeStep === 0) return team1.trim() !== '' && team2.trim() !== '';
    if (activeStep === 1) return overs > 0;
    if (activeStep === 2) return tossWinner !== '' && tossDecision !== '';
    if (activeStep === 3) return striker.trim() !== '' && nonStriker.trim() !== '' && bowler.trim() !== '';
    return false;
  };

  return (
    <Box sx={{ width: '100vw', display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: '-1rem' }}>
      {/* Header Bar */}
      <Box sx={{ bgcolor: '#3f51b5', color: 'white', py: 2, px: 3, boxShadow: 1 }}>
        <Typography variant="h6" fontWeight="bold">Multi Step Form</Typography>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5', pt: 4 }}>
        <Box sx={{ width: '100%', maxWidth: 900, bgcolor: 'white', border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
          
          {/* Stepper Header */}
          <Box sx={{ px: 4, py: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Form Content */}
          <Box sx={{ minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 4 }}>
            {activeStep === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 400, textAlign: 'center' }}>
                <TextField
                  label="Team1 Name*"
                  variant="standard"
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                  fullWidth
                  required
                />
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>VS</Typography>
                <TextField
                  label="Team2 Name*"
                  variant="standard"
                  value={team2}
                  onChange={(e) => setTeam2(e.target.value)}
                  fullWidth
                  required
                />
              </Box>
            )}

            {activeStep === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 400, alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">How many overs?</Typography>
                <TextField
                  label="Overs*"
                  variant="standard"
                  type="number"
                  value={overs}
                  onChange={(e) => setOvers(e.target.value === '' ? '' : Number(e.target.value))}
                  fullWidth
                  required
                />
              </Box>
            )}
            {activeStep === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 400, alignItems: 'center' }}>
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>Who won the toss?</FormLabel>
                  <RadioGroup row value={tossWinner} onChange={(e) => setTossWinner(e.target.value)} sx={{ justifyContent: 'center' }}>
                    <FormControlLabel value={team1} control={<Radio />} label={team1 || "Team 1"} />
                    <FormControlLabel value={team2} control={<Radio />} label={team2 || "Team 2"} />
                  </RadioGroup>
                </FormControl>

                {tossWinner && (
                  <FormControl component="fieldset" sx={{ width: '100%' }}>
                    <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>Decision</FormLabel>
                    <RadioGroup row value={tossDecision} onChange={(e) => setTossDecision(e.target.value)} sx={{ justifyContent: 'center' }}>
                      <FormControlLabel value="bat" control={<Radio />} label="Bat First" />
                      <FormControlLabel value="bowl" control={<Radio />} label="Bowl First" />
                    </RadioGroup>
                  </FormControl>
                )}
              </Box>
            )}

            {activeStep === 3 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 400 }}>
                 <TextField
                  label="Striker Name*"
                  variant="standard"
                  value={striker}
                  onChange={(e) => setStriker(e.target.value)}
                  fullWidth
                  required
                />
                 <TextField
                  label="Non-Striker Name*"
                  variant="standard"
                  value={nonStriker}
                  onChange={(e) => setNonStriker(e.target.value)}
                  fullWidth
                  required
                />
                 <TextField
                  label="Opening Bowler Name*"
                  variant="standard"
                  value={bowler}
                  onChange={(e) => setBowler(e.target.value)}
                  fullWidth
                  required
                />
              </Box>
            )}

            {/* Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4, pb: 4, gap: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
                disableElevation
                sx={{ 
                  bgcolor: '#e0e0e0', 
                  color: '#757575', 
                  py: 1, 
                  px: 3, 
                  fontWeight: 'bold', 
                  visibility: activeStep === 0 ? 'hidden' : 'visible',
                  '&:hover': { bgcolor: '#d5d5d5' } 
                }}
              >
                BACK
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!isStepValid()}
                variant="contained" 
                disableElevation
                sx={{ 
                  bgcolor: '#3f51b5', 
                  color: 'white', 
                  py: 1, 
                  px: 3, 
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#303f9f' } 
                }}
              >
                {activeStep === steps.length - 1 ? 'START MATCH' : 'NEXT'}
              </Button>
            </Box>

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchSetup;
