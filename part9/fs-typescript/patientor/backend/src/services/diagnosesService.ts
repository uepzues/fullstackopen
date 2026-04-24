import diagnosesEntries from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesEntries;
};

export default { getDiagnoses };
