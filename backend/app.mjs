import express from 'express';
import bodyParser from 'body-parser';
import { cpp } from 'compile-run';
import { performance } from 'perf_hooks';
import { memoryUsage } from 'process';
const app = express();

app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.send('hey working')
});

app.post('/run', async (req, res) => {
    const { filePath, input } = req.body;

    if (!filePath || !input) {
        return res.status(400).json({ error: 'filePath and input are required' });
    }

    try {
        const startTime = performance.now();
        const result = await cpp.runFile(filePath, { stdin: input });
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        res.json({
            result:{
                result
            },
            executionTime: `${executionTime.toFixed(2)} ms`,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
