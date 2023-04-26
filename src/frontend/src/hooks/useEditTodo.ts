import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../utils/api";

const editTodo = async (todo: Todo): Promise<void> => {
  await client.put<Todo>(`/todo/${todo.id}`, todo);
};

export const useEditTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });
};
