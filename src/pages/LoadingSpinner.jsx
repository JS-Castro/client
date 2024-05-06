import PropTypes from "prop-types";
import { MetroSpinner } from "react-spinners-kit";

export default function LoadingSpinner({ size }) {
  return (
    <div className="spinner">
      <MetroSpinner size={size} color="black" />
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.number.isRequired,
};
