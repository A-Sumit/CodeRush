// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage/Homepage.js';
import CodeEditor from './components/playground/codeEditor.jsx';
import QuestionPage from './components/questions/QuestionPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coding-app" element={<CodeEditor />} />
        <Route path="/question/:problemID" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}
export default App;
