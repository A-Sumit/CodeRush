import React, { useState, useRef,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QuestionPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionPage = () => {
  const { problemID } = useParams(); // Extract problemID from the URL
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState('');
  const [terminalContent, setTerminalContent] = useState(''); // Holds terminal output
  const [language, setLanguage] = useState('c++'); // Language state
  const [leftWidth, setLeftWidth] = useState('60%'); // Initial width of the left pane
  const terminalRef = useRef(null);
  const dividerRef = useRef(null);
  const [input, setInput] = useState('');
  const [after, setAfter] = useState(false);
  const [execTime,setExecTime]=useState(null);
  const [execMemory,setExecMemory]=useState(null);

  
  useEffect(() => {
    // Fetch the problem data from the backend
    const fetchProblem = async () => {
          try {
              const response = await axios.get(`http://localhost:8080/api/problem/${problemID}`);
              setProblem(response.data);
              setLoading(false);
              setInput(response.data.testcases[0].input);
          } catch (err) {
              setError(err.message);
              setLoading(false);
          }
        };

        fetchProblem();
    }, [problemID]);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
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
        setTerminalContent(result+'\n');
    
      } catch (error) {
        // Handle errors
        console.log(error);
      }
    };

  const handleSubmit = async () => {
    // Logic for submitting the solution
    try {
      const response = await axios.post(`http://localhost:8080/api/problem/submit/${problemID}`, {
        code: code,
      });
      // setResult(response.data.result);
      console.log(response);
      if (response.data.result === 'Accepted') {
        toast.success('Submission Accepted!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } else {
        // Show error toast if the code is failed
        toast.error('Submission Failed!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    } catch (err) {
        setError(err.message);
    }  
  };


  const handleMouseDown = (event) => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const newWidth = Math.min(
      Math.max(20, event.clientX - dividerRef.current.getBoundingClientRect().left),
      window.innerWidth - 20
    );
    setLeftWidth(`${newWidth}px`);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  const testcasesToShow = problem.testcases.slice(0, Math.min(1, problem.testcases.length));
  return (
    <>
    { problem && <div className="container">
      <header>
        <ToastContainer/>
        <div className="header-title">{problem.problemName}</div>
        <div className="header-buttons">
          <select
            className="language-select"
            id="languageSelect"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
          </select>
          <button id="runButton" onClick={handleRun}>Run</button>
          <button id="submitButton" onClick={handleSubmit}>Submit</button>
        </div>
      </header>
      <main>
        <div className="wrapper">
          <div id="page-splitter">
            <div id="left-pane" style={{ width: leftWidth }}>
              <div id="question-section">
                <h2>Problem Statement</h2>
                <h4>{problem.problemStatement}</h4>
                <br/>
                <ul>
                  {testcasesToShow.map((testcase, index) => (
                      <li key={index}>
                          <strong>Input:</strong> {testcase.input}<br />
                          <strong>Expected Output:</strong> {testcase.output}
                      </li>
                  ))}
              </ul>
              </div>
            </div>
            <div id="divider" ref={dividerRef} onMouseDown={handleMouseDown}></div>
            <div id="right-pane">
              <div id="editor-section">
                <textarea
                  id="codeEditor"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code here..."
                ></textarea>
                <div id="terminal" ref={terminalRef}>
                  <div id="terminalContent">
                    {terminalContent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>}
    </>
  );
}

export default QuestionPage;
