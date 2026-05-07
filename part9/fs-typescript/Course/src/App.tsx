import Header from './Header';
import Total from './Total';
import Content from './Content';
import { type CoursePart } from './types';

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

const App = () => {
  return (
    <div>
      <Header name={courseName} />
      <Content courseContent={courseParts} />
      <Total courseContent={courseParts} />
    </div>
  );
};

export default App;
