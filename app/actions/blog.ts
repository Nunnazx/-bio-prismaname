"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const BlogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(), // Or .regex(/^[a-z0-9-]+$/, "Invalid slug format") if you have specific rules
  content: z.string().optional(),
  author_id: z.string().uuid().optional().nullable(),
  featured_image: z.string().url().optional().nullable(),
  excerpt: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
  seo_keywords: z.string().optional().nullable(),
  // id and created_at/updated_at are usually handled by the DB or later in the logic
})

export async function getBlogPosts() {
  const supabase = createClient()

  const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    throw new Error("Failed to fetch blog posts")
  }

  return data
}

export async function getBlogPost(id) {
  const supabase = createClient()

  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching blog post:", error)
    throw new Error("Failed to fetch blog post")
  }

  return data
}

export async function getBlogPostBySlug(slug) {
  const supabase = createClient()

  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching blog post:", error)
    throw new Error("Failed to fetch blog post")
  }

  return data
}

export async function createBlogPost(formData: FormData) {
  // Or pass raw object if not using FormData directly
  const supabase = createClient()

  // Convert FormData to an object if necessary, or expect an object directly
  // For this example, assuming postData is an object derived from the form/request
  const rawData = Object.fromEntries(formData.entries()) // Example if using FormData

  // Clean up fields before validation if they might be empty strings but should be null/undefined
  if (rawData.author_id === "") rawData.author_id = null
  if (rawData.featured_image === "") rawData.featured_image = null
  // ... and so on for other optional fields

  const validationResult = BlogPostSchema.safeParse(rawData)

  if (!validationResult.success) {
    console.error("Validation errors:", validationResult.error.flatten().fieldErrors)
    // Consider returning these errors for display in the form
    throw new Error(`Invalid blog post data: ${JSON.stringify(validationResult.error.flatten().fieldErrors)}`)
  }

  const postData = validationResult.data

  // Remove id field completely to let Supabase generate it
  // delete postData.id; // Zod schema doesn't include it, so it won't be there

  // Ensure created_at is set
  const finalPostData: any = {
    ...postData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // Make sure we have a valid slug
  if (!finalPostData.slug && finalPostData.title) {
    finalPostData.slug = finalPostData.title
      .toLowerCase()
      .replace(/[^\w\s-]/gi, "") // Allow hyphens in slug
      .replace(/\s+/g, "-")
  }
  // The rest of your createBlogPost logic...
  // Use finalPostData for insertion
  try {
    const { data, error } = await supabase.from("blog_posts").insert([finalPostData]).select()

    if (error) {
      console.error("Error creating blog post:", error)
      throw new Error(`Failed to create blog post: ${error.message}`)
    }

    // Revalidate all relevant paths
    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    revalidatePath(`/blog/${postData.slug}`)

    // Also revalidate localized paths
    revalidatePath("/[locale]/blog")
    revalidatePath("/[locale]/blog/[slug]")

    return data[0]
  } catch (error) {
    console.error("Error in createBlogPost:", error)
    throw error
  }
}

export async function updateBlogPost(id, postData) {
  const supabase = createClient()

  // Don't update the ID
  if (postData.id) {
    delete postData.id
  }

  // Remove author_id if it's null or empty
  if (!postData.author_id) {
    delete postData.author_id
  }

  // Ensure updated_at is set
  postData.updated_at = new Date().toISOString()

  try {
    const { data, error } = await supabase.from("blog_posts").update(postData).eq("id", id).select()

    if (error) {
      console.error("Error updating blog post:", error)
      throw new Error(`Failed to update blog post: ${error.message}`)
    }

    // Revalidate all relevant paths
    revalidatePath("/admin/blog")
    revalidatePath(`/admin/blog/edit/${id}`)
    revalidatePath("/blog")
    revalidatePath(`/blog/${postData.slug}`)

    // Also revalidate localized paths
    revalidatePath("/[locale]/blog")
    revalidatePath("/[locale]/blog/[slug]")

    return data[0]
  } catch (error) {
    console.error("Error in updateBlogPost:", error)
    throw error
  }
}

export async function deleteBlogPost(id) {
  const supabase = createClient()

  // First get the post to know its slug for revalidation
  const { data: post, error: fetchError } = await supabase.from("blog_posts").select("slug").eq("id", id).single()

  if (fetchError) {
    console.error("Error fetching blog post for deletion:", fetchError)
  }

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog post:", error)
    throw new Error(`Failed to delete blog post: ${error.message}`)
  }

  // Revalidate all relevant paths
  revalidatePath("/admin/blog")
  revalidatePath("/blog")

  if (post?.slug) {
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath("/[locale]/blog/[slug]")
  }

  revalidatePath("/[locale]/blog")

  return { success: true }
}
