# 🏏 Cricket Live Scoreboard | React.js
🔗 Live Demo: https://cricket-live-scoreboard.vercel.app/

A complete, interactive Cricket Scoreboard Web Application built using **React.js**.  
The application allows users to **track, manage, and display live cricket match scores** with a detailed batting and bowling scorecard, real-time updates, and match highlights.

The project features a **modern Material UI–inspired design**, advanced scoring controls, and uses **React Context API for global state management**.

---

## ✨ Features

### 🏟 Match Setup
- Multi-step match setup wizard
- Enter **Team Names**
- Select **Total Overs**
- Choose **Toss Winner**
- Select **Bat or Bowl decision**

### 📊 Live Scoreboard
- Displays **Runs / Wickets / Overs**
- Real-time score updates
- Automatic strike rotation
- Smart over tracking

Example:
India 152/4 (17.3 overs)

---

### 🏏 Batting Scorecard

Displays individual batting statistics:

| Player | Runs | Balls | 4s | 6s | Strike Rate |
|------|------|------|------|------|------|

Strike Rate Formula:

Strike Rate = (Runs / Balls) * 100

---

### 🎯 Bowling Scorecard

Displays bowling statistics:

| Bowler | Overs | Runs | Wickets | Economy |

Economy Rate Formula:

Economy = Runs / Overs

---

### 🎮 Ball-by-Ball Controls

Users can update match events using control buttons:

- Dot Ball
- +1 Run
- +2 Runs
- +3 Runs
- +4 Runs
- +6 Runs
- Wicket
- Wide
- No Ball

The scoreboard updates **instantly after every ball**.

---

### 📈 Match Highlights

The highlights panel displays:

- Current Run Rate (CRR)
- Required Run Rate (RRR)
- Target score (2nd innings)
- Last 6 balls tracker

---

### 💾 Persistent Match Data

Match progress is automatically saved using **localStorage**.  
This ensures match data remains intact even after page refresh.

---

## 🛠 Tech Stack

Frontend
- React.js (Functional Components)
- React Hooks
- Context API

Build Tool
- Vite

UI Library
- Material UI

Styling
- CSS
- CSS Variables
- Inter Font

---

## 🚀 Run the Project Locally

### 1️⃣ Clone Repository

git clone https://github.com/yourusername/react-cricket-scoreboard.git

### 2️⃣ Navigate to Project Folder

cd react-cricket-scoreboard

### 3️⃣ Install Dependencies

npm install

### 4️⃣ Start Development Server

npm run dev

### 5️⃣ Open in Browser

http://localhost:5173

---

## 📂 Project Structure

react-cricket-scoreboard

src
- components
  - BallControls.jsx
  - BattingScoreCard.jsx
  - BowlingScoreCard.jsx
  - Header.jsx
  - MatchHighlights.jsx
  - MatchSetup.jsx
  - ScoreBoard.jsx

- context
  - MatchContext.jsx

- data
  - players.js

- pages
  - MatchPage.jsx

- App.jsx
- main.jsx
- index.css

package.json  
vite.config.js  
README.md  

---

## 📝 How to Use

1. Start the application  
2. Enter **Team Names**  
3. Select **Match Overs**  
4. Conduct the **Toss**  
5. Enter **Opening Players**  
6. Use ball controls to update the score  

The system will automatically:
- Rotate strike
- Update scorecards
- Track overs
- Calculate run rates

---

## 🔄 Reset Match

Click **Reset Match** in the top-right corner to start a new match.

---

## 👨‍💻 Author

Teja Surya Jonnala  
