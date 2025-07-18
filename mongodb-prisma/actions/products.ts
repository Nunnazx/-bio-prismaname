"use server"

import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'
import { ProductCategory, ProductStatus, StockStatus } from '@prisma/client'

// Get all products with pagination and filtering
export async function getProducts({
  page = 1,
  limit = 10,
  category,
  status,
  search,
  sort = 'createdAt',
  order = 'desc'
}: {
  page?: number
  limit?: number
  category?: ProductCategory
  status?: ProductStatus
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
} = {}) {
  try {
    // Build filter conditions
    const where: any = {}
    
    if (category) {
      where.category = category
    }
    
    if (status) {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    // Count total matching products
    const totalCount = await prisma.product.count({ where })
    const totalPages = Math.ceil(totalCount / limit)
    
    // Get products with pagination
    const products = await prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sort]: order },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1
        }
      }
    })
    
    return {
      products,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

// Get a single product by ID or slug
export async function getProduct(identifier: string) {
  try {
    // Check if identifier is a MongoDB ObjectId (24 hex chars)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier)
    
    const product = await prisma.product.findUnique({
      where: isObjectId ? { id: identifier } : { slug: identifier },
      include: {
        images: {
          orderBy: {
            displayOrder: 'asc'
          }
        }
      }
    })
    
    if (!product) {
      throw new Error('Product not found')
    }
    
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    throw new Error('Failed to fetch product')
  }
}

// Create a new product
export async function createProduct(data: any) {
  try {
    // Extract images from the data
    const { images, ...productData } = data
    
    // Create the product
    const product = await prisma.product.create({
      data: {
        ...productData,
        // Set default values if not provided
        status: productData.status || ProductStatus.DRAFT,
        stockStatus: productData.stockStatus || StockStatus.IN_STOCK,
        isActive: productData.isActive ?? true,
        isFeatured: productData.isFeatured ?? false
      }
    })
    
    // Create product images if provided
    if (images && Array.isArray(images) && images.length > 0) {
      await prisma.productImage.createMany({
        data: images.map((image: any, index: number) => ({
          productId: product.id,
          url: image.url,
          altText: image.altText || product.name,
          isPrimary: index === 0, // First image is primary by default
          displayOrder: index
        }))
      })
    }
    
    revalidatePath('/products')
    revalidatePath('/admin/products')
    
    return { success: true, product }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: error.message }
  }
}

// Update an existing product
export async function updateProduct(id: string, data: any) {
  try {
    // Extract images from the data
    const { images, ...productData } = data
    
    // Update the product
    const product = await prisma.product.update({
      where: { id },
      data: productData
    })
    
    // Handle images if provided
    if (images && Array.isArray(images)) {
      // Delete existing images
      await prisma.productImage.deleteMany({
        where: { productId: id }
      })
      
      // Create new images
      if (images.length > 0) {
        await prisma.productImage.createMany({
          data: images.map((image: any, index: number) => ({
            productId: product.id,
            url: image.url,
            altText: image.altText || product.name,
            isPrimary: image.isPrimary || index === 0,
            displayOrder: image.displayOrder || index
          }))
        })
      }
    }
    
    revalidatePath('/products')
    revalidatePath(`/products/${product.slug}`)
    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${id}`)
    
    return { success: true, product }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: error.message }
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    // Delete the product (will cascade delete images due to relation)
    await prisma.product.delete({
      where: { id }
    })
    
    revalidatePath('/products')
    revalidatePath('/admin/products')
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: error.message }
  }
}

// Get product statistics
export async function getProductStats() {
  try {
    const [total, active, featured, outOfStock] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.count({ where: { isFeatured: true } }),
      prisma.product.count({ where: { stockStatus: StockStatus.OUT_OF_STOCK } })
    ])
    
    // Get counts by category
    const categoryCounts = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        id: true
      }
    })
    
    const categories = categoryCounts.map(item => ({
      category: item.category,
      count: item._count.id
    }))
    
    return {
      total,
      active,
      featured,
      outOfStock,
      categories
    }
  } catch (error) {
    console.error('Error fetching product stats:', error)
    return {
      total: 0,
      active: 0,
      featured: 0,
      outOfStock: 0,
      categories: []
    }
  }
}