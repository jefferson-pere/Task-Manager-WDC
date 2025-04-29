import { Link, useNavigate } from "react-router-dom";
import { Container } from "./style";
import logoReprogramaJucas from "../../assets/logo-rj.png";
import { FormSignUp } from "../../components/FormSignUp";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export function SignUp() {
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
      <div className="signUpForm">
        <h2>Crie sua conta</h2>

        <FormSignUp />

        <div className="messageChangePage">
          <span>Já tem uma conta? </span>
          <button onClick={() => navigate("/")} disabled={isLoading}>
            Login
          </button>
        </div>
      </div>

      <div className="signUpLogo">
        <div>
          <Link to={""}>
            <img src={logoReprogramaJucas} alt="" />
          </Link>
        </div>
      </div>
    </Container>
  );
}
