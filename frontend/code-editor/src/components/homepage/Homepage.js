import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Homepage.css';

function Homepage() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Fetch problems from API
    axios.get('http://localhost:8080/api/problem')
      .then(response => {
        setProblems(response.data);
      })
      .catch(error => {
        console.error('Error fetching problems:', error);
      });
  }, []);

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Code Explorer</h1>
        <div className="header-buttons">
          <Link to="/coding-app" className="access-button">Playground</Link>
          <Link to="/add-problem" className="add-problem-button">Add Your Problem</Link>
        </div>
      </header>
      <main className="homepage-main">
        <div className="problems-list">
          <h1>Problems List</h1>
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

export default Homepage;
