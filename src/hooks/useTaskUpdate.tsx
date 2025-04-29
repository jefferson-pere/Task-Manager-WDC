import { useMutation } from "@tanstack/react-query";
import { TaskDataTypes } from "../@types/tasks";
import { API } from "../configs/api";
import { toast } from "react-toastify";

async function updateTask(data: TaskDataTypes) {
  return await API.put(`/task/${data.id}`, data);
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
