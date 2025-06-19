import { BlogPostForm } from "@/components/admin/blog-post-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Blog Post | Admin Dashboard",
  description: "Create a new blog post.",
}

// You might want to fetch authors and categories here if they are dynamic
// For simplicity, we'll assume they are static or handled within the form for now.

export default async function NewBlogPostPage() {
  // const authors = await getAuthors(); // Example
  // const categories = await getCategories(); // Example

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogPostForm /* authors={authors} categories={categories} */ />
    </div>
  )
}
