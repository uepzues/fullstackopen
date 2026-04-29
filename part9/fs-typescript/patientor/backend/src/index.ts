import express from 'express';
import diagnosesRouter from './routes/diagnosesRouter.ts';
import patientsRouter from '../src/routes/patientsRouter.ts';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
