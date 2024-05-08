import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { createPost } from "../api/posts";
import PostForm, { postFormValidator } from "../components/PostForm";

export default function NewPost() {
  const users = useLoaderData();
  const errors = useActionData();

  return (
    <div className="container">
      <h1 className="page-title">New Post</h1>
      <PostForm users={users} errors={errors} />
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
  const userId = Number(formData.get("userId"));

  const errors = postFormValidator({ userId, title, body });

  if (Object.keys(errors).length > 0) return errors;

  const post = await createPost({ userId, title, body }, { signal });

  return redirect(`/posts/${post.id}`);
}

export const newPostRoute = {
  element: <NewPost />,
  loader,
  action,
};
