
# Todo List Application

## Table of Contents

- [Overview](#overview)
- [System Design](#system-design)
- [Implementation](#implementation)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)

## Overview

The Todo List Application is a simple and intuitive task management tool designed to help you keep track of your daily tasks. You can create, update, mark as done, and search for tasks. The application uses a clean and modern design, ensuring a smooth user experience.

## System Design

The Todo List Application is built with a focus on simplicity and user experience. The architecture consists of the following components:

- **Frontend**: Built using React, it provides a responsive and dynamic user interface. The components are structured to ensure modularity and reusability.
- **State Management**: Uses React Context API for managing the application state, ensuring a consistent and efficient state management approach.
- **Storage**: Tasks are stored in Local Storage to maintain persistence between sessions.
- **Styling**:  CSS and responsive design.

## Implementation

### Frontend

The frontend of the application is developed using React. The following key features are implemented:

- **Component-based Architecture**: Each feature of the application is divided into reusable components.
- **State Management**: React Context API is used to manage the state of the application. This allows for easy state sharing across components.

### Task Management

Tasks can be added, edited, deleted, marked as completed, and searched. These operations are handled by the following components:

- **TaskList**: Displays the list of tasks and allows reordering using drag and drop.
- **TaskItem**: Represents a single task with options to edit, delete, and mark as completed.
- **TaskForm**: Handles the creation and updating of tasks.
- **SearchBar**: Allows users to search for tasks by name.

### Persistent Storage

Local Storage is used to store the tasks, ensuring that the user's data persists even after the browser is closed. This is achieved using the `useEffect` hook to load tasks from Local Storage when the application mounts and save tasks to Local Storage whenever they are updated.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Search for tasks
- Filter tasks based on their status (all, completed, pending)
- Drag and drop tasks to reorder
- Responsive design

## Demo

You can view a live demo of the application at the following link:

[Live Demo](https://to-do-assessment.vercel.app/)

## Technologies Used

- **Frontend**: React
- **State Management**: React Context API
- **Storage**: Local Storage
- **Styling**: CSS
- **Utilities**: React Beautiful DnD, React Icons, uuidv4

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Krishnendu0016/ToDO-Assessment-.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd ToDO-Assessment-
    ```

3. **Install the dependencies**:

    ```bash
    npm install
    ```

4. **Start the development server**:

    ```bash
    npm start
    ```

## Usage

Once the development server is running, you can:

- **Add a task**: Type a task name in the input field and click the "Add" button.
- **Edit a task**: Click the edit icon next to the task, update the task name, and save.
- **Delete a task**: Click the delete icon next to the task.
- **Mark a task as completed**: Click the checkbox next to the task name.
- **Search for tasks**: Use the search input to filter tasks by name.
- **Filter tasks**: Use the filter buttons to view all tasks, completed tasks, or pending tasks.
- **Reorder tasks**: Drag and drop tasks to change their order.


## Acknowledgements

- [React](https://reactjs.org/)
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
- [React Icons](https://react-icons.github.io/react-icons/)
