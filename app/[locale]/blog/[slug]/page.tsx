import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/optimized-image"
import { TranslatedText } from "@/components/translated-text"

async function getBlogPost(slug: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*, profiles(first_name, last_name)")
    .eq("slug", slug)
    .single()

  if (error || !post) {
    console.error("Error fetching blog post:", error)
    return null
  }

  return post
}

async function getRelatedPosts(currentPostId: string, tags: string[], limit = 3) {
  const supabase = createServerComponentClient({ cookies })

  // Get posts that share tags with the current post
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, featured_image")
    .neq("id", currentPostId)
    .eq("status", "published")
    .overlaps("tags", tags) // fetch posts that share at least one tag
    .limit(limit)

  if (error) {
    console.error("Error fetching related posts:", error)
    return []
  }

  // If we don't have enough related posts, get recent posts
  if (posts.length < limit) {
    const neededPosts = limit - posts.length
    const existingIds = [currentPostId, ...posts.map((p) => p.id)]

    const { data: recentPosts, error: recentError } = await supabase
      .from("blog_posts")
      .select("id, title, slug, featured_image")
      .not("id", "in", existingIds)
      .eq("status", "published")
      .order("publish_date", { ascending: false })
      .limit(neededPosts)

    if (recentError) {
      console.error("Error fetching recent posts:", recentError)
    } else if (recentPosts) {
      posts.push(...recentPosts)
    }
  }

  return posts
}

export default async function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  let draftBanner = null
  if (post.status !== "published") {
    draftBanner = (
      <div className="mb-4 rounded bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-800">
        Draft preview &mdash; this post is not yet public.
      </div>
    )
  }

  const relatedPosts = await getRelatedPosts(post.id, post.tags || [], 3)

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  // Calculate read time based on content length
  const readTime = Math.max(1, Math.ceil(post.content.length / 1500)) + " min read"

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href={`/${locale}/blog`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <TranslatedText id="blog.backToBlog" fallback="Back to Blog" />
            </Button>
          </Link>
        </div>

        {draftBanner}

        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publish_date || post.created_at)}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.profiles ? `${post.profiles.first_name} ${post.profiles.last_name}` : "Admin"}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <Badge variant="outline">{post.category}</Badge>
            </div>
          </div>

          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
            <OptimizedImage
              src={post.featured_image || "/placeholder.svg?height=500&width=1000&query=blog post"}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <div
            className="prose prose-green max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br>") }}
          />

          <div className="flex flex-wrap gap-2 pt-4">
            {post.tags &&
              post.tags.map((tag: string, index: number) => (
                <Link
                  key={index}
                  href={`/${locale}/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className="no-underline"
                >
                  <Badge
                    variant="outline"
                    className="bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </Badge>
                </Link>
              ))}
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-16 space-y-8">
            <h2 className="text-2xl font-bold">
              <TranslatedText id="blog.relatedPosts" fallback="Related Posts" />
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden">
                  <div className="relative aspect-video w-full">
                    <OptimizedImage
                      src={relatedPost.featured_image || "/placeholder.svg?height=200&width=350&query=blog post"}
                      alt={relatedPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 350px"
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="line-clamp-2 font-medium">{relatedPost.title}</h3>
                    <div className="mt-2">
                      <Link href={`/${locale}/blog/${relatedPost.slug}`}>
                        <Button variant="link" className="h-auto p-0 text-green-600">
                          <TranslatedText id="blog.readMore" fallback="Read More" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
