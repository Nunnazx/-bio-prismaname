"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getUsers() {
  const supabase = createClient()

  const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
    throw new Error("Failed to fetch users")
  }

  return data
}

export async function getUser(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching user:", error)
    throw new Error("Failed to fetch user")
  }

  return data
}

export async function updateUser(id: string, userData: any) {
  const supabase = createClient()

  // Don't update the ID
  if (userData.id) {
    delete userData.id
  }

  const { data, error } = await supabase.from("profiles").update(userData).eq("id", id).select()

  if (error) {
    console.error("Error updating user:", error)
    throw new Error("Failed to update user")
  }

  revalidatePath("/admin/users")
  revalidatePath(`/admin/users/${id}`)
  return data[0]
}

export async function createUserProfile(userData: any) {
  const supabase = createClient()

  // For profiles, ID must match auth.users ID
  if (!userData.id) {
    throw new Error("User ID is required for creating a profile")
  }

  const { data, error } = await supabase.from("profiles").insert([userData]).select()

  if (error) {
    console.error("Error creating user profile:", error)
    throw new Error("Failed to create user profile")
  }

  revalidatePath("/admin/users")
  return data[0]
}

export async function getUserStats() {
  const supabase = createClient()

  const { data: users, error } = await supabase.from("profiles").select("role, created_at")

  if (error) {
    console.error("Error fetching user stats:", error)
    return {
      total: 0,
      active: 0,
      admins: 0,
      pending: 0,
      newThisMonth: 0,
    }
  }

  const now = new Date()
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const stats = {
    total: users?.length || 0,
    active: users?.length || 0, // Assuming all users are active for now
    admins: users?.filter((user) => user.role === "admin").length || 0,
    pending: 0, // Will implement invitation system later
    newThisMonth: users?.filter((user) => new Date(user.created_at) >= thisMonth).length || 0,
  }

  return stats
}

export async function updateUserRole(userId: string, role: string) {
  const supabase = createClient()

  const { error } = await supabase.from("profiles").update({ role }).eq("id", userId)

  if (error) {
    console.error("Error updating user role:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/users")
  return { success: true }
}

export async function deleteUser(userId: string) {
  const supabase = createClient()

  const { error } = await supabase.from("profiles").delete().eq("id", userId)

  if (error) {
    console.error("Error deleting user:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/users")
  return { success: true }
}
