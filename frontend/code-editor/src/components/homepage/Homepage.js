import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Homepage.css';

function Homepage() {
  const [problems, setProblems] = useState([]);
  const [ready, setReady] = useState(false);
  const [contests, setContests] = useState([]); // Dummy data for contests
  
  useEffect(() => {
    // Fetch problems for contests from API
    axios.get('http://localhost:8080/api/contests')
      .then(response => {
        setContests(response.data);
        setReady(true);
        // console.log(response);
      })
      .catch(error => {
        console.error('Error fetching problems:', error);
      });
  }, []);

  useEffect(() => {
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
        {/* Sidebar for Contests */}
        {ready &&
          <div className="sidebar">
          <h2>Contests</h2>
          <ul>
            {contests.map(contest => (
              <li key={contest.id}>
                <Link to={`/contests/${contest.contestId}`}>{contest.contestName}</Link>
              </li>
            ))}
          </ul>
        </div>}
      </main>
    </div>
  );
}

export default Homepage;
