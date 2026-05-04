interface HeaderProps {
  name: string;
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

type ContentProps = {
  courseContent: CoursePart[];
};

type ExerciseProps = {
  totalExercises: number;
};

const App = () => {
  const courseName = 'Half Stack application development';

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseContent={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>;
};

const Content = ({ courseContent }: ContentProps) => {
  return (
    <div>
      {courseContent.map((part, idx) => (
        <p key={idx}>
          <strong>{part.name}</strong> {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

const Total = ({ totalExercises }: ExerciseProps) => {
  return (
    <p>
      <strong>Number of exercises </strong> {totalExercises}
    </p>
  );
};

export default App;
