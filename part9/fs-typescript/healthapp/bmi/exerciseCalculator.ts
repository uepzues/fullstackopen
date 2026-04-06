interface Result { 
  periodLength: number,//7
  trainingDays: number, //5
  success: boolean, //false
  rating: number, //2
  ratingDescription: string, // 'not too bad but could be better',
  target: number, //2
  average: number, //1.9285714285714286
}

const calculateExercises = (arr: number[], target: number): Result=>{
    const ave = arr.reduce((acc, cur)=> acc + cur)/arr.length

    const getRating = (): [number, string] =>{
            if (target === ave){
                return [3, "You met the target! Hurray!"]
            } else if( ave < target && ave > target * .5){
                return [2, "Not too bad but could be better."]
            } else {
                return [1, "You should strive for more."]
            }
        }

    const result = {
        periodLength: arr.length,
        trainingDays: arr.filter(num=> num===0).length,
        success: ave >= target,
        rating: getRating()[0],
        ratingDescription: getRating()[1],
        target: target, 
        average: ave, 
    }

    return result
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))