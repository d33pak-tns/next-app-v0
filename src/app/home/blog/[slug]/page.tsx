import { notFound } from "next/navigation";
const posts = [
  {
    slug: "my-first-post",
    title: "My First Post",
    content: "This is the first post content.",
  },
  {
    slug: "my-second-post",
    title: "My Second Post",
    content: "This is the second post content.",
  },
  {
    slug: "my-third-post",
    title: "My Third Post",
    content: "This is the third post content.",
  },
];

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { slug: "my-first-post" },
    { slug: "my-second-post" },
    { slug: "my-third-post" },
  ].map((post) => ({
    slug: post.slug,
  }));
}
