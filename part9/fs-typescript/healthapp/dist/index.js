import express from 'express';
import calculateBmi from './bmi/bmiCalculator.js';
import { calculateExercises } from './exercise/exerciseCalculator.js';
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
        const height = req.query.height;
        const weight = req.query.weight;
        const result = calculateBmi(height, weight);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post('/exercises', (req, res) => {
    try {
        const { target, daily_exercises } = req.body;
        if (!target || !daily_exercises) {
            return res.status(400).json({ error: 'parameters missing' });
        }
        if (typeof target !== 'number' ||
            !Array.isArray(daily_exercises) ||
            !daily_exercises.every((val) => typeof val === 'number')) {
            return res.status(400).json({ error: 'malformatted parameters' });
        }
        const result = calculateExercises(target, daily_exercises);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
app.use((error, _req, res, next) => {
    if (error) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    return next(error);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
