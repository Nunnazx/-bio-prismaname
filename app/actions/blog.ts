"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Define types
export type BlogPost = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  author_id: string | null
  category_id: string | null
  category?: { name: string; slug: string }
  tags: string[]
  status: "draft" | "published" | "archived"
  featured_image: string | null
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string[] | null
  publish_date: string | null
  created_at: string
  updated_at: string
  views_count: number
  author?: {
    id: string
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
  } | null
}

export type BlogCategory = {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
  updated_at: string
  post_count?: number
  color?: string
}

export type BlogComment = {
  id: string
  post_id: string
  user_id: string | null
  name: string
  email: string
  content: string
  is_approved: boolean
  created_at: string
  updated_at: string
  parent_id?: string
  status?: string
}

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

// Validation schemas
const BlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  slug: z.string().optional(),
  content: z.string().optional(),
  excerpt: z.string().optional().nullable(),
  author_id: z.string().uuid().optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  tags: z.array(z.string()).optional().default([]),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  featured_image: z.string().url().optional().nullable(),
  seo_title: z.string().max(70).optional().nullable(),
  seo_description: z.string().max(160).optional().nullable(),
  seo_keywords: z.array(z.string()).optional().nullable(),
  publish_date: z.string().optional().nullable(),
})

const BlogCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().optional(),
  description: z.string().optional().nullable(),
  color: z.string().optional().default("#10B981"),
})

const BlogCommentSchema = z.object({
  post_id: z.string().uuid("Invalid post ID"),
  user_id: z.string().uuid("Invalid user ID").optional().nullable(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  content: z.string().min(1, "Comment content is required"),
  is_approved: z.boolean().default(false),
  parent_id: z.string().uuid("Invalid parent ID").optional().nullable(),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
})

// Blog Post Actions
export async function getBlogPosts() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:author_id(id, first_name, last_name, avatar_url),
      category:category_id(id, name, slug)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    throw new Error("Failed to fetch blog posts")
  }

  return data as BlogPost[]
}

export async function getPublishedBlogPosts(limit?: number, offset?: number) {
  const supabase = createServerComponentClient({ cookies })

  let query = supabase
    .from("blog_posts")
    .select(`
      *,
      author:author_id(id, first_name, last_name, avatar_url),
      category:category_id(id, name, slug)
    `)
    .eq("status", "published")
    .order("publish_date", { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  if (offset) {
    query = query.range(offset, offset + (limit || 10) - 1)
  }

  const { data, error, count } = await query.returns<BlogPost[]>()

  if (error) {
    console.error("Error fetching published blog posts:", error)
    throw new Error("Failed to fetch published blog posts")
  }

  return { data, count }
}

export async function getBlogPost(id: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:author_id(id, first_name, last_name, avatar_url),
      category:category_id(id, name, slug)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching blog post:", error)
    throw new Error("Failed to fetch blog post")
  }

  return data as BlogPost
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:author_id(id, first_name, last_name, avatar_url),
      category:category_id(id, name, slug)
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.warn(`Failed to fetch blog post by slug "${slug}":`, error.message)
    return null
  }

  // Increment view count
  if (data) {
    await supabase
      .from("blog_posts")
      .update({ views_count: (data.views_count || 0) + 1 })
      .eq("id", data.id)
  }

  return data as BlogPost
}

