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

const findPatientById = (id: string): Patient | undefined => {
  return patientEntries.find((patient) => patient.id === id);
}

export default {
  getPatientsNonSensitive,
  addPatient,
  findPatientById
};
