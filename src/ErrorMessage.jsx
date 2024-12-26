// import React from "react";
import PropTypes from "prop-types";

// Define the ErrorMessage component
export default function ErrorMessage({ message }) {
  if (!message) return null; // Don't render anything if no message is provided

  return (
    <p
      style={{
        color: "#e74c3c", // Example color scheme for error (redish tone)
        fontSize: "0.9em",
        backgroundColor: "white", // Light red background for better visibility
        border: "1px solid #E91E63",
        borderRadius: "4px",
        padding: "8px 12px",
        marginBottom: "10px",
        width: "300px",
        fontWeight: "bold",
      }}
    >
      {message}
    </p>
  );
}

// Define PropTypes for better developer experience
ErrorMessage.propTypes = {
  message: PropTypes.string,
};
