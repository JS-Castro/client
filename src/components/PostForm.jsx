import PropTypes from "prop-types";
import { Form, Link } from "react-router-dom";
import FormGroup from "./FormGroup";

export default function PostForm({ users, post = {}, isEditing }) {
  const user = users.find((user) => user.id === post.userId);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }

  return (
    <Form className="form" method="POST" onSubmit={handleSubmit}>
      <div className="form-row">
        <FormGroup className="error">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" defaultValue={post.title} />
          <div className="error-message">Required</div>
        </FormGroup>
        <FormGroup>
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
        <FormGroup>
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" defaultValue={post.body} />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="..">
          Cancel
        </Link>
        <button className="btn">Save</button>
      </div>
    </Form>
  );
}

PostForm.propTypes = {
  users: PropTypes.array.isRequired,
  post: PropTypes.object,
  isEditing: PropTypes.bool,
};
