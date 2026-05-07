export interface HeaderProps {
  name: string;
}

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export type ContentProps = {
  courseContent: CoursePart[];
};

 

