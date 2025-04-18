import { TaskCard } from "../../components/TaskCard";
import { Container } from "./style";

export function Tasks() {
  return (
    <Container>
      <h2>Tasks</h2>
      <div className="taskContainer">
        <TaskCard
          data={{
            id: "1",
            title: "Task 1",
            description: "Description 1",
            date: "2025-01-01",
            status: "pending",
          }}
          onClick={() => {}}
        />
      </div>
    </Container>
  );
}
