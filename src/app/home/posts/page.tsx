// app/home/posts/page.tsx
import React from "react";
import { Post } from "@/typescript/poststypes"; // Make sure you have the correct types

// The component is now a Server Component by default in `app/` directory
const PostsPage = async () => {
  // Fetch data directly inside the server component
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const posts: Post[] = await res.json();

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
