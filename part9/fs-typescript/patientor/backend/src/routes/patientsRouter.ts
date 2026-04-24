import express, { type Response } from 'express';
import patientsService from '../services/patientsService.ts';
import type { NonSensitivePatientEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsService.getPatientsNonSensitive());
});

router.post('/', (_req, res) => {
  res.send('saving patient');
});

export default router;
