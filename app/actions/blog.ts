"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

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

export async function createBlogPost(postData) {
  const supabase = createClient()

  // Remove id field completely to let Supabase generate it
  if (postData.id === undefined || postData.id === null || postData.id === "") {
    delete postData.id
  }

  // Remove author_id if it's null or empty
  if (!postData.author_id) {
    delete postData.author_id
  }

  // Ensure created_at is set
  if (!postData.created_at) {
    postData.created_at = new Date().toISOString()
  }

  // Ensure updated_at is set
  postData.updated_at = new Date().toISOString()

  // Make sure we have a valid slug
  if (!postData.slug) {
    postData.slug = postData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
  }

  try {
    const { data, error } = await supabase.from("blog_posts").insert([postData]).select()

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
