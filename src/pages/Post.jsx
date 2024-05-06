import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";

export function Post() {
  const { post, postAuthor, postComments } = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${post.userId}`}>{postAuthor.name}</Link>
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
    const posts = await axios.get(`http://127.0.0.1:3000/posts/`, { signal }).then((res) => res.data);
    const comments = await axios.get(`http://127.0.0.1:3000/comments/`, { signal }).then((res) => res.data);
    const users = await axios.get(`http://127.0.0.1:3000/users/`, { signal }).then((res) => res.data);

    const post = posts.find((post) => post.id == postId);
    const postAuthor = users.find((user) => user.id === post.userId);
    const postComments = comments.filter((comment) => comment.postId === post.id);

    return { post, postAuthor, postComments };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export const postRoute = {
  element: <Post />,
  loader,
};
