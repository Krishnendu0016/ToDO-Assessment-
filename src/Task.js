import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdDeleteOutline,
} from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useGlobalContext } from "./context";

const Task = ({ id, name, completed, color, index, updated }) => {
  const { removeTask, toggleDone, editTask } = useGlobalContext(); // Extract functions from context

  return (
    <Draggable key={id} draggableId={"draggable-" + id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}  // Reference to the draggable item
          {...provided.draggableProps}  // Spread draggableProps for drag-and-drop functionality
          {...provided.dragHandleProps}  // Spread dragHandleProps for handle styling
          style={{
            ...provided.draggableProps.style,  // Apply default draggable styles
            boxShadow: snapshot.isDragging ? "0 0 5rem #666" : "none",  // Add shadow when dragging
            opacity: snapshot.isDragging ? "1" : provided.draggableProps.style.opacity,  // Adjust opacity when dragging
            backgroundColor: color,  // Set background color of the task
          }}
          className={`task ${completed ? "task-done" : ""}`}  // Apply 'task-done' class if task is completed
        >
          <div className="task-content">
            <p>{name}</p>  // Display task name
            <small>Last updated: {updated}</small>  // Display last updated timestamp
          </div>
          <div className="task-actions">
            <button onClick={() => toggleDone(id)}>  {/* Toggle task completion */}
              {completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}  {/* Display checked or unchecked icon */}
            </button>
            <button onClick={() => removeTask(id)}>  {/* Remove task */}
              <MdDeleteOutline />
            </button>
            <button onClick={() => editTask(id)}>  {/* Edit task */}
              <FiEdit />
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
