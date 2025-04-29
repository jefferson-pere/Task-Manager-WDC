import { useEffect } from "react";
import { Container } from "./style";
import { FormMutationTask } from "../FormMutationTask";

type ModalTaskDetailsProps = {
  toggleModal: () => void;
};

export function ModalTaskDetails({ toggleModal }: ModalTaskDetailsProps) {
  function handleKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key == "Enter") {
      toggleModal();
    }
  }
  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent) {
      if (event.key == "Escape") {
        toggleModal();
      }
    }
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [toggleModal]);

  return (
    <Container onClick={toggleModal}>
      <div className="handleTaskContainer" onClick={toggleModal}>
        <div className="formContainer">
          <div className="headerForm">
            <h2>Detalhes da tarefa</h2>

            <i
              className="material-icons"
              onClick={toggleModal}
              tabIndex={0}
              onKeyUp={handleKeyUp}
            >
              close
            </i>
          </div>

          <FormMutationTask isUpdate={true} toggleModal={toggleModal} />
        </div>
      </div>
    </Container>
  );
}