export async function createBlogPost(formData: FormData) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const excerpt = formData.get("excerpt") as string
    const categoryId = formData.get("categoryId") as string
    const featuredImageUrl = formData.get("featuredImageUrl") as string
    const status = formData.get("status") as string
    const featured = formData.get("featured") === "true"
    const metaTitle = formData.get("metaTitle") as string
    const metaDescription = formData.get("metaDescription") as string
    const tags = formData.get("tags") as string

    if (!title || !content) {
      return { success: false, error: "Title and content are required" }
    }

    const slug = generateSlug(title)

    // Check if slug already exists
    const { data: existingPost } = await supabase.from("blog_posts").select("id").eq("slug", slug).single()

    if (existingPost) {
      return { success: false, error: "A post with this title already exists" }
    }

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: "User not authenticated" }
    }

    // Create blog post
    const { data: post, error: postError } = await supabase
      .from("blog_posts")
      .insert({
        title,
        slug,
        content,
        excerpt,
        category_id: categoryId || null,
        featured_image_url: featuredImageUrl || null,
        author_id: user.id,
        status: status || "draft",
        featured,
        meta_title: metaTitle || title,
        meta_description: metaDescription || excerpt,
        published_at: status === "published" ? new Date().toISOString() : null,
        reading_time: Math.ceil(content.split(" ").length / 200), // Estimate reading time
      })
      .select()
      .single()

    if (postError) {
      console.error("Error creating blog post:", postError)
      return { success: false, error: "Failed to create blog post" }
    }

    // Handle tags if provided
    if (tags && post) {
      const tagNames = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

      for (const tagName of tagNames) {
        const tagSlug = generateSlug(tagName)

        // Create tag if it doesn't exist
        const { data: existingTag } = await supabase.from("blog_tags").select("id").eq("slug", tagSlug).single()

        let tagId = existingTag?.id

        if (!existingTag) {
          const { data: newTag } = await supabase
            .from("blog_tags")
            .insert({ name: tagName, slug: tagSlug })
            .select("id")
            .single()

          tagId = newTag?.id
        }

        // Link tag to post
        if (tagId) {
          await supabase.from("blog_post_tags").insert({ post_id: post.id, tag_id: tagId })
        }
      }
    }

    revalidatePath("/admin/blog")
    return { success: true, data: post }
  } catch (error) {
    console.error("Error in createBlogPost:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const excerpt = formData.get("excerpt") as string
    const categoryId = formData.get("categoryId") as string
    const featuredImageUrl = formData.get("featuredImageUrl") as string
    const status = formData.get("status") as string
    const featured = formData.get("featured") === "true"
    const metaTitle = formData.get("metaTitle") as string
    const metaDescription = formData.get("metaDescription") as string
    const tags = formData.get("tags") as string

    if (!title || !content) {
      return { success: false, error: "Title and content are required" }
    }

    const slug = generateSlug(title)

    // Check if slug already exists for other posts
    const { data: existingPost } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .neq("id", id)
      .single()

    if (existingPost) {
      return { success: false, error: "A post with this title already exists" }
    }

    // Update blog post
    const { data: post, error: postError } = await supabase
      .from("blog_posts")
      .update({
        title,
        slug,
        content,
        excerpt,
        category_id: categoryId || null,
        featured_image_url: featuredImageUrl || null,
        status: status || "draft",
        featured,
        meta_title: metaTitle || title,
        meta_description: metaDescription || excerpt,
        published_at: status === "published" ? new Date().toISOString() : null,
        reading_time: Math.ceil(content.split(" ").length / 200),
      })
      .eq("id", id)
      .select()
      .single()

    if (postError) {
      console.error("Error updating blog post:", postError)
      return { success: false, error: "Failed to update blog post" }
    }

    // Update tags
    if (post) {
      // Remove existing tags
      await supabase.from("blog_post_tags").delete().eq("post_id", id)

      // Add new tags
      if (tags) {
        const tagNames = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)

        for (const tagName of tagNames) {
          const tagSlug = generateSlug(tagName)

          // Create tag if it doesn't exist
          const { data: existingTag } = await supabase.from("blog_tags").select("id").eq("slug", tagSlug).single()

          let tagId = existingTag?.id

          if (!existingTag) {
            const { data: newTag } = await supabase
              .from("blog_tags")
              .insert({ name: tagName, slug: tagSlug })
              .select("id")
              .single()

            tagId = newTag?.id
          }

          // Link tag to post
          if (tagId) {
            await supabase.from("blog_post_tags").insert({ post_id: id, tag_id: tagId })
          }
        }
      }
    }

    revalidatePath("/admin/blog")
    revalidatePath(`/blog/${slug}`)
    return { success: true, data: post }
  } catch (error) {
    console.error("Error in updateBlogPost:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deleteBlogPost(id: string) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) {
      console.error("Error deleting blog post:", error)
      return { success: false, error: "Failed to delete blog post" }
    }

    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error) {
    console.error("Error in deleteBlogPost:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// Blog Category Actions
export async function getBlogCategories() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from("blog_categories").select("*").order("name")

  if (error) {
    console.error("Error fetching blog categories:", error)
    throw new Error("Failed to fetch blog categories")
  }

  return data as BlogCategory[]
}

export async function getBlogCategoriesWithCount() {
  const supabase = createServerComponentClient({ cookies })

  // First get all categories
  const { data: categories, error: categoriesError } = await supabase.from("blog_categories").select("*").order("name")

  if (categoriesError) {
    console.error("Error fetching blog categories:", categoriesError)
    throw new Error("Failed to fetch blog categories")
  }

  // Then get post counts for each category
  const { data: posts, error: postsError } = await supabase
    .from("blog_posts")
    .select("category_id")
    .eq("status", "published")

  if (postsError) {
    console.error("Error fetching post counts:", postsError)
    throw new Error("Failed to fetch post counts")
  }

  // Count posts per category
  const categoryCounts: Record<string, number> = {}
  posts.forEach((post) => {
    if (post.category_id) {
      categoryCounts[post.category_id] = (categoryCounts[post.category_id] || 0) + 1
    }
  })

  // Add counts to categories
  const categoriesWithCount = categories.map((category) => ({
    ...category,
    post_count: categoryCounts[category.id] || 0,
  }))

  return categoriesWithCount as (BlogCategory & { post_count: number })[]
}

export async function getBlogCategory(id: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from("blog_categories").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching blog category:", error)
    throw new Error("Failed to fetch blog category")
  }

  return data as BlogCategory
}

