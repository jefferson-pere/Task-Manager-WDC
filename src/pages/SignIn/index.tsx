import { Link, useNavigate } from "react-router-dom";
import { Container } from "./style";
import logoReprogramaJucas from "../../assets/logo-reprograma-jucas.png";
import { FormLogin } from "../../components/FormLogin";
import { useEffect, useState } from "react";
import { STORAGE_USERID_KEY } from "../../utils/userIdAuthKey";
import { useAuth } from "../../hooks/useAuth";

export function SignIn() {
  const navigate = useNavigate();
  const [delay, setDelay] = useState(true);
  const { isLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelay(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const authUserIDStorage = localStorage.getItem(STORAGE_USERID_KEY);

  if (delay && authUserIDStorage) {
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
