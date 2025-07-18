import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogCommentsTable } from "@/components/admin/blog-comments-table"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Blog Comments | Admin Dashboard",
  description: "Manage blog comments and moderation",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

async function getBlogComments() {
  try {
    const comments = await prisma.blogComment.findMany({
      include: {
        blogPost: {
          select: { title: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Transform the data to include post titles
    const commentsWithPostTitles = comments.map((comment) => ({
      ...comment,
      post_title: comment.blogPost?.title || "Unknown Post",
    }))

    return commentsWithPostTitles
  } catch (error) {
    console.error("Error fetching comments:", error)
    return []
  }
}

export default async function BlogCommentsPage() {
  const comments = await getBlogComments()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Blog Comments</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>Manage and moderate user comments on your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogCommentsTable initialComments={comments} />
        </CardContent>
      </Card>
    </div>
  )
}