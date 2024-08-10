import express from 'express';
import bodyParser from 'body-parser';
import { python } from 'compile-run';
const app = express();

app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.send('hey working')
});

async function runPythonCode(sourceCode) {
    try {
        let result = await python.runSource(sourceCode);
        return result;
    } catch (error) {
        throw error;
    }
}

app.post('/run', async (req, res) => {
        const { sourceCode } = req.body;
        try {
            const result = await runPythonCode(sourceCode);
            res.json({ output: result.stdout, error: result.stderr });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
