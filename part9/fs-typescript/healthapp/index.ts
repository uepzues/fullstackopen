import express from 'express';
import calculateBmi from './bmi/bmiCalculator.js';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = req.query.height as string;
    const weight = req.query.weight as string;

    const result = calculateBmi(height, weight);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
