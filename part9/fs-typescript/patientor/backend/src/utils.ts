import { z } from 'zod';
import { Gender, type NewPatientEntry } from './types.ts';

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatientEntry: NewPatientEntry = {
      name: z.string().parse(object.name),
      dateOfBirth: z.iso.date().parse(object.dateOfBirth),
      ssn: z.string().parse(object.ssn),
      gender: z.enum(Gender).parse(object.gender),
      occupation: z.string().parse(object.occupation),
    };

    return newPatientEntry;
  }
  throw new Error('Incorrect data: Some fields are missing.');
};

// const isString = (str: unknown): str is string => {
//   return typeof str === 'string' || str instanceof String;
// };

// const parseName = (name: unknown) => {
//   if (!name || !isString(name)) {
//     throw new Error('Incorrect or missing name ' + name);
//   }
//   return name;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown) => {
//   if (!isString(date) || !isDate(date)) {
//     throw new Error('Incorrect or missing date' + date);
//   }
//   return date;
// };

// const parseSsn = (ssn: unknown): string => {
//   if (!isString(ssn)) {
//     throw new Error('Incorrect or missing ssn' + ssn);
//   }
//   return ssn;
// };

// const parseOccupation = (job: unknown): string => {
//   if (!isString(job)) {
//     throw new Error('Incorrect or missing occupation' + job);
//   }
//   return job;
// };

// const isGender = (param: string): param is Gender => {
//   return (Object.values(Gender) as string[]).includes(param);
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!isString(gender) || !isGender(gender)) {
//     throw new Error('Incorrect or missing gender' + gender);
//   }
//   return gender;
// };

export default { parseNewPatientEntry };
