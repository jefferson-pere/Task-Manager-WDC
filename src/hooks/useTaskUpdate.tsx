import { useMutation } from "@tanstack/react-query";
import { TaskDataTypes } from "../@types/tasks";
import { API } from "../configs/api";
import { toast } from "react-toastify";

async function updateTask(data: TaskDataTypes) {
  const { id, title, description, date, status } = data;
  return await API.put(`/task/${id}`, { title, description, date, status });
}
export const useTaskUpdate = () => {
  const mutate = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Tarefa atualizada com sucesso!");
    },

    onError: () => {
      toast.dismiss();
      toast.error("Erro ao atualizar tarefa");
    },
  });

  return mutate;
};
