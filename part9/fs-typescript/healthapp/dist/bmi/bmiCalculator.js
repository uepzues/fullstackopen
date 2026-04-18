const calculateBmi = (height, weight) => {
    if (!height || !weight) {
        console.log('please enter height and weight');
        throw new Error('malformatted parameters');
    }
    const h = Number(height);
    const w = Number(weight);
    if (isNaN(h) || isNaN(w)) {
        console.error('make sure height and weight are numbers');
        throw new Error('malformatted parameters');
    }
    const bmi = w / (h / 100) ** 2;
    let rating;
    switch (true) {
        case bmi < 18.5:
            rating = 'Underweight range';
            break;
        case bmi >= 18.5 && bmi < 25:
            rating = 'Normal range';
            break;
        case bmi >= 25 && bmi < 30:
            rating = 'Overweight range';
            break;
        default:
            rating = 'Obese range';
    }
    return {
        weight: w,
        height: h,
        bmi: rating,
    };
};
// console.log(calculateBmi(180, 74))
const isMainModule = import.meta.filename === process.argv[1];
// console.log('meta', import.meta.filename)
// console.log('argv', process.argv[1])
if (isMainModule) {
    const [, , height, weight] = process.argv;
    if (!height || !weight) {
        console.error('Please input height and weight.');
        process.exit(1);
    }
    try {
        console.log(calculateBmi(height, weight));
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
export default calculateBmi;
