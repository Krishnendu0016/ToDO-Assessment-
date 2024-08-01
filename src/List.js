import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "./context";
import Task from "./Task";

const List = ({ tasks }) => {
  const { filter } = useGlobalContext();

  let filteredTasks = [...tasks];

  switch (filter) {
    case "all":
      filteredTasks = [...tasks];
      break;
    case "completed":
      filteredTasks = tasks.filter((task) => task.completed);
      break;
    case "uncompleted":
      filteredTasks = tasks.filter((task) => !task.completed);
      break;
    default:
      filteredTasks = [...tasks];
      break;
  }

  return (
    <Droppable droppableId='droppable-1'>
      {(provided, snapshot) => (
        <ul
          className='tasks-wrapper'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {filteredTasks.map((task, i) => (
            <Task key={task.id} {...task} index={i} />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default List;
