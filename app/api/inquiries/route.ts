import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const supabase = createClient()

    // Validate required fields
    const requiredFields = ["name", "email", "message"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Insert the inquiry into the database
    const { data: inquiry, error } = await supabase
      .from("inquiries")
      .insert([
        {
          name: data.name,
          email: data.email,
          company: data.company || null,
          phone: data.phone || null,
          message: data.message,
          product_interest: data.productInterest || null,
          status: "new",
          priority: "medium",
        },
      ])
      .select()

    if (error) {
      console.error("Error saving inquiry:", error)
      return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiryId: inquiry[0].id,
    })
  } catch (error) {
    console.error("Error processing inquiry:", error)
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 })
  }
}
