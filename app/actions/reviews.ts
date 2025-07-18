"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Types
type ReviewFormData = {
  productId: string
  name: string
  email: string
  rating: number
  title: string
  content: string
  images?: string[]
}

type ReviewResponse = {
  reviewId: string
  content: string
}

// Create a new review
export async function createReview(formData: FormData) {
  try {
    // Get form data
    const productId = formData.get("productId") as string
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const rating = Number.parseInt(formData.get("rating") as string)
    const title = formData.get("title") as string
    const content = formData.get("content") as string

    // Validate form data
    if (!productId || !name || !email || !rating || !title || !content) {
      return { error: "All fields are required" }
    }

    if (rating < 1 || rating > 5) {
      return { error: "Rating must be between 1 and 5" }
    }

    // Insert review
    const review = await prisma.review.create({
      data: {
        productId,
        name,
        email,
        rating,
        title,
        content,
        status: "pending", // All reviews start as pending
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Handle images if any
    const images = formData.getAll("images") as File[]
    if (images && images.length > 0 && images[0].size > 0) {
      for (const image of images) {
        const fileName = `${Date.now()}-${image.name}`
        const imageUrl = `/uploads/reviews/${review.id}/${fileName}` // Mock URL

        // Insert image record
        await prisma.reviewImage.create({
          data: {
            reviewId: review.id,
            imageUrl,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        })
      }
    }

    // Revalidate product page
    revalidatePath(`/products/${productId}`)

    return { success: true, reviewId: review.id }
  } catch (error) {
    console.error("Error in createReview:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Update review status (admin only)
export async function updateReviewStatus(reviewId: string, status: "pending" | "approved" | "rejected") {
  try {
    // Update review status
    await prisma.review.update({
      where: { id: reviewId },
      data: { 
        status,
        updatedAt: new Date()
      }
    })

    // Get product ID to revalidate page
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { productId: true }
    })

    if (review) {
      revalidatePath(`/products/${review.productId}`)
      revalidatePath("/admin/reviews")
    }

    return { success: true }
  } catch (error) {
    console.error("Error in updateReviewStatus:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Add admin response to review
export async function addReviewResponse(formData: FormData) {
  try {
    const reviewId = formData.get("reviewId") as string
    const content = formData.get("content") as string

    if (!reviewId || !content) {
      return { error: "Review ID and content are required" }
    }

    // Add response
    await prisma.reviewResponse.create({
      data: {
        reviewId,
        content,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Get product ID to revalidate page
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { productId: true }
    })

    if (review) {
      revalidatePath(`/products/${review.productId}`)
      revalidatePath("/admin/reviews")
    }

    return { success: true }
  } catch (error) {
    console.error("Error in addReviewResponse:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Mark review as helpful
export async function markReviewHelpful(reviewId: string) {
  try {
    // Get current helpful count
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { helpfulCount: true, productId: true }
    })

    if (!review) {
      return { error: "Review not found" }
    }

    // Increment helpful count
    await prisma.review.update({
      where: { id: reviewId },
      data: { 
        helpfulCount: (review.helpfulCount || 0) + 1,
        updatedAt: new Date()
      }
    })

    // Revalidate product page
    revalidatePath(`/products/${review.productId}`)

    return { success: true }
  } catch (error) {
    console.error("Error in markReviewHelpful:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Get reviews for a product
export async function getProductReviews(productId: string) {
  try {
    // Get approved reviews for the product
    const reviews = await prisma.review.findMany({
      where: {
        productId,
        status: "approved"
      },
      include: {
        reviewImages: true,
        reviewResponses: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return { reviews }
  } catch (error) {
    console.error("Error in getProductReviews:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Get all reviews (admin only)
export async function getAllReviews() {
  try {
    // Get all reviews
    const reviews = await prisma.review.findMany({
      include: {
        product: { select: { name: true } },
        reviewImages: true,
        reviewResponses: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return { reviews }
  } catch (error) {
    console.error("Error in getAllReviews:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Delete a review (admin only)
export async function deleteReview(reviewId: string) {
  try {
    // Get product ID to revalidate page
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { productId: true }
    })

    // Delete review (cascade will delete images and responses)
    await prisma.review.delete({
      where: { id: reviewId }
    })

    if (review) {
      revalidatePath(`/products/${review.productId}`)
      revalidatePath("/admin/reviews")
    }

    return { success: true }
  } catch (error) {
    console.error("Error in deleteReview:", error)
    return { error: "An unexpected error occurred" }
  }
}