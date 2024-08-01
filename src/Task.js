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
  const { removeTask, toggleDone, editTask } = useGlobalContext(); // Retrieve context functions

  return (
    <Draggable key={id} draggableId={"draggable-" + id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef} // Ref for Draggable
          {...provided.draggableProps} // Draggable props
          {...provided.dragHandleProps} // Drag handle props
          style={{
            ...provided.draggableProps.style, // Apply draggable style
            boxShadow: snapshot.isDragging ? "0 0 5rem #666" : "none", // Shadow when dragging
            opacity: snapshot.isDragging
              ? "1"
              : provided.draggableProps.style.opacity, // Opacity when dragging
            backgroundColor: color, // Background color of the task
          }}
          className={`task ${completed && "task-done"}`} // Apply task-done class if completed
        >
          <div className="task-content">
            <p>{name}</p> {/* Task name */}
            <small>Last updated: {updated}</small> {/* Last updated timestamp */}
          </div>
          <div className="task-actions">
            <button onClick={() => toggleDone(id)}>
              {completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} {/* Checkbox icon */}
            </button>
            <button onClick={() => removeTask(id)}>
              <MdDeleteOutline /> {/* Delete icon */}
            </button>
            <button onClick={() => editTask(id)}>
              <FiEdit /> {/* Edit icon */}
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
