import { FormMutationTask } from "../../components/FormMutationTask";
import { Container } from "./style";

export function CreateTasks() {
  return (
    <Container>
      <h1>Create Tasks</h1>
      <div className="formContainer">
        <FormMutationTask />
      </div>
    </Container>
  );
}
