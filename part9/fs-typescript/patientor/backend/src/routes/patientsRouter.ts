import express, { type Response, type Request } from 'express';
import patientsService from '../services/patientsService.ts';
import {
  type NewPatientEntry,
  type Patient,
  type NonSensitivePatientEntry,
  type EntryWithoutId,
  type Entry,
} from '../types.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsService.getPatientsNonSensitive());
});

router.get('/:id', (req: Request, res: Response<Patient>) => {
  const { id } = req.params as { id: string };
  const patient = patientsService.findPatientById(id);
  res.json(patient);
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const patientEntry = patientsService.addPatient(req.body);
    res.json(patientEntry);
  },
);

router.post(
  '/:id/entries',
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<Entry>,
  ) => {
    const { id } = req.params;
    const { body } = req;
    const entry = patientsService.addPatientEntry(id, body);
    res.json(entry);
  },
);

router.use(errorMiddleware);

export default router;
