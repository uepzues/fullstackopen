import express from "express";
import calculateBMI from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  try {
    const heightVal = Number(height);
    const weightVal = Number(weight);

    if (isNaN(heightVal) || isNaN(weightVal)) {
      throw Error("parameters should be numbers");
    }

    const bmi: string = calculateBMI(heightVal, weightVal);

    return res.json({
      weight: weightVal,
      height: heightVal,
      bmi: bmi,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: "malformatted parameters",
      });
    }
    return res.status(500).json({
      error: "internal server error"
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
