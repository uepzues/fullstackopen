export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// export type NonLatinDiagnosis = Omit<Diagnosis, "latin">;

