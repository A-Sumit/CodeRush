import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [terminalContent, setTerminalContent] = useState(''); // Holds terminal output and input
  const [userInput, setUserInput] = useState('');
  const [language, setLanguage] = useState('python'); // Language state
  const terminalRef = useRef(null);

  const handleRun = () => {
    const simulatedOutput = `Output: You entered "${code}"`;
    setTerminalContent((prev) => prev + `> ${code}\n${simulatedOutput}\n`);
    setCode('');
    setUserInput('');
    scrollToBottom();
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (userInput.trim()) {
        setTerminalContent((prev) => prev + `> ${userInput}\n`);
        setUserInput(''); // Clear the input field after submitting
        scrollToBottom();
      }
    }
  };

  const scrollToBottom = () => {
    const terminal = terminalRef.current;
    terminal.scrollTop = terminal.scrollHeight;
  };

  return (
    <div className="container">
      <header>
        <h1>Code Editor Interface</h1>
      </header>
      <main>
        <div className="wrapper">
          <div id="editor-splitter">
            <div id="left-pane" className="split">
              <div id="editor-section">
                <div className="editor-header">
                  <select
                    id="languageSelect"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                  </select>
                  <button id="runButton" onClick={handleRun}>Run Code</button>
                </div>
                <textarea
                  id="codeEditor"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code here..."
                ></textarea>
              </div>
            </div>
            <div id="right-pane" className="split">
              <div id="terminal" ref={terminalRef} tabIndex="0" onKeyDown={handleKeyDown}>
                <div id="terminalContent">
                  {terminalContent}
                </div>
                <textarea
                  id="terminalInput"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your input here..."
                  rows="1"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
