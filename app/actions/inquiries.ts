"use server"

import { prisma } from "@/lib/prisma"

// Create a new inquiry
export async function createInquiry(formData: FormData) {
  try {
    console.log("Creating inquiry:", formData);
    
    // Extract data from FormData
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;
    const inquiryTypeRaw = formData.get("inquiryType") as string;
    const productId = formData.get("productId") as string;
    const productInterest = formData.get("productInterest") as string;
    
    // Map form inquiry types to database enum values
    const inquiryTypeMap = {
      "product": "PRODUCT_INFO",
      "quote": "QUOTE_REQUEST", 
      "sample": "SAMPLE_REQUEST",
      "partnership": "PARTNERSHIP",
      "other": "OTHER"
    };
    
    const inquiryType = inquiryTypeMap[inquiryTypeRaw] || "PRODUCT_INFO";
    
    console.log("Mapped inquiry type:", inquiryTypeRaw, "->", inquiryType);
    
    // Save to database using Prisma
    const inquiry = await prisma.inquiry.create({
      data: {
        name: name,
        email: email,
        phone: phone || null,
        company: company || null,
        message: message,
        inquiryType: inquiryType,
        productId: productId || null,
        productInterest: productInterest || null,
        status: "NEW",
        priority: "MEDIUM",
        source: "website",
        referrer: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    
    console.log("Inquiry saved to database:", inquiry);
    return { success: true, inquiry };
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return { success: false, error: error.message };
  }
}

// Get all inquiries from database
export async function getInquiries() {
  try {
    // Get inquiries from database
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Get total count for pagination
    const totalCount = await prisma.inquiry.count();

    return {
      inquiries: inquiries.map(inquiry => ({
        ...inquiry,
        createdAt: inquiry.createdAt.toISOString(),
        updatedAt: inquiry.updatedAt.toISOString()
      })),
      pagination: {
        page: 1,
        limit: 10,
        totalCount,
        totalPages: Math.ceil(totalCount / 10)
      }
    };
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return {
      inquiries: [],
      pagination: {
        page: 1,
        limit: 10,
        totalCount: 0,
        totalPages: 0
      }
    };
  }
}

// Get inquiry statistics from database
export async function getInquiryStats() {
  try {
    // Get total count
    const total = await prisma.inquiry.count();
    
    // Get counts by status
    const newCount = await prisma.inquiry.count({
      where: { status: "NEW" }
    });
    
    const inProgressCount = await prisma.inquiry.count({
      where: { status: "IN_PROGRESS" }
    });
    
    const completedCount = await prisma.inquiry.count({
      where: { status: "COMPLETED" }
    });
    
    // Get counts by inquiry type
    const typeStats = await prisma.inquiry.groupBy({
      by: ['inquiryType'],
      _count: {
        inquiryType: true
      }
    });
    
    // Get recent inquiries (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentCount = await prisma.inquiry.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });
    
    return {
      total,
      new: newCount,
      inProgress: inProgressCount,
      completed: completedCount,
      types: typeStats.map(stat => ({
        type: stat.inquiryType,
        count: stat._count.inquiryType
      })),
      recentCount,
      conversionRate: total > 0 ? Math.round((completedCount / total) * 100) : 0
    };
  } catch (error) {
    console.error("Error fetching inquiry stats:", error);
    return {
      total: 0,
      new: 0,
      inProgress: 0,
      completed: 0,
      types: [],
      recentCount: 0,
      conversionRate: 0
    };
  }
}

// Update inquiry status
export async function updateInquiry(id: string, data: any) {
  try {
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
    
    return { success: true, inquiry };
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return { success: false, error: error.message };
  }
}

// Get inquiry by ID
export async function getInquiryById(id: string) {
  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: {
        product: true,
        assignedTo: true
      }
    });
    
    if (inquiry) {
      return {
        ...inquiry,
        createdAt: inquiry.createdAt.toISOString(),
        updatedAt: inquiry.updatedAt.toISOString()
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching inquiry by ID:", error);
    return null;
  }
}

// Delete inquiry
export async function deleteInquiry(id: string) {
  try {
    await prisma.inquiry.delete({
      where: { id }
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return { success: false, error: error.message };
  }
}