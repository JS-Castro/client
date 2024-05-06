import axios from "axios";
import { useLoaderData, useNavigation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export function TodoList() {
  const todos = useLoaderData();
  const { state } = useNavigation();
  const isLoading = state === "loading";

  if (isLoading) {
    return <LoadingSpinner size={60} />;
  }

  return (
    <div className="container">
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={`${todo.completed ? "strike-through" : ""}`}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

async function loader({ request: { signal } }) {
  return axios
    .get("http://127.0.0.1:3000/todos", {
      signal,
    })
    .then((res) => res.data);
}

export const todoListRoute = {
  element: <TodoList />,
  loader,
};
