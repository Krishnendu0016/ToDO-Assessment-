import React, { useEffect } from "react";
import { FaGithub } from 'react-icons/fa';
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import Alert from "./Alert";
import { useGlobalContext } from "./context";

const App = () => {
  // Destructure values and functions from the global context
  const {
    inputRef,
    tasks,
    setTasks,
    alert,
    showAlert,
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    name,
    setName,
    filter,
    setFilter,
    isColorsOpen,
    setIsColorsOpen,
    searchQuery,
    setSearchQuery,
  } = useGlobalContext();

  // Function to handle adding or editing a task
  const addTask = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    if (!name) {
      // Show alert if task name is empty
      showAlert(true, "Invalid Task Name!");
    } else if (name && isEditing) {
      // Update existing task
      setTasks(
        tasks.map((task) => {
          return task.id === editId ? { ...task, name: name, updated: new Date().toLocaleString() } : task;
        })
      );
      setIsEditing(false);
      setEditId(null);
      setName("");
      showAlert(true, "Task Edited.");
    } else {
      // Add a new task
      const newTask = {
        id: uuid().slice(0, 8), // Generate a unique ID
        name: name,
        completed: false,
        color: "#009688",
        updated: new Date().toLocaleString(),
      };
      setTasks([...tasks, newTask]); // Add new task to the list
      showAlert(true, "Task Added.");
      setName("");
    }
  };

  // Function to filter tasks based on the selected filter
  const filterTasks = (e) => {
    setFilter(e.target.dataset["filter"]); // Set the filter value
  };

  // Function to delete all tasks
  const deleteAll = () => {
    setTasks([]);
    showAlert(true, "Your list is clear!");
  };

  useEffect(() => {
    // Focus on the input field when the component mounts
    inputRef.current.focus();
    // Save tasks to local storage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [inputRef, tasks]);

  // Function to handle drag-and-drop reordering of tasks
  const handleDragEnd = (param) => {
    const srcI = param.source.index; // Source index
    const desI = param.destination?.index; // Destination index
    if (desI !== undefined) {
      const reOrdered = [...tasks];
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]); // Reorder the tasks array
      setTasks(reOrdered);
    }
  };

  // Function to hide the color container when clicking outside
  const hideColorsContainer = (e) => {
    if (e.target.classList.contains("btn-colors")) return;
    setIsColorsOpen(false);
  };

  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className='container' onClick={hideColorsContainer}>
        {isColorsOpen}
        {alert && <Alert msg={alert.msg} />} {/* Display alert message if there is one */}
        <form className='head' onSubmit={addTask}>
          <input
            type='text'
            ref={inputRef}
            placeholder='New Task'
            value={name}
            onChange={(e) => setName(e.target.value)} // Update task name
          />
          <button type='submit'>{isEditing ? "Edit" : "Add"}</button> {/* Add or Edit task */}
        </form>
        <div className='search'>
          <input
            type='text'
            placeholder='Search Tasks'
            value={searchQuery}
            onChange={handleSearch} // Handle search input change
          />
        </div>
        <div className='filter'>
          <button
            data-filter='all'
            className={filter === "all" ? "active" : ""}
            onClick={filterTasks} // Filter tasks based on the selected filter
          >
            All
          </button>
          <button
            data-filter='completed'
            className={filter === "completed" ? "active" : ""}
            onClick={filterTasks}
          >
            Completed
          </button>
          <button
            data-filter='uncompleted'
            className={filter === "uncompleted" ? "active" : ""}
            onClick={filterTasks}
          >
            Uncompleted
          </button>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          {filteredTasks.length > 0 ? (
            <List tasks={filteredTasks} /> // Display filtered tasks
          ) : (
            <p className='no-tasks'>No tasks found!</p>
          )}
        </DragDropContext>
        {tasks.length > 2 && (
          <button
            className='btn-delete-all'
            onClick={deleteAll} // Clear all tasks
            title='Delete All Tasks (Completed and Uncompleted)!'
          >
            Clear All
          </button>
        )}
      </div>
      <div className="footer">
        <a href='https://github.com/Krishnendu0016' target='_blank' rel="noopener noreferrer">
          <FaGithub className='github' />
        </a>
      </div>
    </>
  );
};

export default App;
