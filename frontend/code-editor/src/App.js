import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage/Homepage.js';
import CodeEditor from './components/playground/codeEditor.jsx';
import QuestionPage from './components/questions/QuestionPage.js';
import AddProblemPage from './components/AddProblemPage/AddProblemPage.js';
import Contests from './components/Contests/Contests.js'; // Import the new Contests component
import ContestPage from './components/Contests/contestPage/contestpage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coding-app" element={<CodeEditor />} />
        <Route path="/question/:problemID" element={<QuestionPage />} />
        <Route path="/contests/:contestId" element={<ContestPage />} />
        <Route path="/add-problem" element={<AddProblemPage />} />
        <Route path="/contests" element={<Contests />} /> {/* New route for contests */}
      </Routes>
    </Router>
  );
}

export default App;
