import { useLoaderData } from "react-router-dom";
import { getTodos } from "../api/todos";
import TodoItem from "../components/TodoItem";

export function TodoList() {
  const todos = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
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
