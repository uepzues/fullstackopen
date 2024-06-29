function Course({ course }) {
  console.log(course);
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

function Header({ courseName }) {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
}

function Content({ parts }) {
  return (
    <div>
      <Part partsFromContent={parts} />
    </div>
  );
}

function Part({ partsFromContent }) {
  const p = partsFromContent.map((part) => {
    return (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    );
  });
  return <div>{p}</div>;
}

function Total({ parts }) {
  let exercises = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return (
    <div>
      <strong>Number of exercises {exercises}</strong>
    </div>
  );
}

export default Course;
