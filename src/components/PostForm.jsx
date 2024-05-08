import PropTypes from "prop-types";
import { Form, Link, useNavigation } from "react-router-dom";
import FormGroup from "./FormGroup";

export default function PostForm({ users, post = {}, errors = {}, isEditing }) {
  const user = users.find((user) => user.id === post.userId);
  const { state } = useNavigation();
  const isSubmitting = state === "submitting" || state === "loading";

  return (
    <Form className="form" method="POST">
      <div className="form-row">
        <FormGroup errorMessage={errors.title}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" defaultValue={post.title} />
        </FormGroup>
        <FormGroup errorMessage={errors.userId}>
          <label htmlFor="userId">Author</label>
          {isEditing ? (
            <>
              <input type="hidden" name="userId" value={post.userId} />
              <span>{user.name}</span>
            </>
          ) : (
            <select name="userId" id="userId" disabled={isEditing}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          )}
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={errors.body}>
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" defaultValue={post.body} />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="..">
          Cancel
        </Link>
        <button disabled={isSubmitting} className="btn">
          {isSubmitting ? "Saving" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export function postFormValidator({ title, body, userId }) {
  const errors = {};

  if (title === "") errors.title = "Required";
  if (body === "") errors.body = "Required";
  if (userId === "") errors.userId = "Required";

  return errors;
}

PostForm.propTypes = {
  users: PropTypes.array.isRequired,
  post: PropTypes.object,
  isEditing: PropTypes.bool,
  errors: PropTypes.object,
};
