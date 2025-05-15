import { BlogPostForm } from "@/components/admin/blog-post-form"

export const metadata = {
  title: "Create Blog Post | Admin Dashboard",
  description: "Create a new blog post",
}

export default function NewBlogPostPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Create Blog Post</h1>
      <BlogPostForm />
    </div>
  )
}