export async function getBlogCategoryBySlug(slug: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from("blog_categories").select("*").eq("slug", slug).single()

  if (error) {
    console.warn(`Failed to fetch blog category by slug "${slug}":`, error.message)
    return null
  }

  return data as BlogCategory
}

export async function createBlogCategory(formData: FormData) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const color = formData.get("color") as string

    if (!name) {
      return { success: false, error: "Category name is required" }
    }

    const slug = generateSlug(name)

    const { data, error } = await supabase
      .from("blog_categories")
      .insert({
        name,
        slug,
        description,
        color: color || "#10B981",
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating blog category:", error)
      return { success: false, error: "Failed to create category" }
    }

    revalidatePath("/admin/blog/categories")
    return { success: true, data }
  } catch (error) {
    console.error("Error in createBlogCategory:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updateBlogCategory(id: string, formData: FormData) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const color = formData.get("color") as string

    if (!name) {
      return { success: false, error: "Category name is required" }
    }

    const slug = generateSlug(name)

    const { data, error } = await supabase
      .from("blog_categories")
      .update({
        name,
        slug,
        description,
        color: color || "#10B981",
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating blog category:", error)
      return { success: false, error: "Failed to update category" }
    }

    revalidatePath("/admin/blog/categories")
    return { success: true, data }
  } catch (error) {
    console.error("Error in updateBlogCategory:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deleteBlogCategory(id: string) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { error } = await supabase.from("blog_categories").delete().eq("id", id)

    if (error) {
      console.error("Error deleting blog category:", error)
      return { success: false, error: "Failed to delete category" }
    }

    revalidatePath("/admin/blog/categories")
    return { success: true }
  } catch (error) {
    console.error("Error in deleteBlogCategory:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// Blog Comment Actions
export async function getBlogComments(postId?: string, isApproved?: boolean) {
  const supabase = createServerComponentClient({ cookies })

  let query = supabase.from("blog_comments").select("*").order("created_at", { ascending: false })

  if (postId) {
    query = query.eq("post_id", postId)
  }

  if (isApproved !== undefined) {
    query = query.eq("status", isApproved ? "approved" : "pending")
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching blog comments:", error)
    throw new Error("Failed to fetch blog comments")
  }

  return data as BlogComment[]
}

export async function createBlogComment(formData: FormData) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const postId = formData.get("postId") as string
    const authorName = formData.get("authorName") as string
    const authorEmail = formData.get("authorEmail") as string
    const content = formData.get("content") as string
    const parentId = formData.get("parentId") as string

    if (!postId || !authorName || !authorEmail || !content) {
      return { success: false, error: "All fields are required" }
    }

    const { data, error } = await supabase
      .from("blog_comments")
      .insert({
        post_id: postId,
        author_name: authorName,
        author_email: authorEmail,
        content,
        parent_id: parentId || null,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating blog comment:", error)
      return { success: false, error: "Failed to submit comment" }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in createBlogComment:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updateCommentStatus(id: string, status: string) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { data, error } = await supabase.from("blog_comments").update({ status }).eq("id", id).select().single()

    if (error) {
      console.error("Error updating comment status:", error)
      return { success: false, error: "Failed to update comment status" }
    }

    revalidatePath("/admin/blog/comments")
    return { success: true, data }
  } catch (error) {
    console.error("Error in updateCommentStatus:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deleteBlogComment(id: string) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { error } = await supabase.from("blog_comments").delete().eq("id", id)

    if (error) {
      console.error("Error deleting blog comment:", error)
      return { success: false, error: "Failed to delete comment" }
    }

    revalidatePath("/admin/blog/comments")
    return { success: true }
  } catch (error) {
    console.error("Error in deleteBlogComment:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// --- Compatibility wrappers -------------------------------------------------

/**
 * Approve a comment (alias for updateCommentStatus with "approved").
 * Exposed to keep backward-compatibility with earlier imports.
 */
export async function approveComment(id: string) {
  return updateCommentStatus(id, "approved")
}

/**
 * Delete a comment (alias for deleteBlogComment).
 * Exposed to keep backward-compatibility with earlier imports.
 */
export async function deleteComment(id: string) {
  return deleteBlogComment(id)
}

// Utility function to increment post views
export async function incrementPostViews(slug: string) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { error } = await supabase
      .from("blog_posts")
      .update({ views_count: supabase.sql`views_count + 1` })
      .eq("slug", slug)

    if (error) {
      console.error("Error incrementing post views:", error)
    }
  } catch (error) {
    console.error("Error in incrementPostViews:", error)
  }
}

// Tag-related actions
export async function getAllTags() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from("blog_posts")
    .select("tags")
    .eq("status", "published")
    .not("tags", "is", null)

  if (error) {
    console.error("Error fetching tags:", error)
    return []
  }

  // Flatten and count tags
  const allTags = data.flatMap((post) => post.tags || [])
  const tagCounts: Record<string, number> = {}

  allTags.forEach((tag) => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1
  })

  // Convert to array of objects with name and count
  const tagsWithCount = Object.entries(tagCounts).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  }))

  // Sort by count (most popular first)
  return tagsWithCount.sort((a, b) => b.count - a.count)
}

export async function getPostsByTag(tag: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:author_id(id, first_name, last_name, avatar_url),
      category:category_id(id, name, slug)
    `)
    .eq("status", "published")
    .contains("tags", [tag])
    .order("publish_date", { ascending: false })

  if (error) {
    console.error("Error fetching posts by tag:", error)
    throw new Error("Failed to fetch posts by tag")
  }

  return data as BlogPost[]
}

export async function getPostsByCategory(categoryId: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:author_id(id, first_name, last_name, avatar_url),
      category:category_id(id, name, slug)
    `)
    .eq("status", "published")
    .eq("category_id", categoryId)
    .order("publish_date", { ascending: false })

  if (error) {
    console.error("Error fetching posts by category:", error)
    throw new Error("Failed to fetch posts by category")
  }

  return data as BlogPost[]
}

export async function getPostsByCategorySlug(slug: string) {
  const supabase = createServerComponentClient({ cookies })

  // First get the category
  const { data: category, error: categoryError } = await supabase
    .from("blog_categories")
    .select("id")
    .eq("slug", slug)
    .single()

  if (categoryError || !category) {
    console.error("Error fetching category by slug:", categoryError)
    throw new Error("Failed to fetch category by slug")
  }

  // Then get posts in that category
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:author_id(id, first_name, last_name, avatar_url),
      category:category_id(id, name, slug)
    `)
    .eq("status", "published")
    .eq("category_id", category.id)
    .order("publish_date", { ascending: false })

  if (error) {
    console.error("Error fetching posts by category slug:", error)
    throw new Error("Failed to fetch posts by category slug")
  }

  return data as BlogPost[]
}

// Search
export async function searchBlogPosts(query: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:author_id(id, first_name, last_name, avatar_url),
      category:category_id(id, name, slug)
    `)
    .eq("status", "published")
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .order("publish_date", { ascending: false })

  if (error) {
    console.error("Error searching blog posts:", error)
    throw new Error("Failed to search blog posts")
  }

  return data as BlogPost[]
}

