"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getInquiries() {
  const supabase = createClient()

  const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching inquiries:", error)
    throw new Error("Failed to fetch inquiries")
  }

  return data
}

export async function getInquiry(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("inquiries").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching inquiry:", error)
    throw new Error("Failed to fetch inquiry")
  }

  return data
}

export async function createInquiry(inquiryData: any) {
  const supabase = createClient()

  const { data, error } = await supabase.from("inquiries").insert([inquiryData]).select()

  if (error) {
    console.error("Error creating inquiry:", error)
    throw new Error("Failed to create inquiry")
  }

  revalidatePath("/admin/inquiries")
  return data[0]
}

export async function updateInquiry(id: string, inquiryData: any) {
  const supabase = createClient()

  const { data, error } = await supabase.from("inquiries").update(inquiryData).eq("id", id).select()

  if (error) {
    console.error("Error updating inquiry:", error)
    throw new Error("Failed to update inquiry")
  }

  revalidatePath("/admin/inquiries")
  revalidatePath(`/admin/inquiries/${id}`)
  return data[0]
}

export async function deleteInquiry(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from("inquiries").delete().eq("id", id)

  if (error) {
    console.error("Error deleting inquiry:", error)
    throw new Error("Failed to delete inquiry")
  }

  revalidatePath("/admin/inquiries")
  return { success: true }
}
