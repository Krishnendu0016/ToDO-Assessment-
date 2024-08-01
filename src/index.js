import React from "react";          // Import React library
import ReactDOM from "react-dom";   // Import ReactDOM for rendering
import "./index.css";              // Import global CSS styles
import App from "./App";            // Import the main App component
import { AppProvider } from "./context";  // Import context provider for global state

// Render the application
ReactDOM.render(
  <React.StrictMode>   {/* Enables additional checks and warnings for React components */}
    <AppProvider>      {/* Provides global state to the App component */}
      <App />         {/* Main application component */}
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root") 
);
