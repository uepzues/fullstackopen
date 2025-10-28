import express from "express";

const app = express();

import diagnosesRouter from "./src/routes/diagnoses";

app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("pinging");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
