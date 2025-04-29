import { Container } from "./style";

type MenuProps = {
  title: string;
  icon: string;
  onClick?: () => void;
};

export function MenuItem({ title, icon, onClick }: MenuProps) {
  return (
    <Container>
      <i className="material-icons" onClick={onClick}>
        {icon}
      </i>
      <span>{title}</span>
    </Container>
  );
}
