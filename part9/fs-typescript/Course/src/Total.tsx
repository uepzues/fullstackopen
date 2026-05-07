import { type ContentProps } from './types';

export const Total = ({ courseContent }: ContentProps) => {
  const totalExercises: number = courseContent.reduce(
    (sum, part): number => sum + part.exerciseCount,
    0,
  );

  return (
    <p>
      <strong>Number of exercises </strong> {totalExercises}
    </p>
  );
};

export default Total;
