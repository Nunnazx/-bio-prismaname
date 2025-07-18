"use server"

import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'
import { InquiryStatus, InquiryPriority, InquiryType } from '@prisma/client'

// Get all inquiries with pagination and filtering
export async function getInquiries({
  page = 1,
  limit = 10,
  status,
  priority,
  search,
  sort = 'createdAt',
  order = 'desc'
}: {
  page?: number
  limit?: number
  status?: InquiryStatus
  priority?: InquiryPriority
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
} = {}) {
  try {
    // Build filter conditions
    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (priority) {
      where.priority = priority
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    // Count total matching inquiries
    const totalCount = await prisma.inquiry.count({ where })
    const totalPages = Math.ceil(totalCount / limit)
    
    // Get inquiries with pagination
    const inquiries = await prisma.inquiry.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sort]: order },
      include: {
        product: {
          select: {
            name: true,
            code: true,
            slug: true
          }
        },
        assignedTo: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })
    
    return {
      inquiries,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    }
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    throw new Error('Failed to fetch inquiries')
  }
}

// Get a single inquiry by ID
export async function getInquiry(id: string) {
  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: {
        product: true,
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })
    
    if (!inquiry) {
      throw new Error('Inquiry not found')
    }
    
    return inquiry
  } catch (error) {
    console.error('Error fetching inquiry:', error)
    throw new Error('Failed to fetch inquiry')
  }
}

// Create a new inquiry
export async function createInquiry(data: any) {
  try {
    // Format the inquiry data
    const inquiryData = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      message: data.message,
      inquiryType: data.inquiryType as InquiryType || InquiryType.PRODUCT_INFO,
      productId: data.productId || null,
      productInterest: data.productInterest || null,
      status: InquiryStatus.NEW,
      priority: InquiryPriority.MEDIUM,
      source: data.source || 'website',
      referrer: data.referrer || null
    }
    
    // Create the inquiry
    const inquiry = await prisma.inquiry.create({
      data: inquiryData
    })
    
    revalidatePath('/admin/inquiries')
    
    return { success: true, inquiry }
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return { success: false, error: error.message }
  }
}

// Update an inquiry
export async function updateInquiry(id: string, data: any) {
  try {
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data
    })
    
    revalidatePath('/admin/inquiries')
    revalidatePath(`/admin/inquiries/${id}`)
    
    return { success: true, inquiry }
  } catch (error) {
    console.error('Error updating inquiry:', error)
    return { success: false, error: error.message }
  }
}

// Update inquiry status
export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  try {
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
        responseDate: status === InquiryStatus.RESPONDED ? new Date() : undefined
      }
    })
    
    revalidatePath('/admin/inquiries')
    revalidatePath(`/admin/inquiries/${id}`)
    
    return { success: true, inquiry }
  } catch (error) {
    console.error('Error updating inquiry status:', error)
    return { success: false, error: error.message }
  }
}

// Assign inquiry to user
export async function assignInquiry(id: string, userId: string) {
  try {
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        assignedToId: userId,
        status: InquiryStatus.IN_PROGRESS,
        updatedAt: new Date()
      }
    })
    
    revalidatePath('/admin/inquiries')
    revalidatePath(`/admin/inquiries/${id}`)
    
    return { success: true, inquiry }
  } catch (error) {
    console.error('Error assigning inquiry:', error)
    return { success: false, error: error.message }
  }
}

// Add note to inquiry
export async function addInquiryNote(id: string, note: string) {
  try {
    // Get existing notes
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      select: { notes: true }
    })
    
    // Format new note with timestamp
    const timestamp = new Date().toISOString()
    const formattedNote = `[${timestamp}] ${note}`
    
    // Combine existing and new notes
    const updatedNotes = inquiry?.notes 
      ? `${inquiry.notes}\n\n${formattedNote}`
      : formattedNote
    
    // Update inquiry with new notes
    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        notes: updatedNotes,
        updatedAt: new Date()
      }
    })
    
    revalidatePath('/admin/inquiries')
    revalidatePath(`/admin/inquiries/${id}`)
    
    return { success: true, inquiry: updatedInquiry }
  } catch (error) {
    console.error('Error adding inquiry note:', error)
    return { success: false, error: error.message }
  }
}

// Get inquiry statistics
export async function getInquiryStats() {
  try {
    const [total, newInquiries, inProgress, completed] = await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: InquiryStatus.NEW } }),
      prisma.inquiry.count({ where: { status: InquiryStatus.IN_PROGRESS } }),
      prisma.inquiry.count({ where: { status: InquiryStatus.COMPLETED } })
    ])
    
    // Get counts by type
    const typeCounts = await prisma.inquiry.groupBy({
      by: ['inquiryType'],
      _count: {
        id: true
      }
    })
    
    const types = typeCounts.map(item => ({
      type: item.inquiryType,
      count: item._count.id
    }))
    
    // Get recent inquiries (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const recentCount = await prisma.inquiry.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })
    
    return {
      total,
      new: newInquiries,
      inProgress,
      completed,
      types,
      recentCount,
      conversionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    }
  } catch (error) {
    console.error('Error fetching inquiry stats:', error)
    return {
      total: 0,
      new: 0,
      inProgress: 0,
      completed: 0,
      types: [],
      recentCount: 0,
      conversionRate: 0
    }
  }
}