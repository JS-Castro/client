import { Navigate, createBrowserRouter, useRouteError } from "react-router-dom";
import { postListRoute } from "../pages/PostList";
import { userListRoute } from "../pages/UserList";
import { todoListRoute } from "../pages/TodoList";
import { postRoute } from "../pages/Post";
import { userRoute } from "../pages/User";
import { RootLayout } from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/posts" />,
          },
          {
            path: "posts",
            children: [
              { index: true, ...postListRoute },
              { path: ":postId", ...postRoute },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, ...userListRoute },
              { path: ":userId", ...userRoute },
            ],
          },
          {
            path: "todos",
            ...todoListRoute,
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

function ErrorPage() {
  const error = useRouteError();
  console.log("error page from router" + error);

  return (
    <>
      <h1>Error - something went wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
