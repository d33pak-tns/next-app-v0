"use client";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { Params } from "next/dist/server/request/params";

const TodoDetail = () => {
  const router = useRouter();
  const { id } = useParams<Params>();

  const todos = useSelector((state: RootState) => state.todos.todos);
  const todo = todos.find((todo) => todo.id === id);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoaded(true);
    }
  }, [id]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!todo) {
    return <h2>Todo not found</h2>;
  }

  return (
    <div style={{ fontFamily: "monospace" }}>
      <h1>{todo.title}</h1>
      <p>{todo.task}</p>
      <p>Status: {todo.isCompleted ? "Completed" : "Pending"}</p>
      <h3>Tags:</h3>
      <div>
        {todo.tags.map((tag, index) => (
          <Chip key={index} label={tag} style={{ marginRight: "5px" }} />
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/home/todo")}
        style={{ marginTop: "20px" }}
      >
        Back to Todo List
      </Button>
    </div>
  );
};

export default TodoDetail;
