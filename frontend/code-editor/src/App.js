import React, { useState } from 'react';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');

  const handleRun = () => {
    const simulatedOutput = `Output: You entered "${input}"`;
    setOutput((prev) => prev + simulatedOutput + '\n');
    setInput('');
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
                  <select id="languageSelect">
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
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
              <div id="terminal">
                <div id="terminal-content">
                  <div id="output">{output}</div>
                </div>
                <textarea
                  id="inputArea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your input here..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
