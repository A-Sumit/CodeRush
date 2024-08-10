// Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Code Explorer</h1>
      </header>
      <main className="homepage-main">
        <section className="questions-section">
          <h2>Popular Questions</h2>
          <ul>
            {/* Update links to point to specific question pages */}
            {/* <li><Link to="/question/1">Question 1: Example Question</Link></li> */}
            <li><Link to="/question/2">Question 2: Another Example</Link></li>
            <li><Link to="/question/3">Question 3: Yet Another</Link></li>
          </ul>
        </section>
        <section className="access-section">
          <Link to="/coding-app" className="access-button">Go to Coding App</Link>
        </section>
      </main>
    </div>
  );
}

export default Homepage;
