import { getBlogPosts } from "@/app/actions/blog" // Fetch posts from the database
import { ArrowLeft, Calendar, Clock, User, ChevronLeft, ChevronRight, Search, Newspaper } from "lucide-react"
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
  { name: "Sustainability", count: 12 },
  { name: "Education", count: 8 },
  { name: "Company News", count: 5 },
  { name: "Tips & Guides", count: 7 },
  { name: "Industry Insights", count: 9 },
  { name: "Case Studies", count: 4 },
]

const popularTags = [
  "Biodegradable",
  "Compostable",
  "Sustainability",
  "Plastic Alternatives",
  "Circular Economy",
  "Regulations",
  "Innovation",
  "Waste Management",
]

export default async function BlogPage() {
  const allPosts = await getBlogPosts()
  const publishedPosts = allPosts.filter((post) => post.status === "published")

  if (publishedPosts.length === 0) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24 text-center">
        <h1 className="text-3xl font-bold">No Blog Posts Found</h1>
        <p className="text-gray-500 mt-2">Check back later for more updates!</p>
      </div>
    )
  }

  const featuredPost = publishedPosts[0]
  const regularPosts = publishedPosts.slice(1)

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
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Newspaper className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(featuredPost.publish_date || featuredPost.created_at)}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <User className="h-4 w-4" />
                    {/* Replace with author name when available */}
                    <span>{featuredPost.author_id ? "Admin" : "AICMT Team"}</span>
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
                      <Badge key={index} variant="outline" className="bg-green-50">
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
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span>{formatDate(post.publish_date || post.created_at)}</span>
                        <Separator orientation="vertical" className="h-3" />
                        <span>{calculateReadTime(post.content)}</span>
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
                  <Button variant="outline" size="sm" className="w-10">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="w-10">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
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
                <CardTitle>Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input placeholder="Search articles..." />
                  <Button>
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
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
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Link key={index} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Badge variant="outline" className="bg-green-50 hover:bg-green-100 transition-colors">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Subscribe to Our Newsletter</CardTitle>
                <CardDescription>
                  Stay updated with the latest news and insights on sustainable plastics
                </CardDescription>
              </CardHeader>
              <CardContent>
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
