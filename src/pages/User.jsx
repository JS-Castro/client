import { useLoaderData } from "react-router-dom";
import { getUser } from "../api/users";
import { getTodosByUser } from "../api/todos";
import { getPostsByUser } from "../api/posts";
import PostCard from "../components/PostCard";
import TodoItem from "../components/TodoItem";

export function User() {
  const { user, userTodos, userPosts } = useLoaderData();

  const formatedAddress = () => {
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
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {userTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

async function loader({ request: { signal }, params: { userId } }) {
  try {
    const user = await getUser(userId, { signal });
    const userTodos = await getTodosByUser(userId, { signal });
    const userPosts = await getPostsByUser(userId, { signal });

    return { user, userTodos, userPosts };
  } catch (error) {
    console.error("Error fetching data:", error);

    return { user: null, userTodos: null, userPosts: null };
  }
}

export const userRoute = {
  element: <User />,
  loader,
};
