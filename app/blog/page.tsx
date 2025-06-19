export const dynamic = "force-dynamic"
import { getBlogPosts } from "@/app/actions/blog" // Fetch posts from the database
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Search,
  Newspaper,
  TagIcon,
  ListIcon,
  MailIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

// Helper function to calculate read time
function calculateReadTime(content: string | null): string {
  if (!content) return "1 min read"
  const wordsPerMinute = 200
  const textLength = content.split(/\s+/).length
  const readTime = Math.ceil(textLength / wordsPerMinute)
  return `${readTime} min read`
}

// Helper function to format dates
function formatDate(dateString: string | null): string {
  if (!dateString) return "No date"
  return format(new Date(dateString), "MMMM d, yyyy")
}

// Categories and tags can be fetched dynamically later
const categories = [
  { name: "Sustainability", count: 12, slug: "sustainability" },
  { name: "Education", count: 8, slug: "education" },
  { name: "Company News", count: 5, slug: "company-news" },
  { name: "Tips & Guides", count: 7, slug: "tips-guides" },
  { name: "Industry Insights", count: 9, slug: "industry-insights" },
  { name: "Case Studies", count: 4, slug: "case-studies" },
]

const popularTags = [
  { name: "Biodegradable", slug: "biodegradable" },
  { name: "Compostable", slug: "compostable" },
  { name: "Sustainability", slug: "sustainability" },
  { name: "Plastic Alternatives", slug: "plastic-alternatives" },
  { name: "Circular Economy", slug: "circular-economy" },
  { name: "Regulations", slug: "regulations" },
  { name: "Innovation", slug: "innovation" },
  { name: "Waste Management", slug: "waste-management" },
]

export default async function BlogPage() {
  const allPosts = await getBlogPosts()
  const publishedPosts = allPosts.filter((post) => post.status === "published")

  if (publishedPosts.length === 0) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24 text-center">
        <div className="flex justify-center mb-4">
          <Newspaper className="h-16 w-16 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold">No Blog Posts Found</h1>
        <p className="text-gray-500 mt-2">Check back later for more updates!</p>
        <Link href="/" className="mt-6 inline-block">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  const featuredPost = publishedPosts[0]
  const regularPosts = publishedPosts.slice(1)

  // Determine author name (simplified for now)
  const getAuthorName = (authorId: string | null | undefined): string => {
    // In a real app, you'd fetch author details from `profiles`
    // For now, if there's an author_id, assume it's an admin or specific author
    // This logic should be enhanced to fetch actual author names
    if (authorId) return "AICMT Admin" // Placeholder
    return "AICMT Team"
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog & News</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl">
            Insights, updates, and resources on compostable plastics and sustainability
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Main content - Blog posts */}
          <div className="md:col-span-2">
            <div className="grid gap-8">
              {/* Featured post */}
              <Card className="overflow-hidden">
                {featuredPost.featured_image ? (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={featuredPost.featured_image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Newspaper className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 flex-wrap">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(featuredPost.publish_date || featuredPost.created_at)}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <User className="h-4 w-4" />
                    <span>{getAuthorName(featuredPost.author_id)}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <Clock className="h-4 w-4" />
                    <span>{calculateReadTime(featuredPost.content)}</span>
                  </div>
                  <CardTitle className="text-2xl">
                    <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </CardTitle>
                  <CardDescription>{featuredPost.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags?.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50 hover:bg-green-100 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>

              {/* Regular posts */}
              <div className="grid gap-6 sm:grid-cols-2">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden flex flex-col">
                    {post.featured_image ? (
                      <div className="relative aspect-video w-full">
                        <Image
                          src={post.featured_image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Newspaper className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                      </div>
                    )}
                    <CardHeader className="flex-grow">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 flex-wrap">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(post.publish_date || post.created_at)}</span>
                        <Separator orientation="vertical" className="h-3.5" />
                        <Clock className="h-3.5 w-3.5" />
                        <span>{calculateReadTime(post.content)}</span>
                        {/* <Separator orientation="vertical" className="h-3.5" />
                        <User className="h-3.5 w-3.5" />
                        <span>{getAuthorName(post.author_id)}</span> */}
                      </div>
                      <CardTitle className="text-lg">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="w-10">
                    1
                  </Button>
                  {/* <Button variant="outline" size="sm" className="w-10">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="w-10">
                    3
                  </Button> */}
                  <Button variant="outline" size="sm" disabled>
                    {" "}
                    {/* Assuming only 1 page for now */}
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" /> Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input placeholder="Search articles..." />
                  <Button aria-label="Search">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListIcon className="h-5 w-5" /> Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/blog/category/${category.slug}`}
                        className="flex justify-between items-center py-2 hover:text-green-600 transition-colors"
                      >
                        <span>{category.name}</span>
                        <Badge variant="outline">{category.count}</Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TagIcon className="h-5 w-5" /> Popular Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Link key={tag.slug} href={`/blog/tag/${tag.slug}`}>
                      <Badge
                        variant="outline"
                        className="bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                      >
                        {tag.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MailIcon className="h-5 w-5" /> Subscribe to Our Newsletter
                </CardTitle>
                <CardDescription>
                  Stay updated with the latest news and insights on sustainable plastics
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Replace with NewsletterForm component if available and suitable */}
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder="Your email address" type="email" />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Subscribe</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
