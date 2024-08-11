import React from 'react';
import { Link } from 'react-router-dom';
import './LeaderBoard.css';

function Leaderboard() {
  // Example leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Alice', score: 1500 },
    { rank: 2, name: 'Bob', score: 1400 },
    { rank: 3, name: 'Charlie', score: 1300 },
    // Add more entries as needed
  ];

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1>Leaderboard</h1>
        <Link to="/contests" className="back-to-contests">Back to Contests</Link>
      </header>
      <main className="leaderboard-main">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry) => (
              <tr key={entry.rank}>
                <td>{entry.rank}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Leaderboard;
