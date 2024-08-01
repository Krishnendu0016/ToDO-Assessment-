import React, { useState, useContext, useRef } from "react";

// Function to get tasks from localStorage or return an empty array if none exist
const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

// Create a context for the application
const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const inputRef = useRef(null); // Reference for the input field
  const [tasks, setTasks] = useState(getTasks()); // State to hold tasks
  const [alert, setAlert] = useState({ show: false, msg: "" }); // State for alert messages
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode
  const [editId, setEditId] = useState(null); // State to hold ID of the task being edited
  const [name, setName] = useState(""); // State to hold the name of the task
  const [filter, setFilter] = useState("all"); // State to hold the current filter
  const [isColorsOpen, setIsColorsOpen] = useState(false); // State to manage color picker visibility
  const [location, setLocation] = useState({}); // State to hold location for color picker
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const refContainer = useRef(null); // Reference for alert container

  // Function to remove a task by ID
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    showAlert(true, "Task Removed."); // Show alert on task removal
  };

  // Function to toggle task completion state
  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    showAlert(true, "Task State Changed."); // Show alert on task state change
  };

  // Function to set up editing mode for a specific task
  const editTask = (id) => {
    const { name } = tasks.find((task) => task.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(name);
    inputRef.current.focus(); // Focus input field for editing
  };

  // Function to display alert messages
  const showAlert = (show, msg) => {
    setAlert({ show, msg });
  };

  // Function to set up the color picker display position
  const showColors = (e, id) => {
    const { top, right } = e.target.getBoundingClientRect();
    setLocation({ top, right, id });
    setIsColorsOpen(true);
  };

  return (
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
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the global context
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
