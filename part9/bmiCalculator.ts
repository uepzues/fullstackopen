export function calculateBMI(h: number, w: number): string {
  let range: string = "";
  const value: number = (w * 10000) / (h * h);

  if (value < 16.0) {
    range = "Severely Underweight";
  } else if (value >= 16.0 && value <= 18.4) {
    range = "Underweight";
  } else if (value >= 18.5 && value <= 24.9) {
    range = "Normal";
  } else if (value >= 25.0 && value <= 29.9) {
    range = "Overweight";
  } else if (value >= 30.0 && value <= 34.9) {
    range = "Moderately Obese";
  } else if (value >= 35.0 && value <= 39.9) {
    range = "Severely Obese";
  } else if (value > 40.0) {
    range = "Morbidly Obese";
  }

  return range + " range " 
//   + value.toFixed(2);
}

console.log(calculateBMI(190, 74));
