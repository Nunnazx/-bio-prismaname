"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getBackups() {
  try {
    const data = await prisma.backup.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return data
  } catch (error) {
    console.error("Error fetching backups:", error)
    throw new Error("Failed to fetch backups")
  }
}

export async function getBackup(id: string) {
  try {
    const data = await prisma.backup.findUnique({
      where: { id }
    })

    return data
  } catch (error) {
    console.error("Error fetching backup:", error)
    throw new Error("Failed to fetch backup")
  }
}

export async function createBackup(backupData: any) {
  try {
    // Remove empty ID
    if (backupData.id === "" || backupData.id === undefined) {
      delete backupData.id
    }

    const data = await prisma.backup.create({
      data: {
        ...backupData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    revalidatePath("/admin/backups")
    return data
  } catch (error) {
    console.error("Error creating backup:", error)
    throw new Error("Failed to create backup")
  }
}

export async function updateBackup(id: string, backupData: any) {
  try {
    // Don't update the ID
    if (backupData.id) {
      delete backupData.id
    }

    const data = await prisma.backup.update({
      where: { id },
      data: {
        ...backupData,
        updatedAt: new Date()
      }
    })

    revalidatePath("/admin/backups")
    return data
  } catch (error) {
    console.error("Error updating backup:", error)
    throw new Error("Failed to update backup")
  }
}

export async function deleteBackup(id: string) {
  try {
    await prisma.backup.delete({
      where: { id }
    })

    revalidatePath("/admin/backups")
    return { success: true }
  } catch (error) {
    console.error("Error deleting backup:", error)
    throw new Error("Failed to delete backup")
  }
}