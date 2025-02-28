// app/blog/page.tsx
import Link from 'next/link';

// Simulated list of posts (in a real app, this could come from an API)
const posts = [
  { slug: 'my-first-post', title: 'My First Post' },
  { slug: 'my-second-post', title: 'My Second Post' },
  { slug: 'my-third-post', title: 'My Third Post' },
];

export default function BlogPage() {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            {/* Each post links to its own dynamic page */}
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Here we use generateStaticParams to define the dynamic slugs at build time
export async function generateStaticParams() {
  return [
    { slug: 'my-first-post' },
    { slug: 'my-second-post' },
    { slug: 'my-third-post' },
  ].map((post) => ({
    slug: post.slug, // Each of these values will be used for the dynamic URL
  }));
}
