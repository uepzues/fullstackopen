export const parseArguments = (args) => {
    const array = args.slice(2).map((num) => {
        if (isNaN(Number(num))) {
            throw new Error('arguments cannot be string!');
        }
        return Number(num);
    });
    console.log('Array', array);
    return array;
};
export const array = parseArguments(process.argv);
