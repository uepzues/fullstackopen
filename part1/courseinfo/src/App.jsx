function Header({ course }) {
  console.log(course);
  return <h1>{course}</h1>;
}

function Content({ parts }) {
  return (
    <div>
      <Part partsFromContent={parts} />
    </div>
  );
}

function Part({ partsFromContent }) {
  const p = partsFromContent.map((part, i) => {
    return (
      <p key={i}>
        {part.name} {part.exercises}{" "}
      </p>
    );
  });

  return <div>{p}</div>;
}

function Total({ parts }) {
  let exercises = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return <div>Number of exercises {exercises}</div>;
}

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  

  return (
    <div>
      <Header course={course} />

      <Content parts={parts} />

      <Total parts={parts} />
    </div>
  );
};

export default App;
