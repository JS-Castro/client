import { Link, useLoaderData } from "react-router-dom";
import { getPost, getPostComments } from "../api/posts";
import { getUser } from "../api/users";

export function Post() {
  const { post, postAuthor, postComments } = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${post.userId}`}>{postAuthor.username}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {postComments.map((comment) => (
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

export async function loader({ request: { signal }, params: { postId } }) {
  try {
    const post = await getPost(postId, { signal });
    const postComments = await getPostComments(post.id, { signal });
    const postAuthor = await getUser(post.userId);

    return { post, postAuthor, postComments };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { post: null, postAuthor: null, postComments: null };
  }
}

export const postRoute = {
  element: <Post />,
  loader,
};
