import { getBlogPostBySlug } from "@/app/actions/blog" // Import the server action
import type { Metadata } from "next"
import BlogPostClient from "./BlogPostClient"

type BlogPostPageProps = {
  params: { slug: string; locale: string } // Added locale
}

// Generate dynamic metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const blogPost = await getBlogPostBySlug(params.slug)

  if (!blogPost) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: blogPost.seo_title || blogPost.title,
    description: blogPost.seo_description || blogPost.excerpt,
    keywords: blogPost.seo_keywords ? blogPost.seo_keywords.split(",") : blogPost.tags,
    openGraph: {
      title: blogPost.seo_title || blogPost.title,
      description: blogPost.seo_description || blogPost.excerpt,
      images: blogPost.featured_image ? [blogPost.featured_image] : ["/blog-post-concept.png"],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blogPost = await getBlogPostBySlug(params.slug)

  return <BlogPostClient params={params} blogPost={blogPost} />
}
