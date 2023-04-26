import { useQuery } from "@tanstack/react-query";
import client from "../utils/api";

const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await client.get<Todo[]>("/todos");
  return data;
};

export const useFetchTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos
  });
};
