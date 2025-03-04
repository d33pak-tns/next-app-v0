import { useRouter } from "next/router";

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Blog Post</h1>
      <p>Blog Post ID: {id}</p>
    </div>
  );
};

export default BlogPost;
