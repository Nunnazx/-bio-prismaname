import { getBlogPost } from "@/app/actions/blog"
import { BlogPostForm } from "@/components/admin/blog-post-form"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Edit Blog Post | Admin Dashboard",
  description: "Edit an existing blog post",
}

export default async function EditBlogPostPage({ params }) {
  const { id } = params

  const post = await getBlogPost(id).catch(() => null)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Edit Blog Post</h1>
      <BlogPostForm post={post} />
    </div>
  )
}
