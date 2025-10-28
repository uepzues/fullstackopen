import data from "../../data/diagnosesEntry";

import { Diagnosis } from "../../types";

const getDiagnosesEntries = (): Diagnosis[] => {
  return data;
};

const getNonLatinDiagnosis = (): Diagnosis[] => {
  return data.map(({ code, name }) => ({
    code,
    name,
  }));
};

export default {
  getDiagnosesEntries,
  getNonLatinDiagnosis,
};
