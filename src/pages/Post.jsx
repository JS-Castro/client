import axios from "axios";
import { useLoaderData } from "react-router-dom";

export function Post() {
  const post = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: <a href="user.html">Leanne Graham</a> {/* !!TODO: needs to be dinamic */}
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        <div className="card">
          <div className="card-body">
            <div className="text-sm mb-1">Eliseo@gardner.biz</div> {/* !!TODO: needs to be dinamic */}
            laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente
            accusantium
          </div>{" "}
          {/* !!TODO: needs to be dinamic */}
        </div>
      </div>
    </div>
  );
}

export async function loader({ request: { signal }, params: { postId } }) {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/posts/`, { signal });
    const posts = response.data;

    return posts.find((post) => post.id == postId);
  } catch (error) {
    console.error("Error fetching post:", error);
    return null; // Return null in case of error
  }
}

export const postRoute = {
  element: <Post />,
  loader,
};
