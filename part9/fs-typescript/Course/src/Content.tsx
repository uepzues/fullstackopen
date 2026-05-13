import { type ContentProps } from './types';
import Part from './Part';

export const Content =({courseContent}: ContentProps)=>{
  return (
    <div>
      {courseContent.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

export default Content;
