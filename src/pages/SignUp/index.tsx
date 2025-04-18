import { Container } from "./style";
import { FormSignUp } from "../../components/FormSignUp";
import logoReprogramaJucas from "../../assets/logo-reprograma-jucas.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function SignUp() {
  const navigate = useNavigate();
  const { isLoading } = useAuth();

  return (
    <Container>
      <div className="signInLogo">
        <div>
          <h1>Task Manager</h1>

          <Link to={""}>
            <img src={logoReprogramaJucas} alt="" />
          </Link>
        </div>
      </div>

      <div className="signInForm">
        <h2>Faça seu cadastro</h2>

        <FormSignUp />

        <div className="messageChangePage">
          <span>Já tem uma conta? </span>
          <button onClick={() => navigate("/")} disabled={isLoading}>
            Login
          </button>
        </div>
      </div>
    </Container>
  );
}
