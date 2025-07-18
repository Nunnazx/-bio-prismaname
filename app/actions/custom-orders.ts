"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { v4 as uuidv4 } from "uuid"

// Create a new custom order
export async function createCustomOrder(orderData: any) {
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
    const order = await prisma.customOrder.create({
      data: {
        ...orderData,
        status: orderData.status || "new",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Revalidate relevant paths
    revalidatePath("/admin/custom-orders")

    return {
      success: true,
      orderId: order.id,
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
  try {
    const orders = await prisma.customOrder.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return orders || []
  } catch (error) {
    console.error("Error processing request:", error)
    return []
  }
}

// Get a single custom order by ID
export async function getCustomOrderById(id: string) {
  try {
    const order = await prisma.customOrder.findUnique({
      where: { id }
    })

    return order
  } catch (error) {
    console.error("Error processing request:", error)
    return null
  }
}

// Update a custom order
export async function updateCustomOrder(id: string, orderData: any) {
  try {
    await prisma.customOrder.update({
      where: { id },
      data: {
        ...orderData,
        updatedAt: new Date()
      }
    })

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
  try {
    // Generate a quote reference number
    const quoteReference = `QT-${new Date().getFullYear()}-${uuidv4().substring(0, 8).toUpperCase()}`

    // Set quote valid until date (default 30 days)
    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + 30)

    // Update the order with quotation data
    await prisma.customOrder.update({
      where: { id: orderId },
      data: {
        status: "quoted",
        quoteAmount: quotationData.amount,
        quoteNotes: quotationData.notes,
        quoteSentAt: new Date(),
        quoteValidUntil: validUntil,
        quoteReference: quoteReference,
        updatedAt: new Date()
      }
    })

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
  try {
    // Get total count
    const total = await prisma.customOrder.count()

    // Get new orders count
    const newCount = await prisma.customOrder.count({
      where: { status: "new" }
    })

    // Get quoted orders count
    const quotedCount = await prisma.customOrder.count({
      where: { status: "quoted" }
    })

    // Get in-production orders count
    const inProductionCount = await prisma.customOrder.count({
      where: { status: "in-production" }
    })

    // Get completed orders count
    const completedCount = await prisma.customOrder.count({
      where: { status: "completed" }
    })

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