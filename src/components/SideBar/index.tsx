import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "./style";
import { MenuItem } from "../MenuItem";

type SideBarProps = {
  handleToggleSideBar?: () => void;
};

export function SideBar({ handleToggleSideBar }: SideBarProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogoutApp() {
    const resp = confirm("Deseja realmente sair?");
    if (resp) {
      signOut();
      navigate("/");
    }
  }
  function handleCloseKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key == "Enter" && handleToggleSideBar) {
      handleToggleSideBar();
    }
  }
  function handleLogoutKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key == "Enter") {
      handleLogoutApp();
    }
  }
  return (
    <Container onClick={handleToggleSideBar}>
      <div className="asideMenu" onClick={handleToggleSideBar}>
        <i
          className="material-icons closeIcon"
          onClick={handleToggleSideBar}
          onKeyUp={handleCloseKeyUp}
          tabIndex={0}
        >
          close
        </i>
        <nav>
          <ul>
            <NavLink to={"/"} onClick={handleToggleSideBar}>
              <MenuItem title="Home" icon="home"></MenuItem>
            </NavLink>

            <NavLink to={"/tasks"} onClick={handleToggleSideBar}>
              <MenuItem title="Tarefas" icon="task"></MenuItem>
            </NavLink>

            <NavLink to={"/create-tasks"} onClick={handleToggleSideBar}>
              <MenuItem title="Adicionar" icon="add_circle"></MenuItem>
            </NavLink>

            <NavLink to={"/about"} onClick={handleToggleSideBar}>
              <MenuItem title="sobre" icon="info"></MenuItem>
            </NavLink>
            <div
              onClick={handleLogoutApp}
              onKeyUp={handleLogoutKeyUp}
              tabIndex={0}
            >
              <MenuItem title="Sair" icon="exit_to_app"></MenuItem>
            </div>
          </ul>
        </nav>
      </div>
    </Container>
  );
}
