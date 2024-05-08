import { Form, Link, useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts";
import PostCard from "../components/PostCard";
import { getUsers } from "../api/users";
import { useEffect, useRef } from "react";
import FormGroup from "../components/FormGroup";

function PostList() {
  const {
    searchParams: { query, userId },
    posts,
    users,
  } = useLoaderData();
  const queryRef = useRef();
  const userIdRef = useRef();

  useEffect(() => {
    queryRef.current.value = query || "";
    userIdRef.current.value = userId || "";
  }, [query, userId]);

  return (
    <div className="container">
      <h1 className="page-title">
        Posts
        <Link className="btn title-btns" to="new">
          New Post
        </Link>
      </h1>
      <Form className="form mb-4">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </FormGroup>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId" ref={userIdRef}>
              <option value="">Any</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query");
  const userId = searchParams.get("userId");

  const filterParams = {};
  if (query !== "") filterParams.q = query;
  if (userId !== "") filterParams.userId = userId;

  const posts = getPosts({ signal, params: filterParams });
  const users = getUsers({ signal });

  return {
    posts: await posts,
    users: await users,
    searchParams: { query, userId },
  };
}

export const postListRoute = {
  element: <PostList />,
  loader,
};
