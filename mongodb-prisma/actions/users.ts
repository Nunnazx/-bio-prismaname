"use server"

import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'
import { UserRole, UserStatus } from '@prisma/client'
import { hash, compare } from 'bcrypt'

// Get all users with pagination and filtering
export async function getUsers({
  page = 1,
  limit = 10,
  role,
  status,
  search,
  sort = 'createdAt',
  order = 'desc'
}: {
  page?: number
  limit?: number
  role?: UserRole
  status?: UserStatus
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
} = {}) {
  try {
    // Build filter conditions
    const where: any = {}
    
    if (role) {
      where.role = role
    }
    
    if (status) {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    // Count total matching users
    const totalCount = await prisma.user.count({ where })
    const totalPages = Math.ceil(totalCount / limit)
    
    // Get users with pagination
    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sort]: order },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        company: true,
        position: true,
        avatarUrl: true,
        createdAt: true,
        lastLogin: true,
        _count: {
          select: {
            blogPosts: true,
            inquiries: true,
            media: true
          }
        }
      }
    })
    
    return {
      users,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw new Error('Failed to fetch users')
  }
}

// Get a single user by ID
export async function getUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            blogPosts: true,
            inquiries: true,
            media: true
          }
        }
      }
    })
    
    if (!user) {
      throw new Error('User not found')
    }
    
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    throw new Error('Failed to fetch user')
  }
}

// Create a new user
export async function createUser(data: any) {
  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })
    
    if (existingUser) {
      return { success: false, error: 'Email already in use' }
    }
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        company: data.company,
        position: data.position,
        role: data.role || UserRole.USER,
        status: data.status || UserStatus.ACTIVE,
        avatarUrl: data.avatarUrl,
        preferences: data.preferences || {}
      }
    })
    
    revalidatePath('/admin/users')
    
    return { success: true, user }
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, error: error.message }
  }
}

// Update a user
export async function updateUser(id: string, data: any) {
  try {
    // Check if email is being changed and already exists
    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: id }
        }
      })
      
      if (existingUser) {
        return { success: false, error: 'Email already in use' }
      }
    }
    
    // Update the user
    const user = await prisma.user.update({
      where: { id },
      data
    })
    
    revalidatePath('/admin/users')
    revalidatePath(`/admin/users/${id}`)
    
    return { success: true, user }
  } catch (error) {
    console.error('Error updating user:', error)
    return { success: false, error: error.message }
  }
}

// Update user role
export async function updateUserRole(id: string, role: UserRole) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { role }
    })
    
    revalidatePath('/admin/users')
    revalidatePath(`/admin/users/${id}`)
    
    return { success: true, user }
  } catch (error) {
    console.error('Error updating user role:', error)
    return { success: false, error: error.message }
  }
}

// Update user status
export async function updateUserStatus(id: string, status: UserStatus) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { status }
    })
    
    revalidatePath('/admin/users')
    revalidatePath(`/admin/users/${id}`)
    
    return { success: true, user }
  } catch (error) {
    console.error('Error updating user status:', error)
    return { success: false, error: error.message }
  }
}

// Delete a user
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id }
    })
    
    revalidatePath('/admin/users')
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting user:', error)
    return { success: false, error: error.message }
  }
}

// Get user statistics
export async function getUserStats() {
  try {
    const [total, admins, editors, active, inactive] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.ADMIN } }),
      prisma.user.count({ where: { role: UserRole.EDITOR } }),
      prisma.user.count({ where: { status: UserStatus.ACTIVE } }),
      prisma.user.count({ where: { status: UserStatus.INACTIVE } })
    ])
    
    // Get new users in the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const newThisMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })
    
    return {
      total,
      admins,
      editors,
      active,
      inactive,
      newThisMonth,
      pending: await prisma.user.count({ where: { status: UserStatus.PENDING } })
    }
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return {
      total: 0,
      admins: 0,
      editors: 0,
      active: 0,
      inactive: 0,
      newThisMonth: 0,
      pending: 0
    }
  }
}