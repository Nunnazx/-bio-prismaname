import { 
  User, 
  Product, 
  ProductImage, 
  BlogPost, 
  Inquiry, 
  Media, 
  Review, 
  Analytics, 
  Newsletter, 
  Setting, 
  CustomOrder, 
  Certification,
  UserRole,
  UserStatus,
  ProductCategory,
  ProductStatus,
  StockStatus,
  BlogStatus,
  InquiryType,
  InquiryStatus,
  InquiryPriority,
  MediaCategory,
  ReviewStatus,
  NewsletterFrequency,
  CustomOrderStatus
} from '@prisma/client'

// Re-export all types from Prisma
export {
  User, 
  Product, 
  ProductImage, 
  BlogPost, 
  Inquiry, 
  Media, 
  Review, 
  Analytics, 
  Newsletter, 
  Setting, 
  CustomOrder, 
  Certification,
  UserRole,
  UserStatus,
  ProductCategory,
  ProductStatus,
  StockStatus,
  BlogStatus,
  InquiryType,
  InquiryStatus,
  InquiryPriority,
  MediaCategory,
  ReviewStatus,
  NewsletterFrequency,
  CustomOrderStatus
}

// Extended types with relationships
export type ProductWithImages = Product & {
  images: ProductImage[]
}

export type BlogPostWithAuthor = BlogPost & {
  author: {
    firstName: string | null
    lastName: string | null
    email: string
    avatarUrl: string | null
  }
}

export type InquiryWithDetails = Inquiry & {
  product?: {
    name: string
    code: string
    slug: string
  } | null
  assignedTo?: {
    firstName: string | null
    lastName: string | null
    email: string
  } | null
}

export type UserWithCounts = User & {
  _count: {
    blogPosts: number
    inquiries: number
    media: number
  }
}

// Request/Response types
export type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
  }
}

export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Filter types
export type ProductFilter = {
  page?: number
  limit?: number
  category?: ProductCategory
  status?: ProductStatus
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export type BlogPostFilter = {
  page?: number
  limit?: number
  status?: BlogStatus
  category?: string
  tag?: string
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export type InquiryFilter = {
  page?: number
  limit?: number
  status?: InquiryStatus
  priority?: InquiryPriority
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export type UserFilter = {
  page?: number
  limit?: number
  role?: UserRole
  status?: UserStatus
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}

// Stats types
export type ProductStats = {
  total: number
  active: number
  featured: number
  outOfStock: number
  categories: {
    category: ProductCategory
    count: number
  }[]
}

export type BlogStats = {
  total: number
  published: number
  drafts: number
  scheduled: number
  archived: number
  categories: number
  tags: number
  recentCount: number
  featured: number
}

export type InquiryStats = {
  total: number
  new: number
  inProgress: number
  completed: number
  types: {
    type: InquiryType
    count: number
  }[]
  recentCount: number
  conversionRate: number
}

export type UserStats = {
  total: number
  admins: number
  editors: number
  active: number
  inactive: number
  newThisMonth: number
  pending: number
}