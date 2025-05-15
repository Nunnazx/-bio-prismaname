"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getProducts() {
  const supabase = createClient()

  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
  }

  return data
}

export async function getProduct(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    throw new Error("Failed to fetch product")
  }

  return data
}

export async function createProduct(productData: any) {
  const supabase = createClient()

  // Remove any id field to let Supabase generate it
  if (productData.id === "") {
    delete productData.id
  }

  const { data, error } = await supabase.from("products").insert([productData]).select()

  if (error) {
    console.error("Error creating product:", error)
    throw new Error("Failed to create product")
  }

  revalidatePath("/admin/products")
  return data[0]
}

export async function updateProduct(id: string, productData: any) {
  const supabase = createClient()

  // Remove the id from the update data
  if (productData.id) {
    delete productData.id
  }

  const { data, error } = await supabase.from("products").update(productData).eq("id", id).select()

  if (error) {
    console.error("Error updating product:", error)
    throw new Error("Failed to update product")
  }

  revalidatePath("/admin/products")
  revalidatePath(`/admin/products/${id}`)
  return data[0]
}

export async function deleteProduct(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    throw new Error("Failed to delete product")
  }

  revalidatePath("/admin/products")
  return { success: true }
}

export async function getProductStats() {
  const supabase = createClient()

  try {
    // Get total count
    const { count: total, error: totalError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })

    if (totalError) throw totalError

    // Get active products count
    const { count: active, error: activeError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)

    if (activeError) throw activeError

    // Get products by category
    const { data: categoryData, error: categoryError } = await supabase.from("products").select("category")

    if (categoryError) throw categoryError

    // Count products by category
    const categories = categoryData.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {})

    return {
      total: total || 0,
      active: active || 0,
      categories,
    }
  } catch (error) {
    console.error("Error fetching product stats:", error)
    return {
      total: 0,
      active: 0,
      categories: {},
    }
  }
}

export async function getTopProducts(limit = 5) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error fetching top products:", error)
    return []
  }
}
