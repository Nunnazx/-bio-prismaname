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

  // Remove empty ID to let Supabase generate it
  if (mediaData.id === "" || mediaData.id === undefined) {
    delete mediaData.id
  }

  // Set uploaded_by if not provided
  if (!mediaData.uploaded_by) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session?.user?.id) {
      mediaData.uploaded_by = session.user.id
    }
  }

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

  // Don't update the ID
  if (mediaData.id) {
    delete mediaData.id
  }

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

export async function getMediaStats() {
  const supabase = createClient()

  const { data: media, error } = await supabase.from("media").select("file_type, file_size")

  if (error) {
    console.error("Error fetching media stats:", error)
    return {
      totalFiles: 0,
      images: 0,
      videos: 0,
      totalSize: "0 MB",
      videoSize: "0 MB",
      storageUsed: 0,
      storageLimit: "1 GB",
    }
  }

  const totalFiles = media?.length || 0
  const images = media?.filter(m => m.file_type?.startsWith('image/')).length || 0
  const videos = media?.filter(m => m.file_type?.startsWith('video/')).length || 0
  
  const totalBytes = media?.reduce((sum, m) => sum + (m.file_size || 0), 0) || 0
  const videoBytes = media?.filter(m => m.file_type?.startsWith('video/')).reduce((sum, m) => sum + (m.file_size || 0), 0) || 0
  
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 MB'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const storageLimit = 1024 * 1024 * 1024 // 1GB in bytes
  const storageUsed = Math.round((totalBytes / storageLimit) * 100)

  return {
    totalFiles,
    images,
    videos,
    totalSize: formatBytes(totalBytes),
    videoSize: formatBytes(videoBytes),
    storageUsed,
    storageLimit: "1 GB",
  }
}
