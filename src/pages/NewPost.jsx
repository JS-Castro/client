import { redirect, useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { createPost } from "../api/posts";
import PostForm from "../components/PostForm";

export default function NewPost() {
  const users = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">New Post</h1>
      <PostForm users={users} />
    </div>
  );
}

async function loader({ request: { signal } }) {
  return await getUsers({ signal });
}

async function action({ request, request: { signal } }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const userId = formData.get("userId");

  const post = await createPost({ title, body, userId }, { signal });

  return redirect(`/posts/${post.id}`);
}

export const newPostRoute = {
  element: <NewPost />,
  loader,
  action,
};
