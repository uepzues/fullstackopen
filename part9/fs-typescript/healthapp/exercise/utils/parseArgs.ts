

export interface ParsedExerciseArguments {
  target: number;
  dailyExercises: number[];
}

export const parseArguments = (args: string[]): ParsedExerciseArguments => {
  const values = args.slice(2);

  if (values.length < 2) {
    throw new Error('Please provide a target and at least one day of exercise hours.');
  }

  const numbers = values.map((value) => {
    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) {
      throw new Error('Provided values were not numbers.');
    }

    return parsedValue;
  });

  const [target, ...dailyExercises] = numbers;

  return {
    target,
    dailyExercises,
  };
};
