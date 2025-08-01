import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "message", "inquiryType"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Map form data to database schema
    const inquiryData = {
      name: data.name,
      email: data.email,
      company: data.company || null,
      phone: data.phone || null,
      message: data.message,
      product_interest: data.inquiryType || null,
      status: "new",
      priority: "medium",
    }

    // Insert the inquiry into the database
    const inquiry = await prisma.inquiry.create({
      data: inquiryData
    })

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiryId: inquiry.id,
    })
  } catch (error) {
    console.error("Error processing inquiry:", error)
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 })
  }
}
