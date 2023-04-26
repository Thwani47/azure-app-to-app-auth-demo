import "./App.css";
import { useFetchTodos } from "./hooks/useFetchTodos";

function App() {
  const { data: todos, isLoading, isError, error } = useFetchTodos();

  return (
    <div className="flex flex-col">
      <div className="mx-auto max-sm:space-y-2 max-sm:flex max-sm:flex-col max-sm:mb-4">
        <input
          type="text"
          className="h-8 rounded p-2"
          placeholder="Enter todo title "
        />
        <button className="ml-2 bg-blue-600 p-1 rounded h-8 w-24">
          Add Todo{" "}
        </button>
      </div>
      <h1 className="text-3xl font-bold mx-auto mb-2 mt-2">Todos</h1>
      <div className="mx-auto">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : isError ? (
          <h1>Error occured: {JSON.stringify(error)}</h1>
        ) : todos.length === 0 ? (
          <h1>No todos found. Create a todo</h1>
        ) : (
          todos.map((todo: Todo) => <div key={todo.id}>Todo</div>)
        )}
      </div>
    </div>
  );
}

export default App;
