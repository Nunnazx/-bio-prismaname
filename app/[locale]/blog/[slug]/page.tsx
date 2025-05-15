import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/optimized-image"
import { TranslatedText } from "@/components/translated-text"

// Sample blog post data
const getBlogPost = (slug: string) => {
  // In a real application, this would fetch from an API or database
  return {
    title: "The Future of Compostable Plastics in a Circular Economy",
    slug: "future-compostable-plastics-circular-economy",
    content: `
      <p>The global plastic crisis has reached unprecedented levels, with millions of tons of plastic waste entering our oceans and ecosystems every year. As the environmental impact of conventional plastics becomes increasingly apparent, the search for sustainable alternatives has intensified. Compostable plastics have emerged as a promising solution, offering the convenience of traditional plastics while addressing end-of-life concerns.</p>
      
      <h2>What Makes Plastics Compostable?</h2>
      
      <p>Compostable plastics are designed to break down completely in composting conditions, leaving no toxic residues behind. Unlike conventional plastics derived from fossil fuels, compostable plastics are typically made from renewable resources such as corn starch, sugarcane, or cellulose.</p>
      
      <p>The key difference between compostable plastics and other biodegradable materials lies in their certification standards. Truly compostable plastics must meet specific criteria regarding biodegradation time, disintegration, and ecotoxicity, as defined by international standards like EN 13432 or ASTM D6400.</p>
      
      <h2>The Role of Compostable Plastics in a Circular Economy</h2>
      
      <p>A circular economy aims to eliminate waste and continually reuse resources, moving away from the traditional linear "take-make-dispose" model. Compostable plastics fit perfectly within this framework by closing the loop on organic waste streams.</p>
      
      <p>When compostable plastics are disposed of alongside food waste, they can be processed in industrial composting facilities to create nutrient-rich compost. This compost can then be used to enrich soil, supporting agricultural production and completing the circular cycle.</p>
      
      <h2>Current Challenges and Future Directions</h2>
      
      <p>Despite their potential, compostable plastics face several challenges that must be addressed to maximize their environmental benefits:</p>
      
      <ul>
        <li><strong>Infrastructure Development:</strong> Many regions lack the industrial composting facilities needed to process compostable plastics properly.</li>
        <li><strong>Consumer Education:</strong> Clear labeling and education are essential to ensure consumers dispose of compostable plastics correctly.</li>
        <li><strong>Performance Improvements:</strong> Ongoing research aims to enhance the durability, heat resistance, and barrier properties of compostable plastics to expand their applications.</li>
      </ul>
      
      <p>The future of compostable plastics looks promising, with technological advancements continually improving their performance and reducing costs. As regulations on single-use plastics tighten globally, the demand for compostable alternatives is expected to grow significantly.</p>
      
      <h2>AICMT's Commitment to Sustainable Solutions</h2>
      
      <p>At AICMT International, we're dedicated to developing high-quality compostable plastic products that meet the highest international standards. Our research and development team works tirelessly to innovate new formulations that offer improved performance while maintaining complete compostability.</p>
      
      <p>By choosing AICMT's compostable plastics, businesses can reduce their environmental footprint while meeting consumer demand for sustainable packaging solutions. Together, we can contribute to a circular economy where waste is minimized, and resources are used efficiently.</p>
      
      <p>The transition to a circular economy requires collaboration across industries, governments, and consumers. Compostable plastics represent just one piece of the puzzle, but their potential impact on reducing plastic pollution and supporting sustainable waste management systems is significant.</p>
      
      <p>As we continue to face environmental challenges, innovative solutions like compostable plastics offer hope for a more sustainable future. By embracing these alternatives and supporting the infrastructure needed for their proper disposal, we can move closer to a truly circular economy.</p>
    `,
    image: "/eco-friendly-packaging.png",
    date: "April 15, 2023",
    author: "Dr. Priya Sharma",
    readTime: "8 min read",
    category: "Sustainability",
    tags: ["Circular Economy", "Plastic Alternatives", "Sustainability", "Innovation"],
    relatedPosts: [
      {
        id: 2,
        title: "Understanding Biodegradation: How Compostable Plastics Break Down",
        slug: "understanding-biodegradation-compostable-plastics",
        image: "/microbial-decomposition.png",
      },
      {
        id: 4,
        title: "5 Ways Businesses Can Reduce Their Plastic Footprint",
        slug: "5-ways-businesses-reduce-plastic-footprint",
        image: "/interconnected-sustainable-growth.png",
      },
      {
        id: 5,
        title: "The Impact of India's Plastic Ban on Packaging Industry",
        slug: "impact-india-plastic-ban-packaging-industry",
        image: "/plastic-ban-awareness.png",
      },
    ],
  }
}

export default function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params
  const post = getBlogPost(slug)

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

        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <Badge variant="outline">{post.category}</Badge>
            </div>
          </div>

          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
            <OptimizedImage
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <div
            className="prose prose-green max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex flex-wrap gap-2 pt-4">
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
        </article>

        <div className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold">
            <TranslatedText id="blog.relatedPosts" fallback="Related Posts" />
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {post.relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="overflow-hidden">
                <div className="relative aspect-video w-full">
                  <OptimizedImage
                    src={relatedPost.image}
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
      </div>
    </div>
  )
}
