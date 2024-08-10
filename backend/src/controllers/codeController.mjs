import {executeCppCode} from '../services/codeService.mjs';
import {Problem} from '../models/problem.mjs';

export const setProblem = async (req, res) => {
    const { problemID, problemStatement, input, output } = req.body;
    try {
        const newProblem = new Problem({ problemID, problemStatement, input, output });
        await newProblem.save();
        res.status(201).json({ message: 'Problem added successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getProblem = async (req, res) => {
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

export const testEndpoint = (req, res) => {
    res.send('hey working');
};
