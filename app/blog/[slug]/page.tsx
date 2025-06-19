import { getBlogPostBySlug } from "@/app/actions/blog"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BlogPostClient from "./BlogPostClient"

type BlogPostPageProps = {
  params: { slug: string; locale: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const blogPost = await getBlogPostBySlug(params.slug)

  if (!blogPost) {
    return {
      title: "Blog Post Not Found",
    }
  }

  const authorName = Array.isArray(blogPost.author) ? "AICMT Team" : blogPost.author?.full_name || "AICMT Team"

  return {
    title: blogPost.seo_title || blogPost.title,
    description: blogPost.seo_description || blogPost.excerpt,
    keywords: blogPost.seo_keywords || blogPost.tags || [],
    authors: [{ name: authorName }],
    openGraph: {
      title: blogPost.seo_title || blogPost.title,
      description: blogPost.seo_description || blogPost.excerpt || "",
      url: `/${params.locale}/blog/${params.slug}`,
      siteName: "AICMT",
      images: blogPost.featured_image ? [blogPost.featured_image] : ["/blog-post-concept.png"],
      locale: params.locale,
      type: "article",
      publishedTime: blogPost.publish_date || blogPost.created_at,
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.seo_title || blogPost.title,
      description: blogPost.seo_description || blogPost.excerpt || "",
      images: blogPost.featured_image ? [blogPost.featured_image] : ["/blog-post-concept.png"],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blogPost = await getBlogPostBySlug(params.slug)

  // If no post is found, render the 404 page.
  if (!blogPost) {
    notFound()
  }

  return <BlogPostClient params={params} blogPost={blogPost} />
}
