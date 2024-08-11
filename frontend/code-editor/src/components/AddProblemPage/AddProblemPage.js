import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import './AddProblemPage.css';

function AddProblemPage() {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      testcases: [{ input: '', output: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'testcases',
  });

  const onSubmit = data => {
    axios.post('http://localhost:8080/api/setproblem', data)
      .then(response => {
        reset();  // Reset form after submission
        alert('Problem added successfully!');
      })
      .catch(error => {
        console.error('Error creating problem:', error);
      });
  };

  return (
    <div className="add-problem-container">
      <h1>Submit Your Own Problem</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Problem ID:</label>
          <input {...register('problemId')} required />
        </div>
        <div className="form-group">
          <label>Problem Name:</label>
          <input {...register('title')} required />
        </div>
        <div className="form-group">
          <label>Problem Description:</label>
          <textarea {...register('description')} required />
        </div>

        <div className="form-group">
          <label>Test Cases:</label>
          {fields.map((field, index) => (
            <div key={field.id} className="testcase-group">
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
              <button type="button" className="remove-button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-button"
            onClick={() => append({ input: '', output: '' })}
          >
            Add Test Case
          </button>
        </div>

        <button type="submit" className="submit-button">Submit Problem</button>
      </form>
    </div>
  );
}

export default AddProblemPage;
