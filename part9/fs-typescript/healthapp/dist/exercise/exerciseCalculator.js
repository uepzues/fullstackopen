import { parseArguments } from './utils/parseArgs.js';
export const calculateExercises = (target, args) => {
    // if (typeof target !== 'number' || isNaN(target)) {
    //   throw new Error('Target must be a number.');
    // }
    // if (!Array.isArray(args) || args.length === 0) {
    //   throw new Error('Please provide an array of daily exercise hours.');
    // }
    // if (args.some(val => typeof val !== 'number' || isNaN(val))) {
    //   throw new Error('All daily exercise values must be numbers.');
    // }
    const arr = args;
    const ave = arr.reduce((acc, cur) => acc + cur) / arr.length;
    const getRating = () => {
        if (target === ave) {
            return [3, 'You met the target! Hurray!'];
        }
        else if (ave < target && ave > target * 0.5) {
            return [2, 'Not too bad but could be better.'];
        }
        else {
            return [1, 'You should strive for more.'];
        }
    };
    const result = {
        periodLength: arr.length,
        trainingDays: arr.filter((num) => num !== 0).length,
        success: ave >= target,
        rating: getRating()[0],
        ratingDescription: getRating()[1],
        target: target,
        average: ave,
    };
    return result;
};
if (process.argv[1] === import.meta.filename) {
    try {
        const { target, dailyExercises } = parseArguments(process.argv);
        console.log(calculateExercises(target, dailyExercises));
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong.';
        console.error(errorMessage);
        process.exit(1);
    }
}
