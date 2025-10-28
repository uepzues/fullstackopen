import express from "express";
import cors from "cors";

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

import diagnosesRouter from "./src/routes/diagnoses";
import patientsRouter from "./src/routes/patients";

app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("pinging");
  res.send("pong");
});

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
