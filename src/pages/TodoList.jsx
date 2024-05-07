import { useLoaderData } from "react-router-dom";
import { getTodos } from "../api/todos";

export function TodoList() {
  const todos = useLoaderData();

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
