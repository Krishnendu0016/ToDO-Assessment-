import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import global CSS styles
import App from "./App"; // Import the main App component
import { AppProvider } from "./context"; // Import the context provider

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap the App component with AppProvider to provide context */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root") // Render the App component inside the root element
);
