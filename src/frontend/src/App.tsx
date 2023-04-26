import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { useFetchTodos } from "./hooks/useFetchTodos";
import { useAddTodo } from "./hooks/useAddTodo";

function App() {
  const [title, setTitle] = useState("");
  const { data: todos, isLoading : isFetchingTodos, isError, error } = useFetchTodos();
  const  {mutate} = useAddTodo()

  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };


  const handleSubmit = () => {
    if (title === ''){
      alert('Please enter a title')
      return;
    }

    const id = uuidv4();
    mutate({id, title, isComplete: false})
    setTitle('')
  };

  return (
    <div className="flex flex-col">
      <div className="mx-auto max-sm:space-y-2 max-sm:flex max-sm:flex-col max-sm:mb-4">
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
          Add Todo{" "}
        </button>
      </div>
      <h1 className="text-3xl font-bold mx-auto mb-4 mt-2">Todos</h1>
      <div className="mx-auto">
        {isFetchingTodos ? (
          <h1>Loading...</h1>
        ) : isError ? (
          <h1>Error occured: {JSON.stringify(error)}</h1>
        ) : todos.length === 0 ? (
          <h1>No todos found. Create a todo</h1>
        ) : (
          todos.map((todo: Todo) => <div key={todo.id} className="flex space-x-2 mb-2 justify-between">
            <h1 className="text-xl">{todo.title}</h1>
            <button className="bg-red-500 p-1 rounded h-8 ">Delete</button>
          </div>)
        )}
      </div>
    </div>
  );
}

export default App;
