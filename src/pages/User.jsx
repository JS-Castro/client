import { Link, useLoaderData, useNavigation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { getUsers } from "../api/users";
import { getTodos } from "../api/todos";
import { getPosts } from "../api/posts";

export function User() {
  const { user, userTodos, userPosts } = useLoaderData();
  const { state } = useNavigation();
  const isLoading = state === "loading";

  if (isLoading) {
    return <LoadingSpinner size={60} />;
  }

  const formatedAddress = () => {
    if (!user) return;

    return `${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipcode}`;
  };

  return (
    <div className="container">
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {formatedAddress()}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {userPosts.map((post) => (
          <div key={post.id} className="card">
            <div className="card-header">{post.title}</div>
            <div className="card-body">
              <div className="card-preview-text">{post.body}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" to={`/posts/${post.id}`}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {userTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "strike-through" : ""}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function loader({ request: { signal }, params: { userId } }) {
  try {
    const users = await getUsers({ signal });
    const todos = await getTodos({ signal });
    const posts = await getPosts({ signal });

    const user = users.find((user) => user.id == userId);
    const userTodos = todos.filter((todo) => todo.userId === user.id);
    const userPosts = posts.filter((post) => post.userId === user.id);

    return { user, userTodos, userPosts };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export const userRoute = {
  element: <User />,
  loader,
};
