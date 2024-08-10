import {executeCppCode} from '../services/codeService.mjs';
import {Problem} from '../models/problem.mjs';

export const setProblem = async (req, res) => {
    const { problemID, problemName,problemStatement, testcases } = req.body;
    try {
        const newProblem = new Problem({ problemID,problemName,problemStatement, testcases });
        await newProblem.save();
        res.status(201).json({ message: 'Problem added successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const submit = async (req, res) => {
    const { problemID } = req.params; // Get the problemID from the URL
    const { code } = req.body;
    try {
        // Fetch the problem and its test cases from the database
        const problem = await Problem.findOne({ problemID });
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        const { testcases } = problem;
        // console.log(testcases);
        let allTestsPassed = true;
        console.log(testcases);
        
        // Iterate over each test case
        for (const testcase of testcases) {
            const { input, output: expectedOutput } = testcase;
        
            // Debugging: Log the test case input and expected output
            console.log('Running test case with input:', input);
            console.log('Expected output:', expectedOutput);
        
            try {
                // Call the external function to run the code with the current input
                const response = await coderunner(false, code, input);
        
                // Handle case where the code runner returns an error code
                if (response === -1) {
                    console.log('Error: Code runner returned -1 (Empty code)');
                    return res.json({ result: 'Empty code' });
                }
        
                // Debugging: Log the response from the code runner
                console.log('Code runner response:', response);
                const actualOutput = response.result.stdout;
                const stderr = response.result.stderr;
                // const actualOutput="5";
        
                // Compare the actual output with the expected output
                if (stderr) {
                    console.log('Error: stderr is not empty:', stderr);
                    allTestsPassed = false;
                    break;
                }
        
                if (actualOutput.trim() !== expectedOutput.trim()) {
                    console.log('Test failed: actual output does not match expected output');
                    allTestsPassed = false;
                    break;
                }
            } catch (error) {
                console.error('Error during code execution:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            }
        }

        // Return the result based on whether all tests passed
        if (allTestsPassed) {
            return res.json({ result: 'Accepted' });
        } else {
            return res.json({ result: 'Failed' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getProblem = async (req, res) => {
    const { problemID } = req.params; // Extract problemID from URL parameters

    try {
        // Fetch the problem from the database
        const problem = await Problem.findOne({ problemID });

        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        // Return the problem details
        return res.json(problem);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

};

export const getAllProblem = async (req, res) => {
    try {
        const problems = await Problem.find({});
        res.json(problems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const executeCode = async (req, res) => {
    const { filePath, sourceCode, input } = req.body;

    if (!filePath && !sourceCode) {
        return res.status(400).json({ error: 'Either filePath or sourceCode is required' });
    }

    try {
        const result = await executeCppCode(filePath, sourceCode, input);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const coderunner = async (filepath,sourceCode, input) => {
    if (!sourceCode) {
        return -1;
    }
    try {
        const result = await executeCppCode(filepath, sourceCode, input);
        return result;
    } catch (err) {
        return err;
    }
};

export const testEndpoint = (req, res) => {
    res.send('hey working');
};
