import PropTypes from "prop-types";

export default function TodoItem({ id, completed, title }) {
  return (
    <li key={id} className={`${completed ? "strike-through" : ""}`}>
      {title}
    </li>
  );
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
