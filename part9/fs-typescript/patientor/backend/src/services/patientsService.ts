import patientEntries from '../../data/patients.ts';
import type {
  NewPatientEntry,
  NonSensitivePatientEntry,
  Patient,
} from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatientsNonSensitive = (): NonSensitivePatientEntry[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }),
  );
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientsNonSensitive,
  addPatient,
};
