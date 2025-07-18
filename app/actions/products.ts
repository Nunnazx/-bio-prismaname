"use server"

import { prisma } from "@/lib/prisma"

// Get all products from database
export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1
        }
      }
    });

    // Convert dates to strings and format data for serialization
    return products.map(product => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      imageUrl: product.primaryImage || (product.images[0]?.url) || '/placeholder-product.jpg',
      price: product.price ? `₹${product.price}` : 'Contact for pricing'
    }));
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Get a product by ID from database
export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true
      }
    });

    if (!product) return null;

    return {
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      imageUrl: product.primaryImage || (product.images[0]?.url) || '/placeholder-product.jpg',
      price: product.price ? `₹${product.price}` : 'Contact for pricing',
      modelUrl: "/models/sample.glb" // Default 3D model
    };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return null
  }
}

// Create a new product
export async function createProduct(productData: any) {
  try {
    // Mock implementation
    console.log("Creating product:", productData);
    return {
      id: "new-product-id",
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}

// Update a product
export async function updateProduct(id: string, productData: any) {
  try {
    // Mock implementation
    console.log(`Updating product ${id}:`, productData);
    return {
      id,
      ...productData,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error)
    throw error
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    // Mock implementation
    console.log(`Deleting product ${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error)
    throw error
  }
}

// Get product statistics from database
export async function getProductStats() {
  try {
    const totalProducts = await prisma.product.count();
    const activeProducts = await prisma.product.count({
      where: { isActive: true }
    });
    const inactiveProducts = await prisma.product.count({
      where: { isActive: false }
    });
    
    // Get unique categories count
    const categories = await prisma.product.groupBy({
      by: ['category'],
      _count: { category: true }
    });
    
    const lowStockProducts = await prisma.product.count({
      where: { 
        stockStatus: 'LOW_STOCK'
      }
    });
    
    const outOfStockProducts = await prisma.product.count({
      where: { 
        stockStatus: 'OUT_OF_STOCK'
      }
    });

    return {
      totalProducts,
      activeProducts,
      inactiveProducts,
      totalCategories: categories.length,
      lowStockProducts,
      outOfStockProducts
    };
  } catch (error) {
    console.error("Error fetching product stats:", error)
    return {
      totalProducts: 0,
      activeProducts: 0,
      inactiveProducts: 0,
      totalCategories: 0,
      lowStockProducts: 0,
      outOfStockProducts: 0
    };
  }
}

// Get top products
export async function getTopProducts() {
  try {
    // Mock implementation - return top 5 products
    const allProducts = await getProducts();
    return allProducts.slice(0, 5);
  } catch (error) {
    console.error("Error fetching top products:", error)
    return [];
  }
}

// Bulk delete products
export async function bulkDeleteProducts(ids: string[]) {
  try {
    // Mock implementation
    console.log("Bulk deleting products:", ids);
    return { success: true, deletedCount: ids.length };
  } catch (error) {
    console.error("Error bulk deleting products:", error)
    throw error
  }
}

// Export products
export async function exportProducts() {
  try {
    // Mock implementation - return CSV data
    const products = await getProducts();
    const csvData = products.map(product => ({
      id: product.id,
      name: product.name,
      code: product.code,
      category: product.category,
      price: product.price,
      isActive: product.isActive
    }));
    return csvData;
  } catch (error) {
    console.error("Error exporting products:", error)
    throw error
  }
}