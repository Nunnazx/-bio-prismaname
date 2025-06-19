import { BlogPostForm } from "@/components/admin/blog-post-form"
import { getBlogPost } from "@/app/actions/blog" // Make sure this action exists and fetches a single post
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EditBlogPostPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: EditBlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.id)
    return {
      title: `Edit: ${post?.title || "Blog Post"} | Admin Dashboard`,
    }
  } catch (error) {
    return {
      title: "Edit Blog Post | Admin Dashboard",
    }
  }
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = params
  try {
    const post = await getBlogPost(id)

    if (!post) {
      return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-24 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-yellow-500" />
                Blog Post Not Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The blog post with ID <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">{id}</span>{" "}
                could not be found.
              </p>
              <Link href="/admin/blog">
                <Button variant="outline">Back to Blog Posts</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )
    }
    // Transform post data slightly if needed for the form, e.g., date objects
    const formInitialData = {
      ...post,
      publish_date: post.publish_date ? new Date(post.publish_date) : null,
      tags: post.tags || [], // Ensure tags is an array
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <BlogPostForm post={formInitialData} /* authors={authors} categories={categories} */ />
      </div>
    )
  } catch (error: any) {
    console.error("Error fetching blog post for edit:", error)
    return (
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-24 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
              Error Loading Blog Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500 mb-2">Could not load blog post data for editing.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Details: {error.message || "An unexpected error occurred."}
            </p>
            <Link href="/admin/blog">
              <Button variant="outline">Back to Blog Posts</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }
}
