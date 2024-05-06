import { Link, useLoaderData, useNavigation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { getUsers } from "../api/users";

export function UserList() {
  const users = useLoaderData();
  const { state } = useNavigation();
  const isLoading = state === "loading";

  if (isLoading) {
    return <LoadingSpinner size={60} />;
  }

  if (!users) {
    return <div>Error fetching Users</div>;
  }

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
  return getUsers({ signal });
}

export const userListRoute = {
  element: <UserList />,
  loader,
};
