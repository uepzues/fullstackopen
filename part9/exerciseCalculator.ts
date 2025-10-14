interface ExerciseObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type RatingReturn = [number, string];

export default function calculateExercises(
  hoursPerDay: number[],
  target: number
): ExerciseObject {
  const periodLength = hoursPerDay.reduce((h, a) => {
    return h + a;
  }, 0);
  const trainingDays = hoursPerDay.filter((h) => h !== 0).length;
  const targetSuccess = periodLength >= target;
  const averageTrainingHours = periodLength / trainingDays;
  const rating = (averageTrainingHours: number): RatingReturn => {
    switch (true) {
      case averageTrainingHours >= 5:
        return [3, "Superb"];
      case averageTrainingHours >= 3 && averageTrainingHours < 5:
        return [2, "Great Job"];
      case averageTrainingHours >= 1 && averageTrainingHours < 3:
        return [1, "Needs More Hours"];
      default:
        return [0, "Just Do It"];
    }
  };

  const [score, desc] = rating(averageTrainingHours);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: targetSuccess,
    rating: score,
    ratingDescription: desc,
    target: target,
    average: averageTrainingHours,
  };
}


// const hoursPerDayArray: number[] = process.argv.slice(2, -1).map(Number)
// const target: number = Number(process.argv.slice(-1)[0])
// console.log(calculateExercises(hoursPerDayArray, target));
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
