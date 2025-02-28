"use client";
import { Todo } from "@/typescript/todotypes";
import { useState } from "react";
import { Button, TextField, Chip } from "@mui/material";

const TodoItem = ({ title, task, tags }: Todo) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{title}</h3>
      <p>{task}</p>
      <div>
        {tags.map((tag, index) => (
          <Chip key={index} label={tag} style={{ marginRight: "5px" }} />
        ))}
      </div>
    </div>
  );
};

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");
  const [newTags, setNewTags] = useState<string>("");

  const handleAddTodo = () => {
    if (newTitle && newTask) {
      const tagsArray = newTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const newTodo: Todo = {
        title: newTitle,
        task: newTask,
        tags: tagsArray,
      };

      setTodos([...todos, newTodo]);
      setNewTitle("");
      setNewTask("");
      setNewTags("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <div style={{ marginBottom: "20px" }}>
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
      </div>

      <div>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            title={todo.title}
            task={todo.task}
            tags={todo.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
