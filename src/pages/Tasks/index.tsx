import { useState } from "react";
import { TaskCard } from "../../components/TaskCard";
import { useQueryTasks } from "../../hooks/useQueryTask";
import { Container } from "./style";
import { TaskDataTypes } from "../../@types/tasks";
import { Pagination } from "../../components/Pagination";
import { ModalTaskDetails } from "../../components/ModalTaskDetails";
import { useTask } from "../../hooks/useTask";

export function Tasks() {
  const [showModalTaskDetails, setShowModalTaskDetails] = useState(false);

  const { setTaskData } = useTask();

  const {
    data,
    isLoading,
    error,
    changeLimit,
    page,
    totalPages,
    prevPage,
    nextPage,
  } = useQueryTasks();

  function toggleModal() {
    setShowModalTaskDetails((prev) => (prev == true ? false : true));
  }

  function addTaskToggleModal(task: TaskDataTypes) {
    toggleModal();
    setTaskData(task);
  }
  return (
    <Container>
      <div className="headPageTasks">
        <h2>Lista</h2>

        <div className="paginationDesktop">
          <Pagination
            page={page}
            step={5}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            changeLimit={changeLimit}
          />
        </div>
      </div>

      {isLoading && <span className="loading">Carregando...</span>}

      {!isLoading && error && (
        <span className="queryError">Erro na requisição das tarefas!</span>
      )}

      <div className="tasksContainer scrollBar">
        {data?.length == 0 ? (
          <p className="loading">Sem tarefas para mostrar</p>
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

      <div className="paginationMobile">
        <Pagination
          page={page}
          step={5}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          changeLimit={changeLimit}
        />
      </div>

      {showModalTaskDetails && <ModalTaskDetails toggleModal={toggleModal} />}
    </Container>
  );
}
