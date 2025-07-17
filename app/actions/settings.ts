"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getSystemSettings() {
  const supabase = createClient()

  const { data, error } = await supabase.from("settings").select("*")

  if (error) {
    console.error("Error fetching settings:", error)
    return {}
  }

  // Convert array of settings to object
  const settings = {}
  data?.forEach(setting => {
    settings[setting.id] = setting.value
  })

  return settings
}

export async function updateSetting(id: string, value: any, description?: string) {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()
  
  const { data, error } = await supabase
    .from("settings")
    .upsert({
      id,
      value,
      description,
      updated_by: session?.user?.id,
      updated_at: new Date().toISOString()
    })
    .select()

  if (error) {
    console.error("Error updating setting:", error)
    throw new Error("Failed to update setting")
  }

  revalidatePath("/admin/settings")
  return data[0]
}

export async function getSystemStatus() {
  const supabase = createClient()

  // Get database stats
  const { data: profiles } = await supabase.from("profiles").select("id", { count: "exact" })
  const { data: products } = await supabase.from("products").select("id", { count: "exact" })
  const { data: inquiries } = await supabase.from("inquiries").select("id", { count: "exact" })
  const { data: media } = await supabase.from("media").select("file_size")

  // Calculate storage usage
  const totalMediaSize = media?.reduce((sum, item) => sum + (item.file_size || 0), 0) || 0
  const storageUsed = Math.round((totalMediaSize / (1024 * 1024 * 1024)) * 100) // Percentage of 1GB

  // Get last backup info (mock data for now)
  const lastBackup = "2 hours ago"

  return {
    dbSize: "45.2 MB",
    dbConnections: 12,
    storageUsed,
    storageSize: "1 GB",
    lastBackup,
    totalUsers: profiles?.length || 0,
    totalProducts: products?.length || 0,
    totalInquiries: inquiries?.length || 0,
    uptime: "99.9%",
    status: "healthy"
  }
}

export async function createBackup(type: string = "manual") {
  const supabase = createClient()
  
  const { data: { session } } = await supabase.auth.getSession()

  // Mock backup creation - in real implementation, this would trigger actual backup
  const backupData = {
    filename: `backup-${new Date().toISOString().split('T')[0]}-${Date.now()}.sql`,
    size: Math.floor(Math.random() * 100000000), // Random size for demo
    backup_type: type,
    status: "completed",
    storage_path: `/backups/backup-${Date.now()}.sql`,
    created_by: session?.user?.id,
    notes: `${type} backup created successfully`
  }

  const { data, error } = await supabase.from("backups").insert([backupData]).select()

  if (error) {
    console.error("Error creating backup:", error)
    throw new Error("Failed to create backup")
  }

  revalidatePath("/admin/settings")
  revalidatePath("/admin/backups")
  return data[0]
}

export async function getBackups() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("backups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10)

  if (error) {
    console.error("Error fetching backups:", error)
    return []
  }

  return data || []
}