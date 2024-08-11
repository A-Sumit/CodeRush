import { useParams } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import axios from "axios";

const ContestPage =()=>{
    const { contestId } = useParams();
    const [ready,setReady]=useState(false);
    const [contest, setContest] = useState([]);
    useEffect(() => {
      // Fetch problems for contests from API
      axios.get('http://localhost:8080/api/contest/'+contestId)
        .then(response => {
          setContest(response.data);
          console.log(response.data);
          setReady(true);
        })
        .catch(error => {
          console.error('Error fetching problems:', error);
        });
    }, []);

    const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);

    const handleSelectProblem = (index) => {
        setSelectedProblemIndex(index);
    };
    return (
    <>
    {ready && <div className="contest-page" style={{ display: 'flex' }}>
        <div className="sidebar" style={{ width: '200px', backgroundColor: '#f5f5f5', padding: '20px' }}>
            <nav className="problem-nav">
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {contest.contestProblems.map((problem, index) => (
                <li
                    key={index}
                    onClick={() => handleSelectProblem(index)}
                    style={{
                    padding: '10px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: selectedProblemIndex === index ? '#eaeaea' : 'transparent',
                    }}
                >
                    {problem.problemName}
                </li>
                ))}
            </ul>
            </nav>
        </div>
        <div className="content" style={{ flexGrow: 1, padding: '20px' }}>
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
        </div>
        </div>}
    </>
    );
}
export default ContestPage;