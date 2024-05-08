import PropTypes from "prop-types";

export default function FormGroup({ children, className }) {
  return <div className={`form-group ${className ? className : ""}`}>{children}</div>;
}

FormGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
  className: PropTypes.string,
};
