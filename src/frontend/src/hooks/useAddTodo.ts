import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../utils/api";

const addTodo = async (todo: Todo): Promise<void> => {
  await client.post<Todo>("/todo", todo);
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });
};
