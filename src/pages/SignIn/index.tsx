import { Link, useNavigate } from "react-router-dom";
import { Container } from "./style";
import logoReprogramaJucas from "../../assets/logo-reprograma-jucas.png";
import { FormLogin } from "../../components/FormLogin";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export function SignIn() {
  const navigate = useNavigate();
  const { isLoading } = useAuth();
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelay(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (delay) {
    return null;
  }

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
        <h2>Faça seu login</h2>

        <FormLogin />

        <div className="messageChangePage">
          <span>Não tem conta? </span>
          <button onClick={() => navigate("/sign-up")} disabled={isLoading}>
            Registre-se
          </button>
        </div>
      </div>
    </Container>
  );
}
