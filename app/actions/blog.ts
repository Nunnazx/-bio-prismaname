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

export async function getBlogPost(slug: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching blog post:", error)
    throw new Error("Failed to fetch blog post")
  }

  return data
}

export async function createBlogPost(postData: any) {
  const supabase = createClient()

  const { data, error } = await supabase.from("blog_posts").insert([postData]).select()

  if (error) {
    console.error("Error creating blog post:", error)
    throw new Error("Failed to create blog post")
  }

  revalidatePath("/admin/blog")
  return data[0]
}

export async function updateBlogPost(id: string, postData: any) {
  const supabase = createClient()

  const { data, error } = await supabase.from("blog_posts").update(postData).eq("id", id).select()

  if (error) {
    console.error("Error updating blog post:", error)
    throw new Error("Failed to update blog post")
  }

  revalidatePath("/admin/blog")
  revalidatePath(`/admin/blog/${id}`)
  revalidatePath("/blog")
  revalidatePath(`/blog/${postData.slug}`)
  return data[0]
}

export async function deleteBlogPost(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog post:", error)
    throw new Error("Failed to delete blog post")
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  return { success: true }
}
