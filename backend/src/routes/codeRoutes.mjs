import express from 'express';
import { submit,getProblem,setProblem,executeCode, testEndpoint } from '../controllers/codeController.mjs';

const router = express.Router();

router.get('/test', testEndpoint);
router.post('/run', executeCode);
router.post('/setproblem', setProblem);
router.post('/problem/submit/:problemID', submit);
router.get('/problem', getProblem);

export default router;
