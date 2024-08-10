import express from 'express';
import { getProblem,setProblem,executeCode, testEndpoint } from '../controllers/codeController.mjs';

const router = express.Router();

router.get('/test', testEndpoint);
router.post('/run', executeCode);
router.post('/setproblem', setProblem);
router.get('/problem', getProblem);

export default router;
