"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getSystemSettings() {
  try {
    const settings = await prisma.setting.findMany()
    
    // Convert array of settings to object
    const settingsObj: Record<string, any> = {}
    settings.forEach(setting => {
      settingsObj[setting.id] = setting.value
    })

    return settingsObj
  } catch (error) {
    console.error("Error fetching settings:", error)
    return {}
  }
}

export async function updateSetting(id: string, value: any, description?: string) {
  try {
    const data = await prisma.setting.upsert({
      where: { id },
      update: {
        value,
        description,
        updatedAt: new Date()
      },
      create: {
        id,
        value,
        description,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    revalidatePath("/admin/settings")
    return data
  } catch (error) {
    console.error("Error updating setting:", error)
    throw new Error("Failed to update setting")
  }
}

export async function getSystemStatus() {
  try {
    // Get database stats
    const totalUsers = await prisma.user.count()
    const totalProducts = await prisma.product.count()
    const totalInquiries = await prisma.inquiry.count()
    const media = await prisma.media.findMany({ select: { fileSize: true } })

    // Calculate storage usage
    const totalMediaSize = media.reduce((sum, item) => sum + (item.fileSize || 0), 0)
    const storageUsed = Math.round((totalMediaSize / (1024 * 1024 * 1024)) * 100) // Percentage of 1GB

    // Get last backup info (mock data for now)
    const lastBackup = "2 hours ago"

    return {
      dbSize: "45.2 MB",
      dbConnections: 12,
      storageUsed,
      storageSize: "1 GB",
      lastBackup,
      totalUsers,
      totalProducts,
      totalInquiries,
      uptime: "99.9%",
      status: "healthy"
    }
  } catch (error) {
    console.error("Error getting system status:", error)
    return {
      dbSize: "Unknown",
      dbConnections: 0,
      storageUsed: 0,
      storageSize: "1 GB",
      lastBackup: "Unknown",
      totalUsers: 0,
      totalProducts: 0,
      totalInquiries: 0,
      uptime: "Unknown",
      status: "error"
    }
  }
}

export async function createBackup(type: string = "manual") {
  try {
    // Mock backup creation - in real implementation, this would trigger actual backup
    const backupData = {
      filename: `backup-${new Date().toISOString().split('T')[0]}-${Date.now()}.sql`,
      size: Math.floor(Math.random() * 100000000), // Random size for demo
      backupType: type,
      status: "completed",
      storagePath: `/backups/backup-${Date.now()}.sql`,
      notes: `${type} backup created successfully`,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const data = await prisma.backup.create({ data: backupData })

    revalidatePath("/admin/settings")
    revalidatePath("/admin/backups")
    return data
  } catch (error) {
    console.error("Error creating backup:", error)
    throw new Error("Failed to create backup")
  }
}

export async function getBackups() {
  try {
    const data = await prisma.backup.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    return data
  } catch (error) {
    console.error("Error fetching backups:", error)
    return []
  }
}