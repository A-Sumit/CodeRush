import { runPythonCode } from '../services/codeService.mjs';

export const executeCode = async (req, res) => {
    const { sourceCode } = req.body;
    try {
        const result = await runPythonCode(sourceCode);
        res.json({ output: result.stdout, error: result.stderr });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const testEndpoint = (req, res) => {
    res.send('hey working');
};
