import express, { type Response, type Request } from 'express';
import patientsService from '../services/patientsService.ts';
import {
  type NewPatientEntry,
  type Patient,
  type NonSensitivePatientEntry,
} from '../types.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsService.getPatientsNonSensitive());
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const patientEntry = patientsService.addPatient(req.body);
    res.json(patientEntry);
  },
);

router.use(errorMiddleware);

export default router;
