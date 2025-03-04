"use client";

import { useDispatch, useSelector } from "react-redux";
import { Todo } from "@/typescript/todotypes";
import { addTodo, toggleTodo, removeTodo } from "@/redux/slices/todoSlice";
import { RootState } from "@/redux/store";
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const TodoList: React.FC = () => {
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
    <div style={{ fontFamily: "monospace" }}>
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
      <div>
        <h2>Pending Tasks</h2>

        <List>
          {todos.map((todo) => {
            if (!todo.isCompleted) {
              return (
                <ListItem key={todo.id}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/home/todo/${todo.id}`}
                  >
                    <ListItemText
                      primary={
                        <span
                          style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                        >
                          {todo.title}
                        </span>
                      }
                      secondary={
                        <span
                          style={{
                            textDecoration: "none",
                            overflow: "auto",
                            wordBreak: "break-all",
                            display: "inline-block",
                            whiteSpace: "normal",
                            maxWidth: "95%",
                            fontFamily: "monospace",
                          }}
                        >
                          {todo.task}
                        </span>
                      }
                    />
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      margin: "4px",
                    }}
                  >
                    {todo.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        style={{ marginRight: "5px" }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      margin: "0.5rem",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ margin: "0.3rem" }}
                      onClick={() => handleToggleTodo(todo.id)}
                    >
                      Complete
                    </Button>
                    <Button
                      sx={{ margin: "0.3rem" }}
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveTodo(todo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </ListItem>
              );
            }
            return null;
          })}
        </List>

        <h2>Completed Tasks</h2>
        <List>
          {todos.map((todo) => {
            if (todo.isCompleted) {
              return (
                <ListItem key={todo.id}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/home/todo/${todo.id}`}
                  >
                    <ListItemText
                      primary={
                        <span
                          style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                        >
                          {todo.title}
                        </span>
                      }
                      secondary={
                        <span
                          style={{
                            textDecoration: "line-through",
                            overflow: "auto",
                            wordBreak: "break-all",
                            display: "inline-block",
                            whiteSpace: "normal",
                            maxWidth: "95%",
                            fontFamily: "monospace",
                          }}
                        >
                          {todo.task}
                        </span>
                      }
                    />
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      margin: "4px",
                    }}
                  >
                    {todo.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        style={{ marginRight: "5px" }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      margin: "4px",
                    }}
                  >
                    <Button
                      sx={{
                        margin: "0.3rem",
                        bgcolor: "orange",
                        color: "white",
                      }}
                      variant="contained"
                      onClick={() => handleToggleTodo(todo.id)}
                    >
                      Redo
                    </Button>
                    <Button
                      sx={{ margin: "0.3rem" }}
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveTodo(todo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </ListItem>
              );
            }
            return null;
          })}
        </List>
      </div>
    </div>
  );
};

export default TodoList;
