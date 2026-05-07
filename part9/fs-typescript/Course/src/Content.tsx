import { type ContentProps } from "./types";



export const Content = ({ courseContent }: ContentProps) => {
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

export default Content