import { cpp } from 'compile-run';

export const runPythonCode = async (sourceCode) => {
    try {
        let result = await python.runSource(sourceCode);
        return result;
    } catch (error) {
        throw error;
    }
};