import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogPostsTable } from "@/components/admin/blog-posts-table"
import { Plus } from "lucide-react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const metadata = {
  title: "Blog Management | Admin Dashboard",
  description: "Manage blog posts, categories, and tags",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

async function getBlogStats() {
  const supabase = createServerComponentClient({ cookies })

  // Get total posts
  const { data: totalPosts, error: totalError } = await supabase.from("blog_posts").select("id", { count: "exact" })

  // Get published posts
  const { data: publishedPosts, error: publishedError } = await supabase
    .from("blog_posts")
    .select("id", { count: "exact" })
    .eq("status", "published")

  // Get draft posts
  const { data: draftPosts, error: draftError } = await supabase
    .from("blog_posts")
    .select("id", { count: "exact" })
    .eq("status", "draft")

  // Get categories
  const { data: categoriesData, error: categoriesError } = await supabase
    .from("blog_posts")
    .select("category")
    .not("category", "is", null)

  const uniqueCategories = new Set()
  if (categoriesData) {
    categoriesData.forEach((post) => {
      if (post.category) uniqueCategories.add(post.category)
    })
  }

  if (totalError || publishedError || draftError || categoriesError) {
    console.error("Error fetching blog stats:", totalError || publishedError || draftError || categoriesError)
  }

  return {
    total: totalPosts?.length || 0,
    published: publishedPosts?.length || 0,
    drafts: draftPosts?.length || 0,
    categories: uniqueCategories.size || 0,
  }
}

async function getBlogPosts() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return data || []
}

export default async function BlogManagementPage() {
  const stats = await getBlogStats()
  const posts = await getBlogPosts()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Blog Management</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.drafts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage your blog posts, edit content, and control publication status</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogPostsTable initialPosts={posts} />
        </CardContent>
      </Card>
    </div>
  )
}
