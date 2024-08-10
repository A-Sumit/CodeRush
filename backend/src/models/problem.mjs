import mongoose from'mongoose';

const testcaseSchema = new mongoose.Schema({
    input: { type: String, required: true },
    output: { type: String, required: true }
});

const problemSchema = new mongoose.Schema({
    problemID: { type: String, required: true, unique: true },
    problemStatement: { type: String, required: true },
    testcases: [testcaseSchema]  // Array of testcases
});

export const Problem = mongoose.model('Problem', problemSchema);
