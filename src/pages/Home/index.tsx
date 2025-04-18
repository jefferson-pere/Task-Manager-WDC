import { NavLink } from "react-router-dom";
import { Container } from "./style";
import { StatsCard } from "../../components/StatsCard";
import { useQueryUser } from "../../hooks/useQueryUser";

export function Home() {
  const { data } = useQueryUser();

  return (
    <Container>
      <h2>Tarefas</h2>
      <div className="statsContainer">
        <NavLink to="/tasks">
          <StatsCard
            title="Concluídas"
            icon="task_alt"
            variant="completed"
            number={data?.tasksInfo.completed}
            total={data?.tasksInfo.total}
          />
        </NavLink>

        <NavLink to="/tasks">
          <StatsCard
            title="Pendentes"
            icon="pending_actions"
            variant="pending"
            number={data?.tasksInfo.pending}
            total={data?.tasksInfo.total}
          />
        </NavLink>

        <NavLink to="/tasks">
          <StatsCard
            title="Atrasadas"
            icon="event_busy"
            variant="late"
            number={data?.tasksInfo.late}
            total={data?.tasksInfo.total}
          />
        </NavLink>

        <NavLink to="/tasks">
          <StatsCard
            title="Total"
            icon="query_stats"
            variant="neutral"
            number={data?.tasksInfo.total}
          />
        </NavLink>
      </div>
    </Container>
  );
}
