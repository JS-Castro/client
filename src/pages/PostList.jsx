import { useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts";
import PostCard from "../components/PostCard";

function PostList() {
  const posts = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}

async function loader({ request: { signal } }) {
  try {
    return await getPosts({ signal });
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export const postListRoute = {
  element: <PostList />,
  loader,
};
