const calculateBmi = (height: number, weight: number): string =>{
    const bmi = weight / (height/100)**2;
    switch(true){
        case bmi < 18.5:
            return 'Underweight range';
        case bmi >= 18.5 && bmi < 25:
            return 'Normal range';
        case bmi >= 25 && bmi < 30:
            return 'Overweight range';
        default:
            return 'Obese range';
    }
}

console.log(calculateBmi(180, 74))