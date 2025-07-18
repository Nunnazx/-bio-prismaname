"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getSeoMetadata() {
  try {
    const data = await prisma.seoMetadata.findMany({
      orderBy: { pagePath: 'asc' }
    })

    return data
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    throw new Error("Failed to fetch SEO metadata")
  }
}

export async function getSeoMetadataForPage(pagePath: string) {
  try {
    const data = await prisma.seoMetadata.findUnique({
      where: { pagePath }
    })

    return data
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    throw new Error("Failed to fetch SEO metadata")
  }
}

export async function createSeoMetadata(seoData: any) {
  try {
    // Remove empty ID
    if (seoData.id === "" || seoData.id === undefined) {
      delete seoData.id
    }

    const data = await prisma.seoMetadata.create({
      data: {
        ...seoData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    revalidatePath("/admin/seo")
    return data
  } catch (error) {
    console.error("Error creating SEO metadata:", error)
    throw new Error("Failed to create SEO metadata")
  }
}

export async function updateSeoMetadata(id: string, seoData: any) {
  try {
    // Don't update the ID
    if (seoData.id) {
      delete seoData.id
    }

    const data = await prisma.seoMetadata.update({
      where: { id },
      data: {
        ...seoData,
        updatedAt: new Date()
      }
    })

    revalidatePath("/admin/seo")
    return data
  } catch (error) {
    console.error("Error updating SEO metadata:", error)
    throw new Error("Failed to update SEO metadata")
  }
}

export async function deleteSeoMetadata(id: string) {
  try {
    await prisma.seoMetadata.delete({
      where: { id }
    })

    revalidatePath("/admin/seo")
    return { success: true }
  } catch (error) {
    console.error("Error deleting SEO metadata:", error)
    throw new Error("Failed to delete SEO metadata")
  }
}