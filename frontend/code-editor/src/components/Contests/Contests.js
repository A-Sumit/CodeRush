import { useParams } from 'react-router-dom';
import React, { useState,useEffect,useRef } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Contests.css';
const ContestPage =()=>{
    const { contestId } = useParams();  
    const [problemID, setProblemId] = useState('');
    const terminalRef = useRef(null);
    const [code, setCode] = useState('');
    const [ready,setReady]=useState(false);
    const [terminalContent, setTerminalContent] = useState(''); // Holds terminal output
    const [contest, setContest] = useState([]);
    const [input, setInput] = useState('');
    const [after, setAfter] = useState(false);
    const [execTime,setExecTime]=useState(null);
    const [execMemory,setExecMemory]=useState(null);
    useEffect(() => {
      // Fetch problems for contests from API
      axios.get('http://localhost:8080/api/contest/'+contestId)
        .then(response => {
          setContest(response.data);
        //   console.log(response.data);
        //   console.log(response.data.contestProblems[0].problemID)
          setProblemId(response.data.contestProblems[0].problemID)
          setInput(response.data.contestProblems[0].testcases[0].input)
        //   console.log(response.data.contestProblems[2].testcases)
          setReady(true);
        })
        .catch(error => {
          console.error('Error fetching problems:', error);
        });
    }, []);

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
          console.log(result);
      
        } catch (error) {
          // Handle errors
          console.log(error);
        }
      };
  
    const handleSubmit = async () => {
      // Logic for submitting the solution
      try {
        const response = await axios.post(`http://localhost:8080/api/contests/${contestId}/problems/${problemID}/submit`, {
          code: code,
          userId:"1"
        });
        // setResult(response.data.result);
        console.log(response);
        if (response.data.isCorrect === true) {
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
          console.log(err.message);
      }  
    };

    const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);

    const handleSelectProblem = (index,problemID,input) => {
        setSelectedProblemIndex(index);
        setProblemId(problemID);
        setInput(input);
        // console.log(input);
    };
    return (
    <>
    {ready && <div className="contestPage">
        <ToastContainer/>
        <div className="top-bar">
            <div className="contest-name"><h1>{contest.contestName}</h1></div>
            <div className="top-bar-buttons">
                <Link to="/leaderboard" className="access-button">LeaderBoard</Link>
                <button id="runButton" onClick={handleRun}>Run</button>
                <button id="submitButton" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
        <div className='contest-page'>
        <div className="sidebar" >
            <nav className="problem-nav">
            <ul>
                {contest.contestProblems.map((problem, index) => (
                <li
                    key={index}
                    onClick={() => handleSelectProblem(index,problem.problemID,problem.testcases[0].input)}
                >
                    {problem.problemName}
                </li>
                ))}
            </ul>
            </nav>
        </div>
        <div className="content">
            <div className="problem-details">
            <h2>{contest.contestProblems[selectedProblemIndex].problemName}</h2>
            <p>{contest.contestProblems[selectedProblemIndex].problemStatement}</p>
            <h3>Test Cases:</h3>
            <ul>
                {contest.contestProblems[selectedProblemIndex].testcases.map((testcase, index) => (
                <li key={index}>
                    <strong>Input:</strong> {testcase.input} <br />
                    <strong>Expected Output:</strong> {testcase.output}
                </li>
                ))}
            </ul>
        </div>
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
        }
    </>
    );
}
export default ContestPage;