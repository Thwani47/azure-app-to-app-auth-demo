import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { useFetchTodos } from "./hooks/useFetchTodos";
import { useAddTodo } from "./hooks/useAddTodo";
import { useDeleteTodo } from "./hooks/useDeleteTodo";
import { useEditTodo } from "./hooks/useEditTodo";

function App() {
  const [title, setTitle] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedComplete, setSelectedComplete] = useState<boolean>(false);
  const {
    data: todos,
    isLoading: isFetchingTodos,
    isError,
    error
  } = useFetchTodos();
  const { mutate: addTodo } = useAddTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: editTodo } = useEditTodo();

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  };

  const handleSubmit = () => {
    if (title === "") {
      alert("Please enter a title");
      return;
    }

    if (selectedTodo) {
      editTodo({ id: selectedTodo.id, title, isComplete: selectedComplete });
      setSelectedTodo(null);
      setTitle("");
      setSelectedComplete(false);
    } else {
      const id = uuidv4();
      addTodo({ id, title, isComplete: false });
    }

    setTitle("");
  };

  return (
    <div className="flex flex-col">
      <div className="mx-auto max-sm:space-y-2 flex space-x-2 max-sm:flex max-sm:flex-col max-sm:mb-4">
        <input
          type="text"
          className="h-8 rounded p-2"
          placeholder="Enter todo title"
          value={title}
          onChange={handleChange}
        />

        <button
          className="ml-2 bg-blue-600 p-1 rounded h-8 w-24"
          onClick={handleSubmit}
        >
          {selectedTodo ? "Edit Todo" : "Add Todo"}
        </button>
        {selectedTodo ? (
          <button
            className="bg-red-500 p-1 rounded h-8 ml-2"
            onClick={() => {
              setSelectedTodo(null);
              setTitle("");
            }}
          >
            Cancel
          </button>
        ) : null}
      </div>
      {selectedTodo ? (
        <div className="mx-auto mt-2">
          <input
            id="checked-checkbox"
            type="checkbox"
            checked={selectedComplete}
            onChange={() => setSelectedComplete(!selectedComplete)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="checked-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Complete?
          </label>
        </div>
      ) : null}
      {selectedTodo ? (
        <h1 className="mx-auto mt-2 font-bold text-red-500 text-2xl">
          Editing Todo: '{selectedTodo.title}'
        </h1>
      ) : null}
      <h1 className="text-3xl font-bold mx-auto mb-4 mt-4">Todos</h1>
      <div className="mx-auto">
        {isFetchingTodos ? (
          <h1>Loading...</h1>
        ) : isError ? (
          <h1>Error occured: {JSON.stringify(error)}</h1>
        ) : todos.length === 0 ? (
          <h1>No todos found. Create a todo</h1>
        ) : (
          todos.map((todo: Todo) => (
            <div key={todo.id} className="flex space-x-2 mb-2 justify-between">
              <h1 className={`text-xl mr-5 ${todo.isComplete ? 'line-through' : ''}`}>{todo.title}</h1>
              <div className="space-x-3">
                <button
                  className="bg-red-500 p-1 rounded h-8"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-600 p-1 rounded h-8"
                  onClick={() => {
                    setTitle(todo.title);
                    setSelectedTodo(todo);
                    setSelectedComplete(todo.isComplete);
                  }}
                >
                  Edit Todo
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
