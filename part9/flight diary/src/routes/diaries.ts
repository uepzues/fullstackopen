import { Response } from "express";
import { NonSensitiveDiaryEntry, DiaryEntry } from "../../types";
import express from "express";
import diaryServices from "../services/diaryServices";

const router = express.Router();

router.get("/", (_req, res: Response<DiaryEntry[]>) => {
  // res.send(diaryServices.getNonSensitiveEntries());
  res.send({
    data: "stuff",
  });
});

router.post("/", (_req, res) => {
  res.send("Saving diary!");
});

export default router;