// Blog statistics
export async function getBlogStats() {
  const supabase = createServerComponentClient({ cookies })

  // Get total posts
  const { count: totalPosts, error: totalError } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })

  // Get published posts
  const { count: publishedPosts, error: publishedError } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("status", "published")

  // Get draft posts
  const { count: draftPosts, error: draftError } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("status", "draft")

  // Get categories count
  const { count: categoriesCount, error: categoriesError } = await supabase
    .from("blog_categories")
    .select("*", { count: "exact", head: true })

  // Get comments count
  const { count: commentsCount, error: commentsError } = await supabase
    .from("blog_comments")
    .select("*", { count: "exact", head: true })

  if (totalError || publishedError || draftError || categoriesError || commentsError) {
    console.error(
      "Error fetching blog stats:",
      totalError || publishedError || draftError || categoriesError || commentsError,
    )
    throw new Error("Failed to fetch blog stats")
  }

  return {
    total: totalPosts || 0,
    published: publishedPosts || 0,
    drafts: draftPosts || 0,
    categories: categoriesCount || 0,
    comments: commentsCount || 0,
  }
}

// Get related posts
export async function getRelatedPosts(postId: string, limit = 3) {
  const supabase = createServerComponentClient({ cookies })

  // First get the current post to get its tags and category
  const { data: currentPost, error: postError } = await supabase
    .from("blog_posts")
    .select("tags, category_id")
    .eq("id", postId)
    .single()

  if (postError || !currentPost) {
    console.error("Error fetching current post:", postError)
    throw new Error("Failed to fetch current post")
  }

  // Find posts with the same category or tags
  let query = supabase
    .from("blog_posts")
    .select(`
      *,
      author:author_id(id, first_name, last_name, avatar_url),
      category:category_id(id, name, slug)
    `)
    .eq("status", "published")
    .neq("id", postId)
    .order("publish_date", { ascending: false })
    .limit(limit)

  if (currentPost.category_id) {
    query = query.eq("category_id", currentPost.category_id)
  } else if (currentPost.tags && currentPost.tags.length > 0) {
    query = query.overlaps("tags", currentPost.tags)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching related posts:", error)
    throw new Error("Failed to fetch related posts")
  }

  // If we don't have enough related posts, get recent posts
  if (data.length < limit) {
    const neededPosts = limit - data.length
    const existingIds = [postId, ...data.map((p) => p.id)]

    const { data: recentPosts, error: recentError } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:author_id(id, first_name, last_name, avatar_url),
        category:category_id(id, name, slug)
      `)
      .eq("status", "published")
      .not("id", "in", `(${existingIds.map((id) => `"${id}"`).join(",")})`)
      .order("publish_date", { ascending: false })
      .limit(neededPosts)

    if (recentError) {
      console.error("Error fetching recent posts:", recentError)
    } else if (recentPosts) {
      data.push(...recentPosts)
    }
  }

  return data as BlogPost[]
}
