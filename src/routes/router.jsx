import { Navigate, createBrowserRouter } from "react-router-dom";
import { postListRoute } from "../pages/PostList";
import { postRoute } from "../pages/Post";
import { UserList } from "../pages/UserList";
import { TodoList } from "../pages/TodoList";
import { RootLayout } from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/posts" /> },
      {
        path: "posts",
        children: [
          {
            index: true,
            ...postListRoute,
          },
          { path: ":postId", ...postRoute },
        ],
      },
      { path: "users", element: <UserList /> },
      { path: "todos", element: <TodoList /> },
    ],
  },
]);
