import axios from "axios";
import { useLoaderData } from "react-router-dom";

export function User() {
  const user = useLoaderData();

  const formatedAddress = () => {
    if (!user) return;

    return `${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipcode}`;
  };

  return (
    <div className="container">
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {formatedAddress()}
      </div>
    </div>
  );
}

export async function loader({ request: { signal }, params: { userId } }) {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/users/`, { signal });
    const users = response.data;

    return users.find((user) => user.id == userId);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export const userRoute = {
  element: <User />,
  loader,
};
