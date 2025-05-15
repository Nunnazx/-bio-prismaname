import { ArrowLeft, Calendar, Clock, User, ChevronLeft, ChevronRight, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { OptimizedImage } from "@/components/optimized-image"
import { TranslatedText } from "@/components/translated-text"

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Compostable Plastics in a Circular Economy",
    slug: "future-compostable-plastics-circular-economy",
    excerpt:
      "Explore how compostable plastics are playing a crucial role in the transition to a circular economy and reducing plastic pollution.",
    image: "/eco-friendly-packaging.png",
    date: "April 15, 2023",
    author: "Dr. Priya Sharma",
    readTime: "8 min read",
    category: "Sustainability",
    tags: ["Circular Economy", "Plastic Alternatives", "Sustainability"],
  },
  {
    id: 2,
    title: "Understanding Biodegradation: How Compostable Plastics Break Down",
    slug: "understanding-biodegradation-compostable-plastics",
    excerpt:
      "A detailed look at the science behind biodegradation and how compostable plastics return to nature without harmful residues.",
    image: "/microbial-decomposition.png",
    date: "March 22, 2023",
    author: "Rajesh Kumar",
    readTime: "6 min read",
    category: "Education",
    tags: ["Biodegradation", "Science", "Composting"],
  },
  {
    id: 3,
    title: "AICMT Receives MSME ZED Bronze Certification",
    slug: "aicmt-receives-msme-zed-bronze-certification",
    excerpt:
      "We're proud to announce that AICMT International has been awarded the MSME ZED Bronze certification for our zero efficiency defects production process.",
    image: "/celebrating-success.png",
    date: "February 10, 2023",
    author: "Amit Patel",
    readTime: "4 min read",
    category: "Company News",
    tags: ["Certification", "Achievement", "Quality"],
  },
  {
    id: 4,
    title: "5 Ways Businesses Can Reduce Their Plastic Footprint",
    slug: "5-ways-businesses-reduce-plastic-footprint",
    excerpt:
      "Practical strategies for businesses looking to minimize their plastic usage and transition to more sustainable alternatives.",
    image: "/interconnected-sustainable-growth.png",
    date: "January 18, 2023",
    author: "Sunita Reddy",
    readTime: "5 min read",
    category: "Tips & Guides",
    tags: ["Business Sustainability", "Plastic Reduction", "Best Practices"],
  },
  {
    id: 5,
    title: "The Impact of India's Plastic Ban on Packaging Industry",
    slug: "impact-india-plastic-ban-packaging-industry",
    excerpt:
      "An analysis of how India's single-use plastic ban is reshaping the packaging industry and creating opportunities for sustainable alternatives.",
    image: "/plastic-ban-awareness.png",
    date: "December 5, 2022",
    author: "Vikram Singh",
    readTime: "7 min read",
    category: "Industry Insights",
    tags: ["Plastic Ban", "Regulations", "Industry Trends"],
  },
  {
    id: 6,
    title: "Case Study: How GreenRetail Reduced Plastic Waste by 85%",
    slug: "case-study-greenretail-reduced-plastic-waste",
    excerpt:
      "Learn how GreenRetail Solutions partnered with AICMT to replace conventional plastic bags with compostable alternatives, significantly reducing their environmental impact.",
    image: "/sustainable-retail-display.png",
    date: "November 12, 2022",
    author: "Dr. Priya Sharma",
    readTime: "9 min read",
    category: "Case Studies",
    tags: ["Success Story", "Retail", "Waste Reduction"],
  },
]

// Categories for sidebar
const categories = [
  { name: "Sustainability", count: 12 },
  { name: "Education", count: 8 },
  { name: "Company News", count: 5 },
  { name: "Tips & Guides", count: 7 },
  { name: "Industry Insights", count: 9 },
  { name: "Case Studies", count: 4 },
]

// Popular tags
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

export default function BlogPage({ params }: { params: { locale: string } }) {
  const { locale } = params

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <TranslatedText id="common.backToHome" />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <TranslatedText id="blog.title" fallback="Blog & News" />
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl">
            <TranslatedText
              id="blog.subtitle"
              fallback="Insights, updates, and resources on compostable plastics and sustainability"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Main content - Blog posts */}
          <div className="md:col-span-2">
            <div className="grid gap-8">
              {/* Featured post */}
              <Card className="overflow-hidden">
                <div className="relative aspect-video w-full">
                  <OptimizedImage
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{blogPosts[0].date}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <User className="h-4 w-4" />
                    <span>{blogPosts[0].author}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <Clock className="h-4 w-4" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <CardTitle className="text-2xl">{blogPosts[0].title}</CardTitle>
                  <CardDescription>{blogPosts[0].excerpt}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {blogPosts[0].tags.map((tag, index) => (
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
                </CardFooter>
              </Card>

              {/* Regular posts */}
              <div className="grid gap-6 sm:grid-cols-2">
                {blogPosts.slice(1).map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="relative aspect-video w-full">
                      <OptimizedImage
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span>{post.date}</span>
                        <Separator orientation="vertical" className="h-3" />
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Link href={`/${locale}/blog/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          <TranslatedText id="blog.readMore" fallback="Read More" />
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
                    <TranslatedText id="blog.previous" fallback="Previous" />
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
                    <TranslatedText id="blog.next" fallback="Next" />
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
                <CardTitle>
                  <TranslatedText id="blog.search" fallback="Search" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input placeholder={`${locale === "en" ? "Search articles..." : "खोज लेख..."}`} />
                  <Button>
                    <Search className="h-4 w-4" />
                    <span className="sr-only">
                      <TranslatedText id="blog.search" fallback="Search" />
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <TranslatedText id="blog.categories" fallback="Categories" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        href={`/${locale}/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
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
                <CardTitle>
                  <TranslatedText id="blog.popularTags" fallback="Popular Tags" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Link key={index} href={`/${locale}/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
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
                <CardTitle>
                  <TranslatedText id="blog.subscribeNewsletter" fallback="Subscribe to Our Newsletter" />
                </CardTitle>
                <CardDescription>
                  <TranslatedText
                    id="blog.newsletterDescription"
                    fallback="Stay updated with the latest news and insights on sustainable plastics"
                  />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder={`${locale === "en" ? "Your email address" : "आपका ईमेल पता"}`} type="email" />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <TranslatedText id="blog.subscribe" fallback="Subscribe" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
