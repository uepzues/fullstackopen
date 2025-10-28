import patientData from "../../data/patientsEntry";
import { Patient, PatientNoSSN } from "../../types";

const getPatients = (): Patient[] => {
  return patientData;
};

const getPatientNoSSN = (): PatientNoSSN[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name, 
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients,
  getPatientNoSSN,
};
