import { useContext } from "react";
import { TaskContext } from "../contexts/taskContext";

export function useTask() {
  return useContext(TaskContext);
}
