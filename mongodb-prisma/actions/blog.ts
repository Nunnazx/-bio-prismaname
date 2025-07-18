"use server"

import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'
import { BlogStatus } from '@prisma/client'

// Get all blog posts with pagination and filtering
export async function getBlogPosts({
  page = 1,
  limit = 10,
  status,
  category,
  tag,
  search,
  sort = 'createdAt',
  order = 'desc'
}: {
  page?: number
  limit?: number
  status?: BlogStatus
  category?: string
  tag?: string
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
} = {}) {
  try {
    // Build filter conditions
    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (category) {
      where.category = category
    }
    
    if (tag) {
      where.tags = {
        has: tag
      }
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    // Count total matching posts
    const totalCount = await prisma.blogPost.count({ where })
    const totalPages = Math.ceil(totalCount / limit)
    
    // Get posts with pagination
    const posts = await prisma.blogPost.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sort]: order },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true
          }
        }
      }
    })
    
    return {
      posts,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw new Error('Failed to fetch blog posts')
  }
}

// Get a single blog post by ID or slug
export async function getBlogPost(identifier: string) {
  try {
    // Check if identifier is a MongoDB ObjectId (24 hex chars)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier)
    
    const post = await prisma.blogPost.findUnique({
      where: isObjectId ? { id: identifier } : { slug: identifier },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true
          }
        }
      }
    })
    
    if (!post) {
      throw new Error('Blog post not found')
    }
    
    return post
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw new Error('Failed to fetch blog post')
  }
}

// Create a new blog post
export async function createBlogPost(data: any, authorId: string) {
  try {
    // Generate slug if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
        
      // Check if slug exists and append number if needed
      const existingPost = await prisma.blogPost.findUnique({
        where: { slug: data.slug }
      })
      
      if (existingPost) {
        data.slug = `${data.slug}-${Date.now().toString().slice(-4)}`
      }
    }
    
    // Create the blog post
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags || [],
        featuredImage: data.featuredImage,
        gallery: data.gallery || [],
        status: data.status || BlogStatus.DRAFT,
        isPublished: data.status === BlogStatus.PUBLISHED,
        isFeatured: data.isFeatured || false,
        publishedAt: data.status === BlogStatus.PUBLISHED ? new Date() : null,
        scheduledAt: data.scheduledAt,
        seoTitle: data.seoTitle || data.title,
        seoDescription: data.seoDescription || data.excerpt,
        seoKeywords: data.seoKeywords || [],
        authorId
      }
    })
    
    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    
    return { success: true, post }
  } catch (error) {
    console.error('Error creating blog post:', error)
    return { success: false, error: error.message }
  }
}

// Update a blog post
export async function updateBlogPost(id: string, data: any) {
  try {
    // Check if slug is being changed and already exists
    if (data.slug) {
      const existingPost = await prisma.blogPost.findFirst({
        where: {
          slug: data.slug,
          id: { not: id }
        }
      })
      
      if (existingPost) {
        return { success: false, error: 'Slug already in use' }
      }
    }
    
    // Handle publishing status changes
    if (data.status === BlogStatus.PUBLISHED && !data.publishedAt) {
      data.publishedAt = new Date()
      data.isPublished = true
    }
    
    // Update the blog post
    const post = await prisma.blogPost.update({
      where: { id },
      data
    })
    
    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath('/admin/blog')
    revalidatePath(`/admin/blog/${id}`)
    
    return { success: true, post }
  } catch (error) {
    console.error('Error updating blog post:', error)
    return { success: false, error: error.message }
  }
}

// Delete a blog post
export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({
      where: { id }
    })
    
    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return { success: false, error: error.message }
  }
}

// Get blog statistics
export async function getBlogStats() {
  try {
    const [total, published, drafts] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: BlogStatus.PUBLISHED } }),
      prisma.blogPost.count({ where: { status: BlogStatus.DRAFT } })
    ])
    
    // Get unique categories
    const categories = await prisma.blogPost.groupBy({
      by: ['category'],
      _count: true,
      where: {
        category: {
          not: null
        }
      }
    })
    
    // Get all tags and count occurrences
    const posts = await prisma.blogPost.findMany({
      select: {
        tags: true
      }
    })
    
    const tagCounts: Record<string, number> = {}
    posts.forEach(post => {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    
    const tags = Object.entries(tagCounts).map(([tag, count]) => ({ tag, count }))
    
    // Get recent posts (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const recentCount = await prisma.blogPost.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })
    
    return {
      total,
      published,
      drafts,
      scheduled: await prisma.blogPost.count({ where: { status: BlogStatus.SCHEDULED } }),
      archived: await prisma.blogPost.count({ where: { status: BlogStatus.ARCHIVED } }),
      categories: categories.length,
      tags: tags.length,
      recentCount,
      featured: await prisma.blogPost.count({ where: { isFeatured: true } })
    }
  } catch (error) {
    console.error('Error fetching blog stats:', error)
    return {
      total: 0,
      published: 0,
      drafts: 0,
      scheduled: 0,
      archived: 0,
      categories: 0,
      tags: 0,
      recentCount: 0,
      featured: 0
    }
  }
}