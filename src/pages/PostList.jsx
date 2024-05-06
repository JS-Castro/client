import axios from "axios";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function PostList() {
  const posts = useLoaderData();
  const { state } = useNavigation();
  const isLoading = state === "loading";

  if (isLoading) {
    return <LoadingSpinner size={60} />;
  }

  if (!posts || posts.length === 0) {
    return <div>No posts found</div>;
  }

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
