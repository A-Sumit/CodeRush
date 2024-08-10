import {executeCppCode} from '../services/codeService.mjs';

export const executeCode = async (req, res) => {
    const { filePath, sourceCode, input } = req.body;

    if (!filePath && !sourceCode) {
        return res.status(400).json({ error: 'Either filePath or sourceCode is required' });
    }

    if (!input) {
        return res.status(400).json({ error: 'Input is required' });
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
