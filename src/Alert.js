import React, { useEffect } from "react";
import { useGlobalContext } from "./context";

const Alert = ({ msg }) => {
  // Destructure the context values from useGlobalContext
  const { tasks, refContainer, alert, showAlert } = useGlobalContext();

  useEffect(() => {
    // Update the position of the alert based on its visibility
    refContainer.current.style.left = `${alert.show ? "15px" : "-100%"}`;

    // Set up a timeout to hide the alert after 4 seconds
    const timeout = setTimeout(() => {
      refContainer.current.style.left = "-100%";
      showAlert(false, alert.msg); // Hide the alert and reset the message
    }, 4000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, [alert, refContainer, showAlert, tasks]); // Dependencies: alert, refContainer, showAlert, tasks

  return (
    <p ref={refContainer} className='alert'>
      {msg} {/* Display the alert message */}
    </p>
  );
};

export default Alert;
