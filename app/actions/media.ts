"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getMediaItems() {
  const supabase = createClient()

  const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching media items:", error)
    throw new Error("Failed to fetch media items")
  }

  return data
}

export async function getMediaItem(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("media").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching media item:", error)
    throw new Error("Failed to fetch media item")
  }

  return data
}

export async function createMediaItem(mediaData: any) {
  const supabase = createClient()

  const { data, error } = await supabase.from("media").insert([mediaData]).select()

  if (error) {
    console.error("Error creating media item:", error)
    throw new Error("Failed to create media item")
  }

  revalidatePath("/admin/media")
  return data[0]
}

export async function updateMediaItem(id: string, mediaData: any) {
  const supabase = createClient()

  const { data, error } = await supabase.from("media").update(mediaData).eq("id", id).select()

  if (error) {
    console.error("Error updating media item:", error)
    throw new Error("Failed to update media item")
  }

  revalidatePath("/admin/media")
  revalidatePath(`/admin/media/${id}`)
  return data[0]
}

export async function deleteMediaItem(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from("media").delete().eq("id", id)

  if (error) {
    console.error("Error deleting media item:", error)
    throw new Error("Failed to delete media item")
  }

  revalidatePath("/admin/media")
  return { success: true }
}
