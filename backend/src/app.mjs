import express from 'express';
import bodyParser from 'body-parser';
import codeRoutes from './routes/codeRoutes.mjs';

const app = express();

app.use(bodyParser.json());

app.use('/api', codeRoutes);

app.listen(8080, () => {
    console.log('Server running on port 8080');
});