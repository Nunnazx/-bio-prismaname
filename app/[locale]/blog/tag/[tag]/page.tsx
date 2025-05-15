import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/optimized-image"
import { TranslatedText } from "@/components/translated-text"

// Sample blog posts data
const getBlogPosts = () => {
  // In a real application, this would fetch from an API or database
  return [
    {
      id: 1,
      title: "The Future of Compostable Plastics in a Circular Economy",
      slug: "future-compostable-plastics-circular-economy",
      excerpt:
        "Explore how compostable plastics are becoming a crucial component in the transition to a circular economy, reducing waste and environmental impact.",
      image: "/eco-friendly-packaging.png",
      date: "April 15, 2023",
      author: "Dr. Priya Sharma",
      category: "Sustainability",
      tags: ["Circular Economy", "Plastic Alternatives", "Sustainability", "Innovation"],
    },
    {
      id: 2,
      title: "Understanding Biodegradation: How Compostable Plastics Break Down",
      slug: "understanding-biodegradation-compostable-plastics",
      excerpt:
        "A detailed look at the science behind biodegradation and how compostable plastics return to nature through natural processes.",
      image: "/microbial-decomposition.png",
      date: "March 22, 2023",
      author: "Dr. Rajesh Kumar",
      category: "Science",
      tags: ["Biodegradation", "Composting", "Science", "Research"],
    },
    {
      id: 3,
      title: "Regulatory Landscape for Compostable Plastics in India",
      slug: "regulatory-landscape-compostable-plastics-india",
      excerpt:
        "An overview of the current regulations, certifications, and standards governing compostable plastics in India.",
      image: "/celebrating-success.png",
      date: "February 10, 2023",
      author: "Aditya Patel",
      category: "Regulation",
      tags: ["Regulation", "Certification", "India", "Policy"],
    },
    {
      id: 4,
      title: "5 Ways Businesses Can Reduce Their Plastic Footprint",
      slug: "5-ways-businesses-reduce-plastic-footprint",
      excerpt:
        "Practical strategies for businesses looking to minimize their plastic usage and transition to more sustainable alternatives.",
      image: "/interconnected-sustainable-growth.png",
      date: "January 18, 2023",
      author: "Neha Gupta",
      category: "Business",
      tags: ["Business", "Sustainability", "Plastic Reduction", "Best Practices"],
    },
    {
      id: 5,
      title: "The Impact of India's Plastic Ban on Packaging Industry",
      slug: "impact-india-plastic-ban-packaging-industry",
      excerpt:
        "How India's ban on single-use plastics is reshaping the packaging industry and creating opportunities for sustainable alternatives.",
      image: "/plastic-ban-awareness.png",
      date: "December 5, 2022",
      author: "Vikram Singh",
      category: "Industry",
      tags: ["Plastic Ban", "Packaging", "India", "Industry Trends"],
    },
    {
      id: 6,
      title: "Compostable vs. Biodegradable: Understanding the Difference",
      slug: "compostable-vs-biodegradable-understanding-difference",
      excerpt:
        "Clarifying the important distinctions between compostable and biodegradable materials, and why it matters for consumers and the environment.",
      image: "/sustainable-retail-display.png",
      date: "November 12, 2022",
      author: "Dr. Priya Sharma",
      category: "Education",
      tags: ["Compostable", "Biodegradable", "Education", "Sustainability"],
    },
  ]
}

export default function BlogTagPage({ params }: { params: { locale: string; tag: string } }) {
  const { locale, tag } = params
  const decodedTag = decodeURIComponent(tag).replace(/-/g, " ")
  const capitalizedTag = decodedTag
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Filter posts by tag (case-insensitive)
  const allPosts = getBlogPosts()
  const taggedPosts = allPosts.filter((post) => post.tags.some((t) => t.toLowerCase() === decodedTag.toLowerCase()))

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link href={`/${locale}/blog`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <TranslatedText id="blog.backToBlog" fallback="Back to Blog" />
            </Button>
          </Link>
        </div>

        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <Badge variant="outline" className="mr-3 bg-green-50 px-3 py-1 text-xl dark:bg-green-900/20">
              #{capitalizedTag}
            </Badge>
            <TranslatedText id="blog.taggedPosts" fallback="Tagged Posts" />
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
            <TranslatedText
              id="blog.showingPostsTagged"
              fallback={`Showing ${taggedPosts.length} posts tagged with "${capitalizedTag}"`}
              values={{ count: taggedPosts.length, tag: capitalizedTag }}
            />
          </p>
        </div>

        {taggedPosts.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-500">
              <TranslatedText id="blog.noPostsFound" fallback="No posts found with this tag." />
            </p>
            <Link href={`/${locale}/blog`} className="mt-4 inline-block">
              <Button>
                <TranslatedText id="blog.viewAllPosts" fallback="View All Posts" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {taggedPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <Link href={`/${locale}/blog/${post.slug}`} className="block">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <OptimizedImage
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center text-sm text-gray-500">
                    <time dateTime={post.date}>{post.date}</time>
                    <span className="mx-2">•</span>
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <Link href={`/${locale}/blog/${post.slug}`} className="block">
                    <h2 className="mb-3 line-clamp-2 text-xl font-bold">{post.title}</h2>
                  </Link>
                  <p className="mb-4 line-clamp-3 text-gray-500">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
