"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { v4 as uuidv4 } from "uuid"

// Create a new custom order
export async function createCustomOrder(orderData: any) {
  const supabase = createClient()

  try {
    // Validate required fields
    const requiredFields = [
      "company_name",
      "contact_name",
      "email",
      "product_type",
      "product_name",
      "size",
      "color",
      "thickness",
      "printing_option",
      "quantity",
      "timeline",
    ]

    for (const field of requiredFields) {
      if (!orderData[field]) {
        return {
          success: false,
          error: `Missing required field: ${field}`,
        }
      }
    }

    // Insert the order into the database
    const { data, error } = await supabase.from("custom_orders").insert([orderData]).select()

    if (error) {
      console.error("Error creating custom order:", error)
      return {
        success: false,
        error: `Failed to create custom order: ${error.message}`,
      }
    }

    // Revalidate relevant paths
    revalidatePath("/admin/custom-orders")

    return {
      success: true,
      orderId: data[0].id,
      message: "Custom order created successfully",
    }
  } catch (error: any) {
    console.error("Error processing custom order:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

// Get all custom orders
export async function getCustomOrders() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from("custom_orders").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching custom orders:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error processing request:", error)
    return []
  }
}

// Get a single custom order by ID
export async function getCustomOrderById(id: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from("custom_orders").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching custom order:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error processing request:", error)
    return null
  }
}

// Update a custom order
export async function updateCustomOrder(id: string, orderData: any) {
  const supabase = createClient()

  try {
    const { error } = await supabase.from("custom_orders").update(orderData).eq("id", id)

    if (error) {
      console.error("Error updating custom order:", error)
      return {
        success: false,
        error: `Failed to update custom order: ${error.message}`,
      }
    }

    // Revalidate relevant paths
    revalidatePath("/admin/custom-orders")
    revalidatePath(`/admin/custom-orders/${id}`)

    return {
      success: true,
      message: "Custom order updated successfully",
    }
  } catch (error: any) {
    console.error("Error processing update:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

// Create a quotation for a custom order
export async function createQuotation(orderId: string, quotationData: any) {
  const supabase = createClient()

  try {
    // Generate a quote reference number
    const quoteReference = `QT-${new Date().getFullYear()}-${uuidv4().substring(0, 8).toUpperCase()}`

    // Set quote valid until date (default 30 days)
    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + 30)

    // Update the order with quotation data
    const updateData = {
      status: "quoted",
      quote_amount: quotationData.amount,
      quote_notes: quotationData.notes,
      quote_sent_at: new Date().toISOString(),
      quote_valid_until: validUntil.toISOString(),
      quote_reference: quoteReference,
    }

    const { error } = await supabase.from("custom_orders").update(updateData).eq("id", orderId)

    if (error) {
      console.error("Error creating quotation:", error)
      return {
        success: false,
        error: `Failed to create quotation: ${error.message}`,
      }
    }

    // Revalidate relevant paths
    revalidatePath("/admin/custom-orders")
    revalidatePath(`/admin/custom-orders/${orderId}`)

    return {
      success: true,
      quoteReference,
      message: "Quotation created successfully",
    }
  } catch (error: any) {
    console.error("Error processing quotation:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

// Get custom order statistics
export async function getCustomOrderStats() {
  const supabase = createClient()

  try {
    // Get total count
    const { count: total, error: countError } = await supabase
      .from("custom_orders")
      .select("*", { count: "exact", head: true })

    // Get new orders count
    const { count: newCount, error: newError } = await supabase
      .from("custom_orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "new")

    // Get quoted orders count
    const { count: quotedCount, error: quotedError } = await supabase
      .from("custom_orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "quoted")

    // Get in-production orders count
    const { count: inProductionCount, error: inProductionError } = await supabase
      .from("custom_orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "in-production")

    // Get completed orders count
    const { count: completedCount, error: completedError } = await supabase
      .from("custom_orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed")

    if (countError || newError || quotedError || inProductionError || completedError) {
      console.error(
        "Error fetching custom order stats:",
        countError || newError || quotedError || inProductionError || completedError,
      )
      return {
        total: 0,
        new: 0,
        quoted: 0,
        inProduction: 0,
        completed: 0,
      }
    }

    return {
      total: total || 0,
      new: newCount || 0,
      quoted: quotedCount || 0,
      inProduction: inProductionCount || 0,
      completed: completedCount || 0,
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return {
      total: 0,
      new: 0,
      quoted: 0,
      inProduction: 0,
      completed: 0,
    }
  }
}
