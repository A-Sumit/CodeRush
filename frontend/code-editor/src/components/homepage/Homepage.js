import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import './Homepage.css';

function Homepage() {
  const [problems, setProblems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      testcases: [{ input: '', output: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'testcases',
  });

  useEffect(() => {
    // Fetch problems from API
    axios.get('http://localhost:8080/api/problem')
      .then(response => {
        setProblems(response.data);
        // console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching problems:', error);
      });
  }, []);

  const onSubmit = data => {
    axios.post('http://localhost:8080/api/setproblem', data)
      .then(response => {
        setProblems([...problems, response.data]);
        setShowForm(false);
        reset();  // Reset form after submission
      })
      .catch(error => {
        console.error('Error creating problem:', error);
      });
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Code Explorer</h1>
      <section className="access-section">
        <Link to="/coding-app" className="access-button">Go to PlayGround</Link>
      </section>
      </header>
      <main className="homepage-main">
      <div className='problems-list'>
        <h1>Problems List</h1>
        <ul>
          {problems.map(problem => (
            <li key={problem.problemID}>
              <Link to={`/question/${problem.problemID}`}>{problem.problemName}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='create-problem-form'>
        <h1>Submit Your Own Problem</h1>
        { (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Problem ID:</label>
              <input {...register('problemId')} required />
            </div>
            <div>
              <label>Problem Name:</label>
              <input {...register('title')} required />
            </div>
            <div>
              <label>Problem Description:</label>
              <textarea {...register('description')} required />
            </div>

            <div>
              <label>Test Cases:</label>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <input
                    placeholder="Input"
                    {...register(`testcases.${index}.input`)}
                    required
                  />
                  <input
                    placeholder="Output"
                    {...register(`testcases.${index}.output`)}
                    required
                  />
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ input: '', output: '' })}
              >
                Add Test Case
              </button>
            </div>

            <button type="submit">Submit Problem</button>
          </form>
        )}
      </div>
      </main>
    </div>
  );
}

export default Homepage;
