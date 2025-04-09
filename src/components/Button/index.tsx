import { ButtonStyleType, Container } from "./style";
import loadsingGif from "../../assets/loading.gif";

type ButtonTypes = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  variant?: ButtonStyleType;
  onClick?: () => void;
  loading?: boolean;
};

export function Button({
  title,
  variant = "PRIMARY700",
  type = "submit",
  onClick,
  loading = false,
}: ButtonTypes) {
  return (
    <Container
      onClick={onClick}
      type={type}
      variant={variant}
      disabled={loading}
    >
      {loading ? <img src={loadsingGif} width={14} /> : title}
    </Container>
  );
}
