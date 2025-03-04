import Link from "next/link";

// The list of blog posts
const posts = [
  { slug: "my-first-post", title: "My First Post" },
  { slug: "my-second-post", title: "My Second Post" },
  { slug: "my-third-post", title: "My Third Post" },
];

export default function BlogPage() {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// For static generation of dynamic routes
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug, // Only the "slug" should be passed here
  }));
}
