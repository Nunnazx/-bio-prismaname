"use client"

import { ArrowLeft, Calendar, Clock, Share2, Tag, Facebook, Twitter, Linkedin } from "lucide-react" // Added Facebook, Twitter, Linkedin
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
// Assuming translations object and useLanguage hook are available for date formatting or other i18n needs
// import { useLanguage } from "@/lib/i18n/language-context"
import { useEffect, useState } from "react"

// Dummy related posts for now - this should also be dynamic in a real app
const relatedPosts = [
  {
    id: 2,
    title: "Understanding Biodegradation: How Compostable Plastics Break Down",
    slug: "understanding-biodegradation-compostable-plastics",
    excerpt:
      "A detailed look at the science behind biodegradation and how compostable plastics return to nature without harmful residues.",
    image: "/microbial-decomposition.png", // Ensure this image exists in /public
    date: "March 22, 2023",
  },
  {
    id: 4,
    title: "5 Ways Businesses Can Reduce Their Plastic Footprint",
    slug: "5-ways-businesses-reduce-plastic-footprint",
    excerpt:
      "Practical strategies for businesses looking to minimize their plastic usage and transition to more sustainable alternatives.",
    image: "/business-sustainability.png",
    date: "January 18, 2023",
  },
]

type BlogPostPageProps = {
  params: { slug: string; locale: string } // Added locale
  blogPost: any
}

export default function BlogPostClient({ params, blogPost }: BlogPostPageProps) {
  // const { t, currentLanguage } = useLanguage(); // If needed for client-side translations or date formatting

  if (!blogPost) {
    notFound()
  }

  const formattedDate = blogPost.publish_date
    ? new Date(blogPost.publish_date).toLocaleDateString(params.locale || "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available"

  // Estimate read time (simple version)
  const wordsPerMinute = 200
  const numberOfWords = blogPost.content?.split(/\s/g).length || 0
  const readTimeMinutes = Math.ceil(numberOfWords / wordsPerMinute)
  const readTime = `${readTimeMinutes} min read`

  const [currentURL, setCurrentURL] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.href)
    }
  }, [])

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Link href={`/${params.locale}/blog`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="mb-8">
            {blogPost.featured_image && (
              <div className="relative aspect-[16/9] w-full mb-6">
                <Image
                  src={blogPost.featured_image || "/placeholder.svg"}
                  alt={blogPost.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                {blogPost.category && (
                  <Badge variant="outline" className="bg-green-50">
                    {blogPost.category}
                  </Badge>
                )}
                {blogPost.category && <Separator orientation="vertical" className="h-4" />}
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
                <Separator orientation="vertical" className="h-4" />
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{blogPost.title}</h1>

              {/* Author section - assuming author details might come from a related 'profiles' table or are part of blog_posts */}
              {/* For now, let's use placeholder or skip if not directly in blogPost object */}
              {/* 
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={blogPost.authorImage || "/placeholder.svg"} // Replace with actual author image field
                    alt={blogPost.authorName || "Author"} // Replace with actual author name field
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{blogPost.authorName || "AICMT Team"}</p>
                  <p className="text-sm text-gray-500">{blogPost.authorTitle || "Content Contributor"}</p>
                </div>
              </div>
              */}
            </div>
          </div>

          {/* Content */}
          {blogPost.content && (
            <div className="prose prose-green max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </div>
          )}

          {/* Tags */}
          {blogPost.tags && blogPost.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-gray-500" />
                {blogPost.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-green-50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <span className="font-medium">Share this article:</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(blogPost.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentURL)}&title=${encodeURIComponent(blogPost.title)}&summary=${encodeURIComponent(blogPost.excerpt || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Link>
              </Button>
              {/* A generic share button might require client-side JS for navigator.share or copying link */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() =>
                  typeof navigator !== "undefined" &&
                  navigator.share &&
                  navigator.share({ title: blogPost.title, text: blogPost.excerpt, url: currentURL })
                }
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share via link</span>
              </Button>
            </div>
          </div>
        </article>

        {/* Related posts - This section should also be made dynamic */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {relatedPosts.map(
              (
                post, // Keep static related posts for now
              ) => (
                <Card key={post.id} className="overflow-hidden">
                  {post.image && (
                    <div className="relative aspect-video w-full">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                  )}
                  <CardHeader>
                    {post.date && <div className="text-xs text-gray-500 mb-1">{post.date}</div>}
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/${params.locale}/blog/${post.slug}`}>
                      <Button variant="outline" size="sm">
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
