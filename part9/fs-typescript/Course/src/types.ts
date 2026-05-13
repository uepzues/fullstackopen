export interface HeaderProps {
  name: string;
}

export type ContentProps = {
  courseContent: CoursePart[];
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface PartProps {
  part: CoursePart;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: 'basic';
}
interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartWithDescription extends CoursePartBase {
  description?: string;
}

interface CoursePartSpecial extends CoursePartWithDescription {
  name: string;
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
