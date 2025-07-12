import type { Metadata } from "next"
import { getBlogPostBySlug } from "@/app/actions/blog"
import BlogPostClientPage from "./BlogPostClientPage"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | AICMT International Blog",
    }
  }

  return {
    title: post.seo_title || `${post.title} | AICMT International Blog`,
    description: post.seo_description || post.excerpt || `Read about ${post.title} on AICMT International blog.`,
    keywords: post.seo_keywords || post.tags || [],
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read about ${post.title} on AICMT International blog.`,
      images: post.featured_image ? [{ url: post.featured_image }] : [],
      type: "article",
      publishedTime: post.publish_date || post.created_at,
      authors: post.author ? [`${post.author.first_name || ""} ${post.author.last_name || ""}`.trim()] : [],
      tags: post.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `Read about ${post.title} on AICMT International blog.`,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPostClientPage params={params} />
}
