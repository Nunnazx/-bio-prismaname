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
