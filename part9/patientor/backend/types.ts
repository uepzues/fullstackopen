export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// export type NonLatinDiagnosis = Omit<Diagnosis, "latin">;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export type PatientNoSSN = Omit<Patient, "ssn">;
