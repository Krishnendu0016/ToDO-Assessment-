import React, { useState, useContext, useRef } from "react";

// Function to get tasks from local storage or return an empty array if none found
const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

// Create a React context with a default value of null
const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  // Refs for managing focus and positioning
  const inputRef = useRef(null);
  const refContainer = useRef(null);

  // State hooks
  const [tasks, setTasks] = useState(getTasks()); // State to hold tasks
  const [alert, setAlert] = useState({ show: false, msg: "" }); // State for alerts
  const [isEditing, setIsEditing] = useState(false); // State for editing mode
  const [editId, setEditId] = useState(null); // State for the ID of the task being edited
  const [name, setName] = useState(""); // State for the task name input
  const [filter, setFilter] = useState("all"); // State for task filter (all, completed, uncompleted)
  const [isColorsOpen, setIsColorsOpen] = useState(false); // State for showing color picker
  const [location, setLocation] = useState({}); // State for color picker location
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Function to remove a task by ID
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    showAlert(true, "Task Removed."); // Show alert after removing task
  };

  // Function to toggle the completion status of a task
  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    showAlert(true, "Task State Changed."); // Show alert after toggling task status
  };

  // Function to set up task editing mode
  const editTask = (id) => {
    const { name } = tasks.find((task) => task.id === id); // Find the task to edit
    setIsEditing(true); // Set editing mode to true
    setEditId(id); // Set the ID of the task being edited
    setName(name); // Set the task name to the input
    inputRef.current.focus(); // Focus on the input field
  };

  // Function to show an alert with a message
  const showAlert = (show, msg) => {
    setAlert({ show, msg });
  };

  // Function to show color picker at the position of the clicked element
  const showColors = (e, id) => {
    const { top, right } = e.target.getBoundingClientRect(); // Get the position of the element
    setLocation({ top, right, id }); // Set the position and ID for the color picker
    setIsColorsOpen(true); // Open the color picker
  };

  return (
    // Provide context values to child components
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        removeTask,
        toggleDone,
        refContainer,
        alert,
        showAlert,
        isEditing,
        setIsEditing,
        editId,
        setEditId,
        editTask,
        name,
        setName,
        getTasks,
        filter,
        setFilter,
        inputRef,
        location,
        setLocation,
        isColorsOpen,
        setIsColorsOpen,
        showColors,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children} {/* Render child components */}
    </AppContext.Provider>
  );
};

// Custom hook to use the global context
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
