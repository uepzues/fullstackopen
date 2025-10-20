import express from "express";
import calculateBMI from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

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
      error: "internal server error",
    });
  }
});

app.post("/exercises", (req, res) => {
  interface ExerciseData {
    daily_exercises: number[];
    target: number;
  }

  try {
    const { daily_exercises, target } = req.body as ExerciseData;

    if (!daily_exercises || !target) {
      return res.status(400).json({ error: "parameters missing" });
    }

    if (!Array.isArray(daily_exercises) || daily_exercises.length !== 7) {
      return res.status(400).json({
        error:
          "malformatted parameters: daily_exercises should be an array of 7 numbers",
      });
    }

    if (daily_exercises.some((hours) => isNaN(Number(hours)))) {
      return res.status(400).json({
        error: "malformatted parameters: all exercise hours must be numbers",
      });
    }

    if (isNaN(Number(target))) {
      return res
        .status(400)
        .json({ error: "malformatted parameters: target must be a number" });
    }

    const result = calculateExercises(daily_exercises, target);
    return res.json(result);
  } catch (error: unknown) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
