import { BlogPostEditor } from "@/components/admin/blog-post-editor"

export const metadata = {
  title: "Edit Blog Post | Admin Dashboard",
  description: "Edit an existing blog post",
}

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  // In a real implementation, we would fetch the post data from Supabase
  const post = {
    id: params.id,
    title: "How Biodegradable Plastics Are Changing the Industry",
    slug: "biodegradable-plastics-industry",
    content: "This is the content of the blog post...",
    excerpt: "A brief overview of how biodegradable plastics are revolutionizing the industry.",
    featuredImage: "/sustainable-future-city.png",
    status: "published",
    category: "Industry Insights",
    tags: ["biodegradable", "industry", "innovation"],
    author: "Rahul Sharma",
    date: "2023-06-15T10:30:00Z",
    seo: {
      title: "How Biodegradable Plastics Are Changing the Industry | Blog",
      description: "Learn how biodegradable plastics are revolutionizing the industry with sustainable solutions.",
      keywords: "biodegradable plastics, sustainable packaging, eco-friendly solutions",
    },
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Edit Blog Post</h1>
      <BlogPostEditor post={post} />
    </div>
  )
}
