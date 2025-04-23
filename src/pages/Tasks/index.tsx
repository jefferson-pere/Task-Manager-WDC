import { useState } from "react";
import { TaskCard } from "../../components/TaskCard";
import { useQueryTasks } from "../../hooks/useQueryTask";
import { Container } from "./style";
import { TaskDataTypes } from "../../@types/tasks";

export function Tasks() {
  const [showModalTaskDetails, setShowModalTaskDetails] = useState(false);

  const {
    data,
    isLoading,
    error,
    changeLimit,
    page,
    totalpage,
    prevPage,
    nextPage,
  } = useQueryTasks();

  function toggleModal() {
    setShowModalTaskDetails((prev) => (prev == true ? false : true));
  }
  function addTaskToggleModal(task: TaskDataTypes) {
    toggleModal();
  }
  return (
    <Container>
      <div className="headPageTasks">
        <h2>Tasks</h2>
      </div>
      {isLoading && <span className="loading">Carregando...</span>}

      {!isLoading && error && (
        <span className="queryError">Erro na consulta das tarefas!</span>
      )}

      <div className="taskContainer scrollBar">
        {data?.length === 0 ? (
          <p className="loading">Você ainda não possui tarefas</p>
        ) : (
          data?.map((task) => {
            return (
              <TaskCard
                key={task.id}
                data={task}
                onClick={() => addTaskToggleModal(task)}
              />
            );
          })
        )}
      </div>
    </Container>
  );
}
