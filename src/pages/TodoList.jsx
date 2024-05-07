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
  try {
    return await getTodos({ signal });
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export const todoListRoute = {
  element: <TodoList />,
  loader,
};
