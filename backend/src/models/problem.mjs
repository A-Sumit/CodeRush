import mongoose from'mongoose';

const problemSchema = new mongoose.Schema({
    problemID: { type: String, required: true, unique: true },
    problemStatement: { type: String, required: true },
    input: { type: String, required: true },
    output: { type: String, required: true }
});

export const Problem = mongoose.model('Problem', problemSchema);
