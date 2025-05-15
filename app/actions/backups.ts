"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getBackups() {
  const supabase = createClient()

  const { data, error } = await supabase.from("backups").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching backups:", error)
    throw new Error("Failed to fetch backups")
  }

  return data
}

export async function getBackup(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("backups").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching backup:", error)
    throw new Error("Failed to fetch backup")
  }

  return data
}

export async function createBackup(backupData: any) {
  const supabase = createClient()

  // Remove empty ID to let Supabase generate it
  if (backupData.id === "" || backupData.id === undefined) {
    delete backupData.id
  }

  // Set created_by if not provided
  if (!backupData.created_by) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session?.user?.id) {
      backupData.created_by = session.user.id
    }
  }

  const { data, error } = await supabase.from("backups").insert([backupData]).select()

  if (error) {
    console.error("Error creating backup:", error)
    throw new Error("Failed to create backup")
  }

  revalidatePath("/admin/backups")
  return data[0]
}

export async function updateBackup(id: string, backupData: any) {
  const supabase = createClient()

  // Don't update the ID
  if (backupData.id) {
    delete backupData.id
  }

  const { data, error } = await supabase.from("backups").update(backupData).eq("id", id).select()

  if (error) {
    console.error("Error updating backup:", error)
    throw new Error("Failed to update backup")
  }

  revalidatePath("/admin/backups")
  return data[0]
}

export async function deleteBackup(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from("backups").delete().eq("id", id)

  if (error) {
    console.error("Error deleting backup:", error)
    throw new Error("Failed to delete backup")
  }

  revalidatePath("/admin/backups")
  return { success: true }
}
