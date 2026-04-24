import express, {type Response} from 'express';
import diagnosesService from '../services/diagnosesService.ts';
import type { Diagnosis } from '../types.ts';
const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('saving diagnosis');
});

export default router;
