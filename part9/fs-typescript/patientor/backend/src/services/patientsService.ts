import patientEntries from '../../data/patients.ts';
import type {
  Entry,
  EntryWithoutId,
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

const addPatient = (patientEntry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...patientEntry,
  };
  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

const findPatientById = (id: string): Patient | undefined => {
  return patientEntries.find((patient) => patient.id === id);
};

const addPatientEntry = (
  patientId: string,
  detailsEntry: EntryWithoutId,
): Entry => {
  const newEntry: Entry = {
    ...detailsEntry,
    id: uuid(),
  };

  const patient = patientEntries.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }

  if (!patient.entries) {
    patient.entries = [];
  }

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatientsNonSensitive,
  addPatient,
  findPatientById,
  addPatientEntry,
};
