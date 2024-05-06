import { useLoaderData, useNavigation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { getTodos } from "../api/todos";

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
  return getTodos({ signal });
}

export const todoListRoute = {
  element: <TodoList />,
  loader,
};
