import { Link, useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";

export function UserList() {
  const users = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map((user) => (
          <div className="card" key={user.id}>
            <div className="card-header">{user.name}</div>
            <div className="card-body">
              <div>Username: {user.username}</div>
              <div>Email: {user.email}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" to={user.id.toString()}>
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
  try {
    return await getUsers({ signal });
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export const userListRoute = {
  element: <UserList />,
  loader,
};
