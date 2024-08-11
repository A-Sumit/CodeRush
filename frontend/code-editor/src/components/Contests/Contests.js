import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Contests.css';

function Contests() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Fetch problems for contests from API
    axios.get('http://localhost:8080/api/problems-for-contests')
      .then(response => {
        setProblems(response.data);
      })
      .catch(error => {
        console.error('Error fetching problems:', error);
      });
  }, []);

  return (
    <div className="contests-container">
      <header className="contests-header">
        <h1>Contests</h1>
        <Link to="/" className="back-home">Back to Homepage</Link>
      </header>
      <main className="contests-main">
        <div className="contests-list">
          <ul>
            {problems.map(problem => (
              <li key={problem.problemID}>
                <Link to={`/question/${problem.problemID}`}>{problem.problemName}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Contests;
