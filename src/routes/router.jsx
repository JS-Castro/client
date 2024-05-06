import { Navigate, createBrowserRouter } from "react-router-dom";
import { postListRoute } from "../pages/PostList";
import { userListRoute } from "../pages/UserList";
import { postRoute } from "../pages/Post";
import { userRoute } from "../pages/User";
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
      {
        path: "users",
        children: [
          {
            index: true,
            ...userListRoute,
          },
          { path: ":userId", ...userRoute },
        ],
      },
      { path: "todos", element: <TodoList /> },
    ],
  },
]);
