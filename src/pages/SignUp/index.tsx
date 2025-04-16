import { Link, useNavigate } from "react-router-dom";
import { Container } from "./style";
import logoReprogramaJucas from "../../assets/logo-reprograma-jucas.png";
import { FormSignUp } from "../../components/FormSignUp";
// import { useEffect, useState } from "react";

export function SignUp() {
  const navigate = useNavigate();
  // const [delay, setDelay] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDelay(false);
  //   }, 300);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (delay) {
  //   return null;
  // }

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

        <FormSignUp />

        <div className="messageChangePage">
          <span>Já tem uma conta? </span>
          <button onClick={() => navigate("/")} disabled={false}>
            Login
          </button>
        </div>
      </div>
    </Container>
  );
}
