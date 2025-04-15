import { ButtonStyleType, Container } from "./style";
import loadingGif from "../../assets/loading.gif";

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
    <Container type={type} variant={variant} onClick={onClick} disabled={loading}>
      {loading ? <img src={loadingGif} width={14} /> : title}
    </Container>
  );
}
