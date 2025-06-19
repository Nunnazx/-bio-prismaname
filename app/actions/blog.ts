"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const BlogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(), // Or .regex(/^[a-z0-9-]+$/, "Invalid slug format") if you have specific rules
  content: z.string().optional(),
  author_id: z.string().uuid().optional().nullable(),
  category: z.string().optional().nullable(),
  featured_image: z.string().url().optional().nullable(),
  excerpt: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
  seo_keywords: z.array(z.string()).optional().nullable(), // Changed to array of strings
  published_at: z.string().datetime({ offset: true }).optional().nullable(), // Changed from publish_date
  // id and created_at/updated_at are usually handled by the DB or later in the logic
})

export async function getBlogPosts() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `
*,
author:profiles ( full_name )
`,
    )
    .order("publish_date", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    throw new Error("Failed to fetch blog posts")
  }

  return data
}

export async function getBlogPost(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `
*,
author:profiles ( full_name, avatar_url )
`,
    )
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching blog post:", error)
    throw new Error("Failed to fetch blog post")
  }

  return data
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `
*,
author:profiles ( full_name, avatar_url )
`,
    )
    .eq("slug", slug)
    .single()

  if (error) {
    // This error is expected when no post is found, page.tsx will handle it.
    console.warn(`Failed to fetch blog post by slug "${slug}":`, error.message)
    return null
  }

  return data
}

export async function createBlogPost(formData: FormData) {
  const supabase = createClient()

  const rawData = Object.fromEntries(formData.entries())

  // Convert tags and keywords from comma-separated string to array
  if (typeof rawData.tags === "string") {
    rawData.tags = rawData.tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }
  if (typeof rawData.seo_keywords === "string") {
    rawData.seo_keywords = rawData.seo_keywords
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }

  const validationResult = BlogPostSchema.safeParse(rawData)

  if (!validationResult.success) {
    console.error("Validation errors:", validationResult.error.flatten().fieldErrors)
    return { error: `Invalid blog post data: ${JSON.stringify(validationResult.error.flatten().fieldErrors)}` }
  }

  const postData = validationResult.data

  const finalPostData: any = {
    ...postData,
  }

  if (!finalPostData.slug && finalPostData.title) {
    finalPostData.slug = finalPostData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 50)
  }

  const { data, error } = await supabase.from("blog_posts").insert([finalPostData]).select().single()

  if (error) {
    console.error("Error creating blog post:", error)
    return { error: `Failed to create blog post: ${error.message}` }
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  if (data?.slug) {
    revalidatePath(`/blog/${data.slug}`)
  }

  return { data }
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = createClient()

  const rawData = Object.fromEntries(formData.entries())

  // Convert tags and keywords from comma-separated string to array
  if (typeof rawData.tags === "string") {
    rawData.tags = rawData.tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }
  if (typeof rawData.seo_keywords === "string") {
    rawData.seo_keywords = rawData.seo_keywords
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }

  // Don't allow changing the ID
  delete rawData.id

  const validationResult = BlogPostSchema.partial().safeParse(rawData)

  if (!validationResult.success) {
    console.error("Validation errors:", validationResult.error.flatten().fieldErrors)
    return { error: `Invalid blog post data: ${JSON.stringify(validationResult.error.flatten().fieldErrors)}` }
  }

  const postData = validationResult.data
  postData.updated_at = new Date().toISOString()

  const { data, error } = await supabase.from("blog_posts").update(postData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating blog post:", error)
    return { error: `Failed to update blog post: ${error.message}` }
  }

  revalidatePath("/admin/blog")
  revalidatePath(`/admin/blog/edit/${id}`)
  revalidatePath("/blog")
  if (data?.slug) {
    revalidatePath(`/blog/${data.slug}`)
  }

  return { data }
}

export async function deleteBlogPost(id: string) {
  const supabase = createClient()

  const { data: post, error: fetchError } = await supabase.from("blog_posts").select("slug").eq("id", id).single()

  if (fetchError) {
    console.error("Error fetching blog post for deletion:", fetchError)
  }

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog post:", error)
    return { error: `Failed to delete blog post: ${error.message}` }
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  if (post?.slug) {
    revalidatePath(`/blog/${post.slug}`)
  }

  return { success: true }
}
