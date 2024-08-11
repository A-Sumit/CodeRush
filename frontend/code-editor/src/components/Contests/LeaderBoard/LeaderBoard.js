import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LeaderBoard.css';
import axios from 'axios';

function Leaderboard() {
  // Example leaderboard data
  const [leaderboardData,setData] = useState([]);

  useEffect(() => {
    // Fetch problems for contests from API
    axios.get('http://localhost:8080/api/leaderboard/1')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching problems:', error);
      });
  }, []);

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1>Leaderboard</h1>
        <Link to="/contests/1" className="back-to-contests">Back to Contests</Link>
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
                <td>1</td>
                <td>{entry.username}</td>
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
