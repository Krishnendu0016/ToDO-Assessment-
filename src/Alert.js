import React, { useEffect } from "react";
import { useGlobalContext } from "./context";

// Alert component to display alert messages
const Alert = ({ msg }) => {
  // Destructure required values and functions from the global context
  const { tasks, refContainer, alert, showAlert } = useGlobalContext();

  useEffect(() => {
    // Update the position of the alert container based on the show status
    refContainer.current.style.left = `${alert.show ? "15px" : "-100%"}`;

    // Set a timeout to hide the alert after 4 seconds
    const timeout = setTimeout(() => {
      // Hide the alert by moving it off-screen
      refContainer.current.style.left = "-100%";
      // Reset the alert state to hide the alert message
      showAlert(false, alert.msg);
    }, 4000);

    // Clear the timeout if the component is unmounted or dependencies change
    return () => clearTimeout(timeout);
  }, [alert, refContainer, showAlert, tasks]); // Dependencies for useEffect

  // Render the alert message
  return (
    <p ref={refContainer} className='alert'>
      {msg}
    </p>
  );
};

export default Alert;
