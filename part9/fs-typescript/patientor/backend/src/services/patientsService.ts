import patientEntries from '../../data/patients.ts';
import type { NonSensitivePatientEntry } from '../types.ts';

const getPatients = () => {
  return patientEntries;
};

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

export default {
  getPatients,
  getPatientsNonSensitive,
};
