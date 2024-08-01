import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "./context";
import Task from "./Task";

const List = ({ tasks }) => {
  const { filter } = useGlobalContext(); // Retrieve the current filter from context

  // Initialize filteredTasks with a copy of tasks
  let filteredTasks = [...tasks];

  // Apply the filter to tasks based on the current filter value
  switch (filter) {
    case "all":
      filteredTasks = [...tasks]; // No filtering
      break;
    case "completed":
      filteredTasks = tasks.filter((task) => task.completed); // Only completed tasks
      break;
    case "uncompleted":
      filteredTasks = tasks.filter((task) => !task.completed); // Only uncompleted tasks
      break;
    default:
      filteredTasks = [...tasks]; // Default to showing all tasks
      break;
  }

  return (
    <Droppable droppableId='droppable-1'>
      {(provided, snapshot) => (
        <ul
          className='tasks-wrapper'
          ref={provided.innerRef} // Ref for Droppable
          {...provided.droppableProps} // Droppable props
        >
          {/* Render each filtered task as a Task component */}
          {filteredTasks.map((task, i) => (
            <Task key={task.id} {...task} index={i} />
          ))}
          {provided.placeholder} {/* Placeholder for drag-and-drop */}
        </ul>
      )}
    </Droppable>
  );
};

export default List;
