import React from "react";
import { Post } from "@/typescript/poststypes";

interface PostsPageProps {
  posts: Post[];
}

const PostsPage = ({ posts }: PostsPageProps) => {
  return (
    <div>
      <h1>Server-Side Props with Client-Side Fetching</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
