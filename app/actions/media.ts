"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getMediaItems() {
  try {
    const data = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return data
  } catch (error) {
    console.error("Error fetching media items:", error)
    throw new Error("Failed to fetch media items")
  }
}

export async function getMediaItem(id: string) {
  try {
    const data = await prisma.media.findUnique({
      where: { id }
    })

    return data
  } catch (error) {
    console.error("Error fetching media item:", error)
    throw new Error("Failed to fetch media item")
  }
}

export async function createMediaItem(mediaData: any) {
  try {
    // Remove empty ID
    if (mediaData.id === "" || mediaData.id === undefined) {
      delete mediaData.id
    }

    const data = await prisma.media.create({
      data: {
        ...mediaData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    revalidatePath("/admin/media")
    return data
  } catch (error) {
    console.error("Error creating media item:", error)
    throw new Error("Failed to create media item")
  }
}

export async function updateMediaItem(id: string, mediaData: any) {
  try {
    // Don't update the ID
    if (mediaData.id) {
      delete mediaData.id
    }

    const data = await prisma.media.update({
      where: { id },
      data: {
        ...mediaData,
        updatedAt: new Date()
      }
    })

    revalidatePath("/admin/media")
    revalidatePath(`/admin/media/${id}`)
    return data
  } catch (error) {
    console.error("Error updating media item:", error)
    throw new Error("Failed to update media item")
  }
}

export async function deleteMediaItem(id: string) {
  try {
    await prisma.media.delete({
      where: { id }
    })

    revalidatePath("/admin/media")
    return { success: true }
  } catch (error) {
    console.error("Error deleting media item:", error)
    throw new Error("Failed to delete media item")
  }
}

export async function getMediaStats() {
  try {
    const media = await prisma.media.findMany({
      select: { fileType: true, fileSize: true }
    })

    const totalFiles = media.length
    const images = media.filter(m => m.fileType?.startsWith('image/')).length
    const videos = media.filter(m => m.fileType?.startsWith('video/')).length
    
    const totalBytes = media.reduce((sum, m) => sum + (m.fileSize || 0), 0)
    const videoBytes = media.filter(m => m.fileType?.startsWith('video/')).reduce((sum, m) => sum + (m.fileSize || 0), 0)
    
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
  } catch (error) {
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
}