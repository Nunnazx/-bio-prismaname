"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getRoles() {
  try {
    const data = await prisma.role.findMany({
      orderBy: { name: 'asc' }
    })

    return data
  } catch (error) {
    console.error("Error fetching roles:", error)
    throw new Error("Failed to fetch roles")
  }
}

export async function getRole(id: string) {
  try {
    const data = await prisma.role.findUnique({
      where: { id }
    })

    return data
  } catch (error) {
    console.error("Error fetching role:", error)
    throw new Error("Failed to fetch role")
  }
}

export async function createRole(roleData: any) {
  try {
    // Remove empty ID
    if (roleData.id === "" || roleData.id === undefined) {
      delete roleData.id
    }

    const data = await prisma.role.create({
      data: {
        ...roleData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    revalidatePath("/admin/roles")
    return data
  } catch (error) {
    console.error("Error creating role:", error)
    throw new Error("Failed to create role")
  }
}

export async function updateRole(id: string, roleData: any) {
  try {
    // Don't update the ID
    if (roleData.id) {
      delete roleData.id
    }

    const data = await prisma.role.update({
      where: { id },
      data: {
        ...roleData,
        updatedAt: new Date()
      }
    })

    revalidatePath("/admin/roles")
    return data
  } catch (error) {
    console.error("Error updating role:", error)
    throw new Error("Failed to update role")
  }
}

export async function deleteRole(id: string) {
  try {
    await prisma.role.delete({
      where: { id }
    })

    revalidatePath("/admin/roles")
    return { success: true }
  } catch (error) {
    console.error("Error deleting role:", error)
    throw new Error("Failed to delete role")
  }
}

export async function getPermissions() {
  try {
    const data = await prisma.permission.findMany({
      orderBy: { name: 'asc' }
    })

    return data
  } catch (error) {
    console.error("Error fetching permissions:", error)
    throw new Error("Failed to fetch permissions")
  }
}

export async function getRolePermissions(roleId: string) {
  try {
    const data = await prisma.rolePermission.findMany({
      where: { roleId },
      select: { permissionId: true }
    })

    return data.map((item) => item.permissionId)
  } catch (error) {
    console.error("Error fetching role permissions:", error)
    throw new Error("Failed to fetch role permissions")
  }
}

export async function updateRolePermissions(roleId: string, permissionIds: string[]) {
  try {
    // First delete existing permissions
    await prisma.rolePermission.deleteMany({
      where: { roleId }
    })

    // Then insert new permissions
    if (permissionIds.length > 0) {
      const permissionsToInsert = permissionIds.map((permissionId) => ({
        roleId,
        permissionId,
        createdAt: new Date(),
        updatedAt: new Date()
      }))

      await prisma.rolePermission.createMany({
        data: permissionsToInsert
      })
    }

    revalidatePath("/admin/roles")
    return { success: true }
  } catch (error) {
    console.error("Error updating role permissions:", error)
    throw new Error("Failed to update role permissions")
  }
}