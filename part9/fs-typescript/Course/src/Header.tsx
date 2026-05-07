import { type HeaderProps } from "./types";

export const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>;
};

export default Header