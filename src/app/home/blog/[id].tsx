// pages/app/home/blog/[id].tsx
import { useRouter } from "next/router";

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query; // Access the dynamic `id` from the URL

  return (
    <div>
      <h1>Blog Post</h1>
      <p>Blog Post ID: {id}</p>
    </div>
  );
};

export default BlogPost;
