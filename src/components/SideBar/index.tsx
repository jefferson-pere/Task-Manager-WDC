import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "./style";
import { MenuItem } from "../MenuItem";
import { useQueryUser } from "../../hooks/useQueryUser";

type SideBarProps = {
  handleToggleSideBar?: () => void;
};

export function SideBar({ handleToggleSideBar }: SideBarProps) {
  const { data } = useQueryUser();
  const userName = data?.name;

  const { signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogoutApp() {
    const resp = confirm("Deseja sair da aplicação?");

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
            <h1>Olá, {userName}</h1>
            <NavLink to={"/"} onClick={handleToggleSideBar}>
              <MenuItem title="Home" icon="home" />
            </NavLink>

            <NavLink to={"/tasks?filter=all&page=1"} onClick={handleToggleSideBar}>
              <MenuItem title="Tarefas" icon="task" />
            </NavLink>

            <NavLink to={"/create-tasks"} onClick={handleToggleSideBar}>
              <MenuItem title="Adicionar" icon="add_circle" />
            </NavLink>

            <NavLink to={"/about"} onClick={handleToggleSideBar}>
              <MenuItem title="Sobre" icon="info" />
            </NavLink>

            <div
              onClick={handleLogoutApp}
              onKeyUp={handleLogoutKeyUp}
              tabIndex={0}
            >
              <MenuItem title="Sair" icon="exit_to_app" />
            </div>
          </ul>
        </nav>
      </div>
    </Container>
  );
}
