import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../utils/api";

const deleteTodo = async (id: string): Promise<void> => {
  await client.delete<Todo>(`/todo/${id}`);
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });
};
