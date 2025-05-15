import { ArrowLeft, Calendar, Clock, Share2, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// This would normally come from a database or CMS
const blogPost = {
  id: 1,
  title: "The Future of Compostable Plastics in a Circular Economy",
  slug: "future-compostable-plastics-circular-economy",
  content: `
    <p>The global plastic crisis has reached alarming proportions, with millions of tons of plastic waste polluting our oceans, landfills, and ecosystems. As awareness of this issue grows, there's an increasing demand for sustainable alternatives that can help transition to a circular economy. Compostable plastics are emerging as a promising solution in this context.</p>
    
    <h2>What is a Circular Economy?</h2>
    
    <p>A circular economy is an economic system aimed at eliminating waste and the continual use of resources. It involves keeping products and materials in use, regenerating natural systems, and designing out waste and pollution. Unlike the traditional linear economy (make, use, dispose), a circular economy aims to create a closed-loop system where materials are reused, recycled, or composted.</p>
    
    <p>In the context of plastics, a circular economy approach involves:</p>
    
    <ul>
      <li>Reducing unnecessary plastic use</li>
      <li>Redesigning products for reuse and recyclability</li>
      <li>Improving collection and recycling systems</li>
      <li>Using alternative materials that can safely return to the environment</li>
    </ul>
    
    <h2>The Role of Compostable Plastics</h2>
    
    <p>Compostable plastics play a unique role in the circular economy by providing a sustainable end-of-life option for certain plastic applications. Here's how they contribute:</p>
    
    <h3>1. Addressing Hard-to-Recycle Plastics</h3>
    
    <p>Many plastic items, especially those that are food-contaminated or multi-layered, are difficult or economically unfeasible to recycle. Compostable alternatives ensure these items can still have a beneficial end-of-life by breaking down into valuable compost rather than persisting as waste.</p>
    
    <h3>2. Reducing Microplastic Pollution</h3>
    
    <p>Unlike conventional plastics that break down into microplastics, properly certified compostable plastics decompose completely into carbon dioxide, water, and biomass. This helps address the growing concern of microplastic pollution in our environment.</p>
    
    <h3>3. Supporting Organic Waste Diversion</h3>
    
    <p>Compostable plastics can help increase the capture rate of food waste for composting. When food packaging is compostable, consumers can dispose of both the food waste and packaging together, simplifying the waste sorting process and increasing participation in composting programs.</p>
    
    <h3>4. Closing the Nutrient Loop</h3>
    
    <p>In a true circular economy, nutrients from organic waste should return to the soil to support agriculture. Compostable plastics, when properly composted, contribute to this nutrient cycling rather than disrupting it.</p>
    
    <h2>Challenges and Considerations</h2>
    
    <p>While compostable plastics offer significant benefits, their successful integration into a circular economy requires addressing several challenges:</p>
    
    <h3>Infrastructure Development</h3>
    
    <p>The availability of industrial composting facilities varies widely across regions. Expanding this infrastructure is essential for compostable plastics to fulfill their potential.</p>
    
    <h3>Clear Labeling and Education</h3>
    
    <p>Consumers need clear guidance on how to properly dispose of compostable plastics. Improved labeling and education campaigns are necessary to prevent contamination in recycling streams and ensure compostable items reach appropriate processing facilities.</p>
    
    <h3>Standards and Certification</h3>
    
    <p>Robust standards and certification systems, such as those provided by CPCB in India and similar organizations globally, are crucial to ensure that products labeled as "compostable" truly break down as claimed.</p>
    
    <h2>The Future Outlook</h2>
    
    <p>The future of compostable plastics in a circular economy looks promising, with several trends emerging:</p>
    
    <h3>Technological Advancements</h3>
    
    <p>Ongoing research and development are improving the performance, versatility, and cost-effectiveness of compostable plastics, making them viable alternatives for a wider range of applications.</p>
    
    <h3>Policy Support</h3>
    
    <p>Governments worldwide are implementing policies that favor sustainable materials, including bans on single-use plastics and incentives for compostable alternatives. In India, the Plastic Waste Management Rules provide a supportive framework for the adoption of compostable plastics.</p>
    
    <h3>Market Growth</h3>
    
    <p>The global market for compostable plastics is projected to grow significantly in the coming years, driven by consumer demand, corporate sustainability commitments, and regulatory pressures.</p>
    
    <h2>Conclusion</h2>
    
    <p>Compostable plastics represent an important component of the transition to a circular economy, particularly for applications where conventional recycling is challenging. By providing a sustainable end-of-life option that returns nutrients to the soil rather than generating persistent waste, these materials help close the loop in our materials economy.</p>
    
    <p>At AICMT International, we're committed to advancing this transition through our range of high-quality compostable plastic solutions. By combining innovation, sustainability, and practicality, we aim to contribute to a future where plastics enhance our lives without compromising our environment.</p>
    
    <p>As we move forward, collaboration between manufacturers, policymakers, waste management systems, and consumers will be essential to fully realize the potential of compostable plastics in creating a more circular and sustainable economy.</p>
  `,
  image: "/eco-friendly-packaging.png",
  date: "April 15, 2023",
  author: "Dr. Priya Sharma",
  authorTitle: "Chief Technology Officer, AICMT International",
  authorImage: "/confident-professional.png",
  readTime: "8 min read",
  category: "Sustainability",
  tags: ["Circular Economy", "Plastic Alternatives", "Sustainability", "Innovation", "Waste Management"],
}

// Related posts
const relatedPosts = [
  {
    id: 2,
    title: "Understanding Biodegradation: How Compostable Plastics Break Down",
    slug: "understanding-biodegradation-compostable-plastics",
    excerpt:
      "A detailed look at the science behind biodegradation and how compostable plastics return to nature without harmful residues.",
    image: "/microbial-decomposition.png",
    date: "March 22, 2023",
  },
  {
    id: 4,
    title: "5 Ways Businesses Can Reduce Their Plastic Footprint",
    slug: "5-ways-businesses-reduce-plastic-footprint",
    excerpt:
      "Practical strategies for businesses looking to minimize their plastic usage and transition to more sustainable alternatives.",
    image: "/placeholder.svg?height=200&width=300&query=business sustainability practices",
    date: "January 18, 2023",
  },
  {
    id: 5,
    title: "The Impact of India's Plastic Ban on Packaging Industry",
    slug: "impact-india-plastic-ban-packaging-industry",
    excerpt:
      "An analysis of how India's single-use plastic ban is reshaping the packaging industry and creating opportunities for sustainable alternatives.",
    image: "/placeholder.svg?height=200&width=300&query=plastic ban india",
    date: "December 5, 2022",
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch the blog post based on the slug
  // For this example, we're using the static data above

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="mb-8">
            <div className="relative aspect-[16/9] w-full mb-6">
              <Image
                src={blogPost.image || "/placeholder.svg"}
                alt={blogPost.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Badge variant="outline" className="bg-green-50">
                  {blogPost.category}
                </Badge>
                <Separator orientation="vertical" className="h-4" />
                <Calendar className="h-4 w-4" />
                <span>{blogPost.date}</span>
                <Separator orientation="vertical" className="h-4" />
                <Clock className="h-4 w-4" />
                <span>{blogPost.readTime}</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{blogPost.title}</h1>

              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={blogPost.authorImage || "/placeholder.svg"}
                    alt={blogPost.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{blogPost.author}</p>
                  <p className="text-sm text-gray-500">{blogPost.authorTitle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-green max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-gray-500" />
              {blogPost.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-green-50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <span className="font-medium">Share this article:</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share via link</span>
              </Button>
            </div>
          </div>
        </article>

        {/* Related posts */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {relatedPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative aspect-video w-full">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="text-xs text-gray-500 mb-1">{post.date}</div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" size="sm">
                      Read Article
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
