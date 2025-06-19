"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

// Get all products
export async function getProducts() {
  const supabase = createServerActionClient({ cookies })

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select(`
        *,
        product_images(*)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return { error: error.message }
    }

    return { products }
  } catch (error) {
    console.error("Error in getProducts:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Get a single product by ID
export async function getProductById(productId: string) {
  const supabase = createServerActionClient({ cookies })

  try {
    const { data: product, error } = await supabase
      .from("products")
      .select(`
        *,
        product_images(*)
      `)
      .eq("id", productId)
      .single()

    if (error) {
      console.error("Error fetching product:", error)
      return { error: error.message }
    }

    return { product }
  } catch (error) {
    console.error("Error in getProductById:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Add the missing getProduct function that was expected by other components
export async function getProduct(id: string) {
  return getProductById(id)
}

// Create a new product
export async function createProduct(formData: FormData) {
  const supabase = createServerActionClient({ cookies })

  try {
    // Get form data
    const name = formData.get("name") as string
    const code = formData.get("code") as string
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const price = formData.get("price") as string
    const isActive = formData.get("isActive") === "true"

    // Get image URLs from text input
    const imageUrlsInput = formData.get("imageUrls") as string // e.g., comma-separated URLs from a text input
    const directImageUrls = imageUrlsInput
      ? imageUrlsInput
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean)
      : []

    // Parse features
    const featuresString = formData.get("features") as string
    const features = featuresString
      ? {
          features: featuresString.split("\n").filter((feature) => feature.trim() !== ""),
        }
      : null

    // Parse specifications
    const specificationsString = formData.get("specifications") as string
    const specifications = specificationsString
      ? specificationsString.split("\n").reduce((acc: Record<string, string>, line) => {
          const [key, value] = line.split(":")
          if (key && value) {
            acc[key.trim()] = value.trim()
          }
          return acc
        }, {})
      : null

    // Insert product
    const { data: product, error } = await supabase
      .from("products")
      .insert({
        name,
        code,
        category,
        description,
        features,
        specifications,
        price,
        is_active: isActive,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating product:", error)
      return { error: error.message }
    }

    // Handle images
    const uploadedImages = formData.getAll("images") as File[]
    let imageCounter = 0
    const imageRecords = []

    // Process uploaded files
    if (uploadedImages && uploadedImages.length > 0 && uploadedImages[0].size > 0) {
      for (const image of uploadedImages) {
        const fileName = `${Date.now()}-${image.name}`
        const filePath = `products/${product.id}/${fileName}`

        const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, image)

        if (uploadError) {
          console.error("Error uploading image file:", uploadError)
          continue // Skip this image
        }

        const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(filePath)

        imageRecords.push({
          product_id: product.id,
          image_url: publicUrlData.publicUrl,
          alt_text: name, // Product name as alt text
          is_primary: imageCounter === 0,
          display_order: imageCounter,
        })
        imageCounter++
      }
    }

    // Process direct image URLs
    for (const url of directImageUrls) {
      // Basic URL validation (you might want a more robust one)
      if (url.startsWith("http://") || url.startsWith("https://")) {
        imageRecords.push({
          product_id: product.id,
          image_url: url,
          alt_text: name, // Product name as alt text
          is_primary: imageCounter === 0, // Only primary if no files were uploaded
          display_order: imageCounter,
        })
        imageCounter++
      } else {
        console.warn(`Invalid URL skipped: ${url}`)
      }
    }

    // Batch insert image records if any
    if (imageRecords.length > 0) {
      const { error: imageInsertError } = await supabase.from("product_images").insert(imageRecords)

      if (imageInsertError) {
        console.error("Error inserting image records:", imageInsertError)
        // Potentially return an error or handle partial success
      }

      // If the first image (overall) was a direct URL or an uploaded file, update product's main image_url
      if (imageRecords[0]) {
        await supabase.from("products").update({ image_url: imageRecords[0].image_url }).eq("id", product.id)
      }
    }

    revalidatePath("/admin/products")
    revalidatePath("/products")

    return { success: true, productId: product.id }
  } catch (error) {
    console.error("Error in createProduct:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Update an existing product
export async function updateProduct(productId: string, formData: FormData) {
  const supabase = createServerActionClient({ cookies })

  try {
    // Get form data
    const name = formData.get("name") as string
    const code = formData.get("code") as string
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const price = formData.get("price") as string
    const isActive = formData.get("isActive") === "true"

    // Parse features
    const featuresString = formData.get("features") as string
    const features = featuresString
      ? {
          features: featuresString.split("\n").filter((feature) => feature.trim() !== ""),
        }
      : null

    // Parse specifications
    const specificationsString = formData.get("specifications") as string
    const specifications = specificationsString
      ? specificationsString.split("\n").reduce((acc: Record<string, string>, line) => {
          const [key, value] = line.split(":")
          if (key && value) {
            acc[key.trim()] = value.trim()
          }
          return acc
        }, {})
      : null

    // Update product
    const { error } = await supabase
      .from("products")
      .update({
        name,
        code,
        category,
        description,
        features,
        specifications,
        price,
        is_active: isActive,
      })
      .eq("id", productId)

    if (error) {
      console.error("Error updating product:", error)
      return { error: error.message }
    }

    // Handle new images
    const newImages = formData.getAll("newImages") as File[]
    if (newImages && newImages.length > 0 && newImages[0].size > 0) {
      // Get current highest display order
      const { data: existingImages } = await supabase
        .from("product_images")
        .select("display_order")
        .eq("product_id", productId)
        .order("display_order", { ascending: false })
        .limit(1)

      const startOrder = existingImages && existingImages.length > 0 ? existingImages[0].display_order + 1 : 0

      for (let i = 0; i < newImages.length; i++) {
        const image = newImages[i]
        const fileName = `${Date.now()}-${image.name}`
        const filePath = `products/${productId}/${fileName}`

        // Upload image to storage
        const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, image)

        if (uploadError) {
          console.error("Error uploading image:", uploadError)
          continue
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(filePath)

        // Insert image record
        await supabase.from("product_images").insert({
          product_id: productId,
          image_url: publicUrlData.publicUrl,
          alt_text: name,
          is_primary: false, // New images are not primary by default
          display_order: startOrder + i,
        })
      }
    }

    // Handle image deletions
    const deletedImageIds = formData.get("deletedImageIds") as string
    if (deletedImageIds) {
      const ids = deletedImageIds.split(",").filter(Boolean)
      if (ids.length > 0) {
        // Get the images to delete
        const { data: imagesToDelete } = await supabase
          .from("product_images")
          .select("id, image_url, is_primary")
          .in("id", ids)

        // Delete the images
        const { error: deleteError } = await supabase.from("product_images").delete().in("id", ids)

        if (deleteError) {
          console.error("Error deleting images:", deleteError)
        } else {
          // If a primary image was deleted, set a new primary image
          const wasPrimaryDeleted = imagesToDelete?.some((img) => img.is_primary)
          if (wasPrimaryDeleted) {
            // Get the first remaining image
            const { data: remainingImages } = await supabase
              .from("product_images")
              .select("id")
              .eq("product_id", productId)
              .order("display_order", { ascending: true })
              .limit(1)

            if (remainingImages && remainingImages.length > 0) {
              // Set it as primary
              await supabase.from("product_images").update({ is_primary: true }).eq("id", remainingImages[0].id)

              // Also update the product's image_url
              const { data: primaryImage } = await supabase
                .from("product_images")
                .select("image_url")
                .eq("id", remainingImages[0].id)
                .single()

              if (primaryImage) {
                await supabase.from("products").update({ image_url: primaryImage.image_url }).eq("id", productId)
              }
            } else {
              // No images left, clear the product's image_url
              await supabase.from("products").update({ image_url: null }).eq("id", productId)
            }
          }
        }
      }
    }

    // Handle primary image change
    const primaryImageId = formData.get("primaryImageId") as string
    if (primaryImageId) {
      // First, set all images to non-primary
      await supabase.from("product_images").update({ is_primary: false }).eq("product_id", productId)

      // Then set the selected image as primary
      await supabase.from("product_images").update({ is_primary: true }).eq("id", primaryImageId)

      // Also update the product's image_url
      const { data: primaryImage } = await supabase
        .from("product_images")
        .select("image_url")
        .eq("id", primaryImageId)
        .single()

      if (primaryImage) {
        await supabase.from("products").update({ image_url: primaryImage.image_url }).eq("id", productId)
      }
    }

    // Handle image reordering
    const imageOrder = formData.get("imageOrder") as string
    if (imageOrder) {
      const orderMap = JSON.parse(imageOrder)
      for (const [id, order] of Object.entries(orderMap)) {
        await supabase.from("product_images").update({ display_order: order }).eq("id", id)
      }
    }

    revalidatePath("/admin/products")
    revalidatePath(`/admin/products/edit/${productId}`)
    revalidatePath("/products")
    revalidatePath(`/products/${productId}`)

    return { success: true }
  } catch (error) {
    console.error("Error in updateProduct:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Delete a product
export async function deleteProduct(productId: string) {
  const supabase = createServerActionClient({ cookies })

  try {
    // Delete the product (cascade will delete images)
    const { error } = await supabase.from("products").delete().eq("id", productId)

    if (error) {
      console.error("Error deleting product:", error)
      return { error: error.message }
    }

    revalidatePath("/admin/products")
    revalidatePath("/products")

    return { success: true }
  } catch (error) {
    console.error("Error in deleteProduct:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Set image as primary
export async function setImageAsPrimary(imageId: string) {
  const supabase = createServerActionClient({ cookies })

  try {
    // Get the image to find its product_id
    const { data: image, error: imageError } = await supabase
      .from("product_images")
      .select("product_id, image_url")
      .eq("id", imageId)
      .single()

    if (imageError) {
      console.error("Error fetching image:", imageError)
      return { error: imageError.message }
    }

    // First, set all images for this product to non-primary
    const { error: updateError1 } = await supabase
      .from("product_images")
      .update({ is_primary: false })
      .eq("product_id", image.product_id)

    if (updateError1) {
      console.error("Error updating images:", updateError1)
      return { error: updateError1.message }
    }

    // Then set the selected image as primary
    const { error: updateError2 } = await supabase.from("product_images").update({ is_primary: true }).eq("id", imageId)

    if (updateError2) {
      console.error("Error updating image:", updateError2)
      return { error: updateError2.message }
    }

    // Also update the product's image_url for backward compatibility
    const { error: updateError3 } = await supabase
      .from("products")
      .update({ image_url: image.image_url })
      .eq("id", image.product_id)

    if (updateError3) {
      console.error("Error updating product:", updateError3)
      return { error: updateError3.message }
    }

    revalidatePath(`/admin/products/edit/${image.product_id}`)
    revalidatePath(`/products/${image.product_id}`)

    return { success: true }
  } catch (error) {
    console.error("Error in setImageAsPrimary:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Delete an image
export async function deleteProductImage(imageId: string) {
  const supabase = createServerActionClient({ cookies })

  try {
    // Get the image to find its product_id and check if it's primary
    const { data: image, error: imageError } = await supabase
      .from("product_images")
      .select("product_id, is_primary")
      .eq("id", imageId)
      .single()

    if (imageError) {
      console.error("Error fetching image:", imageError)
      return { error: imageError.message }
    }

    // Delete the image
    const { error: deleteError } = await supabase.from("product_images").delete().eq("id", imageId)

    if (deleteError) {
      console.error("Error deleting image:", deleteError)
      return { error: deleteError.message }
    }

    // If it was a primary image, set a new primary image
    if (image.is_primary) {
      // Get the first remaining image
      const { data: remainingImages } = await supabase
        .from("product_images")
        .select("id, image_url")
        .eq("product_id", image.product_id)
        .order("display_order", { ascending: true })
        .limit(1)

      if (remainingImages && remainingImages.length > 0) {
        // Set it as primary
        await supabase.from("product_images").update({ is_primary: true }).eq("id", remainingImages[0].id)

        // Also update the product's image_url
        await supabase.from("products").update({ image_url: remainingImages[0].image_url }).eq("id", image.product_id)
      } else {
        // No images left, clear the product's image_url
        await supabase.from("products").update({ image_url: null }).eq("id", image.product_id)
      }
    }

    revalidatePath(`/admin/products/edit/${image.product_id}`)
    revalidatePath(`/products/${image.product_id}`)

    return { success: true }
  } catch (error) {
    console.error("Error in deleteProductImage:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Update image order
export async function updateImageOrder(imageId: string, newOrder: number) {
  const supabase = createServerActionClient({ cookies })

  try {
    // Get the image to find its product_id
    const { data: image, error: imageError } = await supabase
      .from("product_images")
      .select("product_id")
      .eq("id", imageId)
      .single()

    if (imageError) {
      console.error("Error fetching image:", imageError)
      return { error: imageError.message }
    }

    // Update the image order
    const { error: updateError } = await supabase
      .from("product_images")
      .update({ display_order: newOrder })
      .eq("id", imageId)

    if (updateError) {
      console.error("Error updating image order:", updateError)
      return { error: updateError.message }
    }

    revalidatePath(`/admin/products/edit/${image.product_id}`)
    revalidatePath(`/products/${image.product_id}`)

    return { success: true }
  } catch (error) {
    console.error("Error in updateImageOrder:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function getProductStats() {
  const supabase = createServerActionClient({ cookies })

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
  const supabase = createServerActionClient({ cookies })

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
