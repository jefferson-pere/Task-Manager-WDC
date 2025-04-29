import { createContext, ReactNode, useState } from "react";
import { API } from "../configs/api";
import { TaskDataTypes } from "../@types/tasks";
import { toast } from "react-toastify";

interface TaskContextProps {
  taskData: TaskDataTypes;
  setTaskData: (task: TaskDataTypes) => void;
  deleteTask: (id: string) => Promise<boolean | void>;
  isLoading: boolean;
}

export const TaskContext = createContext({} as TaskContextProps);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [taskData, setTaskData] = useState({} as TaskDataTypes);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteTask(id: string) {
    setIsLoading(true);

    return API.delete(`/task/${id}`)
      .then(() => {
        toast.dismiss();
        toast.success("Tarefa removida com sucesso!");
        return true;
      })
      .catch((error) => {
        console.error(error);
        toast.dismiss();
        toast.error("Erro ao remover tarefa");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <TaskContext.Provider
      value={{ taskData, setTaskData, deleteTask, isLoading }}
    >
      {children}
    </TaskContext.Provider>
  );
}
