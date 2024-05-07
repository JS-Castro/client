import { Link, useLoaderData } from "react-router-dom";
import { getPost } from "../api/posts";
import { getUser } from "../api/users";
import { getComments } from "../api/comments";

export function Post() {
  const { post, user, comments } = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${post.userId}`}>{user.name}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => (
          <div key={comment.id} className="card">
            <div className="card-body">
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  try {
    const post = await getPost(postId, { signal });
    const comments = getComments(postId, { signal });
    const user = getUser(post.userId);

    return { post, user: await user, comments: await comments };
  } catch (error) {
    console.error("Error fetching data:", error);

    return { post: null, postAuthor: null, postComments: null };
  }
}

export const postRoute = {
  element: <Post />,
  loader,
};
