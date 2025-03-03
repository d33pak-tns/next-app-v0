"use client";

// import { useDispatch, useSelector } from "react-redux";
// import { Todo } from "@/typescript/todotypes";
// import { addTodo, toggleTodo, removeTodo } from "@/redux/slices/todoSlice";
// import { RootState } from "@/redux/store";
// import { useState } from "react";
// import {
//   Button,
//   TextField,
//   Chip,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import { v4 as uuidv4 } from "uuid";

// const TodoList = () => {
//   const dispatch = useDispatch();
//   const todos = useSelector((state: RootState) => state.todos.todos);
//   const [newTitle, setNewTitle] = useState<string>("");
//   const [newTask, setNewTask] = useState<string>("");
//   const [newTags, setNewTags] = useState<string>("");

//   // const handleAddTodo = () => {
//   //   if (newTitle && newTask) {
//   //     const newTodo: Todo = {
//   //       id: uuidv4(),
//   //       title: newTitle,
//   //       task: newTask,
//   //       tags: tagsArray,
//   //       isCompleted: false,
//   //     };
//   //     dispatch(addTodo(newTodo));
//   //     setNewTitle("");
//   //     setNewTask("");
//   //     setNewTags("");
//   //   }
//   // };

//   const handleAddTodo = () => {
//     if (newTitle && newTask) {
//       const newTodo: Todo = {
//         id: uuidv4(),  // Generate the UUID correctly here
//         title: newTitle,
//         task: newTask,
//         tags: newTags.split(",").map((tag) => tag.trim()),
//         isCompleted: false,
//       };
//       dispatch(addTodo(newTodo));  // Add the new todo to the Redux store
//       setNewTitle("");  // Reset inputs
//       setNewTask("");
//       setNewTags("");
//     }
//   };

//   const handleToggleTodo = (id: string) => {
//     dispatch(toggleTodo(id));
//   };

//   const handleRemoveTodo = (id: string) => {
//     dispatch(removeTodo(id));
//   };

//   return (
//     <div>
//       <h1>Todo App</h1>

//       <TextField
//         label="Title"
//         variant="outlined"
//         fullWidth
//         value={newTitle}
//         onChange={(e) => setNewTitle(e.target.value)}
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Task"
//         variant="outlined"
//         fullWidth
//         value={newTask}
//         onChange={(e) => setNewTask(e.target.value)}
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Tags (comma separated)"
//         variant="outlined"
//         fullWidth
//         value={newTags}
//         onChange={(e) => setNewTags(e.target.value)}
//         style={{ marginBottom: "10px" }}
//       />
//       <Button variant="contained" color="primary" onClick={handleAddTodo}>
//         Add Todo
//       </Button>

//       <List>
//         {todos.map((todo) => (
//           <ListItem key={todo.id}>
//             <ListItemText primary={todo.title} secondary={todo.task} />
//             <div>
//               {todo.tags.map((tag, index) => (
//                 <Chip key={index} label={tag} style={{ marginRight: "5px" }} />
//               ))}
//             </div>
//             <Button onClick={() => handleToggleTodo(todo.id)}>
//               {todo.isCompleted ? "Uncomplete" : "Complete"}
//             </Button>
//             <Button onClick={() => handleRemoveTodo(todo.id)}>Delete</Button>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default TodoList;

"use client";

import { useDispatch, useSelector } from "react-redux";
import { Todo } from "@/typescript/todotypes"; // Adjust the import path as necessary
import { addTodo, toggleTodo, removeTodo } from "@/redux/slices/todoSlice"; // Adjust the import path as necessary
import { RootState } from "@/redux/store"; // Adjust the import path as necessary
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");
  const [newTags, setNewTags] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false); // State to track if the component is mounted

  useEffect(() => {
    setIsMounted(true); // Set to true when the component mounts
  }, []);

  const handleAddTodo = () => {
    if (newTitle && newTask) {
      const newTodo: Todo = {
        id: uuidv4(),
        title: newTitle,
        task: newTask,
        tags: newTags.split(",").map((tag) => tag.trim()),
        isCompleted: false,
      };
      dispatch(addTodo(newTodo));
      setNewTitle("");
      setNewTask("");
      setNewTags("");
    }
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  // Render nothing until the component is mounted to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <h1>Todo App</h1>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Task"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Tags (comma separated)"
        variant="outlined"
        fullWidth
        value={newTags}
        onChange={(e) => setNewTags(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Button variant="contained" color="primary" onClick={handleAddTodo}>
        Add Todo
      </Button>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              primary={todo.title}
              secondary={
                <span
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.task}
                </span>
              }
            />
            <div>
              {todo.tags.map((tag, index) => (
                <Chip key={index} label={tag} style={{ marginRight: "5px" }} />
              ))}
            </div>
            <Button onClick={() => handleToggleTodo(todo.id)}>
              {todo.isCompleted ? "Redo" : "Complete"}
            </Button>
            <Button onClick={() => handleRemoveTodo(todo.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
