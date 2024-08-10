import { cpp } from 'compile-run';
import { performance } from 'perf_hooks';
import { memoryUsage } from 'process';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

export const executeCode = async (req, res) => {
    const { filePath, sourceCode, input } = req.body;

    if (!filePath && !sourceCode) {
        return res.status(400).json({ error: 'Either filePath or sourceCode is required' });
    }

    if (!input) {
        return res.status(400).json({ error: 'Input is required' });
    }

    let tempFilePath;
    try {
        if (sourceCode) {
            const tempDir = os.tmpdir();
            tempFilePath = path.join(tempDir, `temp-${Date.now()}.cpp`);
            await fs.writeFile(tempFilePath, sourceCode);
        }

        const startTime = performance.now();
        const result = await cpp.runFile(filePath || tempFilePath, { stdin: input });
        const endTime = performance.now();
        const executionTime = endTime - startTime;

        res.json({
            result: result,
            executionTime: `${executionTime.toFixed(2)} ms`,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (tempFilePath) {
            // Clean up the temporary file
            await fs.unlink(tempFilePath);
        }
    }
};

export const testEndpoint = (req, res) => {
    res.send('hey working');
};
