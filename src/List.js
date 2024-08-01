import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "./context";
import Task from "./Task";

const List = ({ tasks }) => {
  const { filter } = useGlobalContext(); // Get the filter value from global context

  let filteredTasks = [...tasks]; // Start with a copy of all tasks

  // Filter tasks based on the current filter value
  switch (filter) {
    case "all":
      filteredTasks = [...tasks]; // Show all tasks
      break;
    case "completed":
      filteredTasks = tasks.filter((task) => task.completed); // Show only completed tasks
      break;
    case "uncompleted":
      filteredTasks = tasks.filter((task) => !task.completed); // Show only uncompleted tasks
      break;
    default:
      filteredTasks = [...tasks]; // Default to showing all tasks
      break;
  }

  return (
    <Droppable droppableId='droppable-1'> {/* Define the droppable area for drag-and-drop */}
      {(provided, snapshot) => (
        <ul
          className='tasks-wrapper'  // Styling for the list of tasks
          ref={provided.innerRef}    // Reference to the droppable area
          {...provided.droppableProps} // Spread droppableProps to enable drag-and-drop functionality
        >
          {filteredTasks.map((task, i) => (
            <Task key={task.id} {...task} index={i} /> // Render each task, passing down necessary props
          ))}
          {provided.placeholder} {/* Placeholder to handle drag-and-drop spacing */}
        </ul>
      )}
    </Droppable>
  );
};

export default List;
