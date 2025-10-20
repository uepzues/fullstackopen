export default function calculateBMI(h: number, w: number): string {
  let range: string = "";
  const value: number = (w * 10000) / (h * h);

  if (value < 16.0) {
    range = "Severely Underweight";
  } else if (value >= 16.0 && value <= 18.4) {
    range = "Underweight";
  } else if (value > 18.4 && value <= 24.9) {
    range = "Normal";
  } else if (value > 24.9 && value <= 29.9) {
    range = "Overweight";
  } else if (value > 29.9 && value <= 34.9) {
    range = "Moderately Obese";
  } else if (value > 34.9 && value <= 39.9) {
    range = "Severely Obese";
  } else if (value > 39.9) {
    range = "Morbidly Obese";
  }

  return range + " range ";
  // + value.toFixed(2);
}

if (require.main === module) {
  try {
    console.log("from cli");
    const parseArgs = (args: string[]) => {
      if (args.length < 4) throw new Error("Not enough arguments");
      if (args.length > 4) throw new Error("Too many arguments");
      if (args.slice(2).filter((a) => isNaN(Number(a))).length > 0)
        throw new Error("Provide numbers only");
      const argument = process.argv.slice(2).map(Number);
      const heightInCm = argument[0];
      const weightInKg = argument[1];

      console.log(calculateBMI(heightInCm, weightInKg));
    };

    parseArgs(process.argv);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

// console.log(calculateBMI(190, 74));
