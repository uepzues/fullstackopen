import { z } from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

const BaseEntry = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntry = BaseEntry.extend({
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating,
});

const OccupationalHealthcareEntry = BaseEntry.extend({
  type: 'OccupationalHealthcare',
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

const HospitalEntry = BaseEntry.extend({
  type: 'Hospital',
  discharge: z
    .object({
      date: z.string(),
      criteria: z.string(),
    })
    .optional(),
});

export const Entry = z.discriminatedUnion('type', [
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
]);

export const NewPatientEntry = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().optional(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(Entry),
});

export interface Patient extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof NewPatientEntry>;

export type Entry = z.infer<typeof Entry>;

