import express from 'express';
import { executeCode, testEndpoint } from '../controllers/codeController.mjs';

const router = express.Router();

router.get('/test', testEndpoint);
router.post('/run', executeCode);

export default router;
