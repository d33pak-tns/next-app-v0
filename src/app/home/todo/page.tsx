"use client";

import { useDispatch, useSelector } from "react-redux";
import { Todo } from "@/typescript/todotypes"; 
import { addTodo, toggleTodo, removeTodo } from "@/redux/slices/todoSlice";
import { RootState } from "@/redux/store"; 
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
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
              primary={
                <span
                  style={{
                    maxWidth: "30%",
                  }}
                >
                  todo.title 
                </span>
              }
              secondary={
                <span
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                    overflow: "hidden",
                    wordBreak: "break-all",
                    display: "inline-block", 
                    maxWidth: "70%", 
                    whiteSpace: "normal",
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
