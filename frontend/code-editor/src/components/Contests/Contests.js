import React from 'react';
import { Link } from 'react-router-dom';
import './Contests.css';

function Contests() {
  return (
    <div className="contests-container">
      <header className="contests-header">
        <h1>Contests</h1>
        <Link to="/" className="back-home">Back to Homepage</Link>
      </header>
      <main className="contests-main">
        <div className="contests-list">
          {/* Display contest problems here */}
        </div>
        <Link to="/leaderboard" className="view-leaderboard">View Leaderboard</Link>
      </main>
    </div>
  );
}

export default Contests;
