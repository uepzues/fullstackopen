import express, { type Response } from 'express';
import patientsService from '../services/patientsService.ts';
import type { NonSensitivePatientEntry } from '../types.ts';
import { parseNewPatientEntry } from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsService.getPatientsNonSensitive());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const patientEntry = patientsService.addPatient(newPatientEntry);
    res.json(patientEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error ' + error.message;
    }
    res.status(400).json(errorMessage);
  }
});

export default router;

