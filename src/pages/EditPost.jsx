import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import PostForm, { postFormValidator } from "../components/PostForm";
import { deletePost, editPost, getPost } from "../api/posts";

export default function EditPost() {
  const { post, users } = useLoaderData();
  const errors = useActionData();

  return (
    <div className="container">
      <h1 className="page-title">Edit Post</h1>
      <PostForm users={users} post={post} errors={errors} isEditing action={action} />
    </div>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = getPost(postId, { signal });
  const users = getUsers({ signal });

  return { post: await post, users: await users };
}

async function action({ request, request: { signal }, params: { postId } }) {
  const formData = await request.formData();
  const userId = Number(formData.get("userId"));
  const title = formData.get("title");
  const body = formData.get("body");
  const action = formData.get("action");

  const errors = postFormValidator({ userId, title, body });

  if (Object.keys(errors).length > 0) return errors;

  switch (action) {
    case "edit":
      await editPost(postId, { userId, title, body }, { signal });
      return redirect(`/posts/${postId}`);
    case "delete":
      await deletePost(postId, { signal });
      return redirect("/posts");
    default:
      throw new Error(`This ${action} doesn't exist.`);
  }
}

export const editPostRoute = {
  element: <EditPost />,
  loader,
  action,
};
