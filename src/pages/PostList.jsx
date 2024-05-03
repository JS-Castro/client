import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";

function PostList() {
  const posts = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post) => (
          <div className="card" key={post.id}>
            <div className="card-header">{post.title}</div>
            <div className="card-body">
              <div className="card-preview-text">{post.body}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" to={`/posts/${post.id}`}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function loader({ request: { signal } }) {
  return axios.get("http://127.0.0.1:3000/posts", { signal }).then((res) => res.data);
}

export const postListRoute = {
  element: <PostList />,
  loader,
};
