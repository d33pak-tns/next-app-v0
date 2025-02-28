// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';

// Mock data for blog posts
const posts = [
  { slug: 'my-first-post', title: 'My First Post', content: 'This is the first post content.' },
  { slug: 'my-second-post', title: 'My Second Post', content: 'This is the second post content.' },
  { slug: 'my-third-post', title: 'My Third Post', content: 'This is the third post content.' },
];

// The PostPage component
export default async function PostPage({ params }: { params: { slug: string } }) {
  // You have to await `params` to use it
  const { slug } = params;  // Awaited `params`

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound(); // If the post doesn't exist, show a 404 page
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// Static generation of params for dynamic routes (this is asynchronous too)
export async function generateStaticParams() {
  return [
    { slug: 'my-first-post' },
    { slug: 'my-second-post' },
    { slug: 'my-third-post' },
  ].map((post) => ({
    slug: post.slug, // Generate static pages for each blog post based on its slug
  }));
}
