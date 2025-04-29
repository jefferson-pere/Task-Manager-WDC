import { useState } from "react";
import { Container } from "./style";
import { Link } from "react-router-dom";
import logoRJ from "../../assets/logo-rj.png";
import { SideBar } from "../SideBar";

export function Header() {
  const [showSideBar, setShowSideBar] = useState(false);

  function handleToggleSideBar() {
    setShowSideBar((prevValue) => (prevValue == true ? false : true));
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key == "Enter") {
      handleToggleSideBar();
    }
  }

  return (
    <Container>
      <i
        className="material-icons menuIcon"
        onClick={handleToggleSideBar}
        onKeyUp={handleKeyUp}
        tabIndex={0}
      >
        menu
      </i>

      <Link to={"/"} className="appLogo">
        <h1>Task Manager</h1>
        <img src={logoRJ} alt="logo reprograma jucas" />
      </Link>

      {showSideBar && <SideBar handleToggleSideBar={handleToggleSideBar} />}
    </Container>
  );
}
