export interface Product {
  id: string
  name: string
  code: string
  category: string
  description: string | null
  features: string[] | null
  specifications: ProductSpecification[] | null
  price: string | null
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductSpecification {
  name: string
  value: string
}

export interface ProductFilter {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  features?: string[]
  sortBy?: "name" | "price" | "newest"
  sortOrder?: "asc" | "desc"
}

export interface ProductFilterOption {
  id: string
  label: string
  count?: number
}
