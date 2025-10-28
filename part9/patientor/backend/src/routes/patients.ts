import { Response } from "express";
import express from "express";
import patientService from "../services/patientService";
import { Patient, PatientNoSSN } from "../../types";

const patientRouter = express.Router();

patientRouter.get("/ssn", (_req, res: Response<Patient[]>) => {
  res.send(patientService.getPatients());
});

patientRouter.get("/", (_req, res: Response<PatientNoSSN[]>) => {
  res.send(patientService.getPatientNoSSN());
  //   res.send([
  //     {
  //       id: "1a",
  //       name: "kim",
  //       dateOfBirth: "1-2-3",
  //       gender: "male",
  //       occupation: "none",
  //     },
  //   ]);
});

export default patientRouter;
