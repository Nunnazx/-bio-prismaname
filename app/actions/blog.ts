"use server"

import { prisma } from "@/lib/prisma"

// Get all blog posts from database
export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    // Convert dates to strings for serialization
    return posts.map(post => ({
      ...post,
      publishedAt: post.publishedAt?.toISOString() || null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      status: post.isPublished ? 'published' : 'draft'
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

// Get a blog post by slug
export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    if (!post) return null;

    return {
      ...post,
      publishedAt: post.publishedAt?.toISOString() || null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      status: post.isPublished ? 'published' : 'draft'
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}

// Create a new blog post
export async function createBlogPost(postData: any) {
  try {
    console.log("Creating blog post:", postData);
    return {
      id: "new-post-id",
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error creating blog post:", error)
    throw error
  }
}

// Update a blog post
export async function updateBlogPost(id: string, postData: any) {
  try {
    console.log(`Updating blog post ${id}:`, postData);
    return {
      id,
      ...postData,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error updating blog post with ID ${id}:`, error)
    throw error
  }
}

// Delete a blog post
export async function deleteBlogPost(id: string) {
  try {
    console.log(`Deleting blog post ${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting blog post with ID ${id}:`, error)
    throw error
  }
}

// Get related posts
export async function getRelatedPosts(currentPostId: string, category: string, limit: number = 3) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        AND: [
          { id: { not: currentPostId } },
          { category: category },
          { isPublished: true }
        ]
      },
      take: limit,
      orderBy: { publishedAt: 'desc' }
    });

    return posts.map(post => ({
      ...post,
      publishedAt: post.publishedAt?.toISOString() || null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    }));
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return []
  }
}

// Get blog categories with count
export async function getBlogCategoriesWithCount() {
  try {
    const categories = await prisma.blogPost.groupBy({
      by: ['category'],
      where: { isPublished: true },
      _count: { category: true }
    });

    return categories.map(cat => ({
      name: cat.category,
      count: cat._count.category
    }));
  } catch (error) {
    console.error("Error fetching blog categories:", error)
    return []
  }
}

// Get all tags
export async function getAllTags() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { tags: true }
    });

    const allTags = posts.flatMap(post => post.tags || []);
    return [...new Set(allTags)];
  } catch (error) {
    console.error("Error fetching tags:", error)
    return []
  }
}

// Get published blog posts
export async function getPublishedBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' }
    });

    return posts.map(post => ({
      ...post,
      publishedAt: post.publishedAt?.toISOString() || null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    }));
  } catch (error) {
    console.error("Error fetching published posts:", error)
    return []
  }
}