import React from "react";
import { useState } from "react";
import axios from 'axios';
import './codeEditor.css';

const CodeEditor=()=> {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [input, setInput] = useState('');
    const [after, setAfter] = useState(false);
    const [execTime,setExecTime]=useState(null);
    const [execMemory,setExecMemory]=useState(null);

    const handleRun = async () => {
      try {
        // Send POST request and await the response
        const response = await axios.post('http://localhost:8080/api/run', {
          sourceCode: code,
          input: input
        });
    
        // Determine the result based on the response
        let result;
        if (response.data.result.stderr !== "") {
          result = response.data.result.stderr;
        } else {
          result = response.data.result.stdout;
        }
        setAfter(true);
        setExecTime(response.data.executionTime);
        setExecMemory(response.data.result.memoryUsage);
        // Set the output and input states
        setOutput(result+'\n');
        setInput('');
    
      } catch (error) {
        // Handle errors
        console.log(error);
      }
    };
    
    return(
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
                    <option value="c++">C++</option>
                    {/* <option value="python">Python</option> */}
                    {/* <option value="java">Java</option> */}
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
                <div id="terminalContent">
                {after && (
                  <div id="statistics">
                    <span className="stat-left">memory: {execMemory} kbs</span>
                    <span className="stat-right">time: {execTime}</span>
                  </div>
                )}
                <div id="output">{output}</div>
                </div>
                <textarea
                  id="terminalInput"
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
    )
}
export default CodeEditor