import { Response } from "express";
import express from "express";
import { Diagnosis } from "../../types";
import diagnosesService from "../services/diagnosesService";
const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getDiagnosesEntries());
});

router.post("/", (_req, res) => {
  res.send("Diagnoses saved");
});

export default router;
