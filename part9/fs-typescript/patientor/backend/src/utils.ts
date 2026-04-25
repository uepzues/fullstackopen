import { type NewPatientEntry } from './types.ts';

export const parseNewPatientEntry = (object: unknown) => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.');
  }

  const newPatientEntry: NewPatientEntry = {
    name: 'test name',
    dateOfBirth: 'dob',
    ssn: 'ssn',
    gender: 'male',
    occupation: 'job',
  };

  return newPatientEntry;
};

export default { parseNewPatientEntry };
