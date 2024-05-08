import PropTypes from "prop-types";

export default function FormGroup({ children, className, errorMessage }) {
  return (
    <div className={`form-group ${className ? className : ""} ${errorMessage ? "error" : ""}`}>
      {children}
      {errorMessage !== null && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

FormGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
};
