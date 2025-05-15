import { BlogPostEditor } from "@/components/admin/blog-post-editor"

export const metadata = {
  title: "New Blog Post | Admin Dashboard",
  description: "Create a new blog post",
}

export default function NewBlogPostPage() {
  const emptyPost = {
    id: "",
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    status: "draft",
    category: "",
    tags: [],
    author: "",
    date: new Date().toISOString(),
    seo: {
      title: "",
      description: "",
      keywords: "",
    },
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">New Blog Post</h1>
      <BlogPostEditor post={emptyPost} isNew={true} />
    </div>
  )
}
