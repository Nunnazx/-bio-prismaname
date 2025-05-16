"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { Product, ProductFilter } from "@/types/product"
import { ProductFilterSidebar } from "@/components/product-filter-sidebar"
import { ProductSearch } from "@/components/product-search"
import { ProductSort } from "@/components/product-sort"
import { ProductGrid } from "@/components/product-grid"
import { ProductComparisonTool } from "@/components/product-comparison-tool"
import { useProductFilter } from "@/hooks/use-product-filter"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

interface ProductFilterClientWrapperProps {
  products: Product[]
  locale: string
}

export function ProductFilterClientWrapper({ products, locale }: ProductFilterClientWrapperProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Initialize filters from URL params
  const initialFilters: ProductFilter = {
    category: searchParams.get("category") || undefined,
    search: searchParams.get("search") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    features: searchParams.get("features") ? searchParams.get("features")?.split(",") : undefined,
    sortBy: (searchParams.get("sortBy") as ProductFilter["sortBy"]) || undefined,
    sortOrder: (searchParams.get("sortOrder") as ProductFilter["sortOrder"]) || undefined,
  }

  const {
    filters,
    updateFilter,
    resetFilters,
    filteredProducts,
    totalProducts,
    filteredCount,
    categories,
    availableFeatures,
    priceRange,
  } = useProductFilter(products, initialFilters)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.category) params.set("category", filters.category)
    if (filters.search) params.set("search", filters.search)
    if (filters.minPrice !== undefined) params.set("minPrice", filters.minPrice.toString())
    if (filters.maxPrice !== undefined) params.set("maxPrice", filters.maxPrice.toString())
    if (filters.features && filters.features.length > 0) params.set("features", filters.features.join(","))
    if (filters.sortBy) params.set("sortBy", filters.sortBy)
    if (filters.sortOrder) params.set("sortOrder", filters.sortOrder)

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.push(newUrl, { scroll: false })
  }, [filters, pathname, router])

  const handleSearch = (value: string) => {
    updateFilter({ search: value || undefined })
  }

  const handleSort = (sortBy: ProductFilter["sortBy"], sortOrder: ProductFilter["sortOrder"]) => {
    updateFilter({ sortBy, sortOrder })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <ProductFilterSidebar
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
          categories={categories}
          features={availableFeatures}
          priceRange={priceRange}
        />
      </div>

      {/* Main Content */}
      <div className="md:col-span-3 space-y-6">
        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <ProductSearch initialValue={filters.search || ""} onSearch={handleSearch} className="flex-1" />

          <div className="flex gap-2">
            {/* Mobile Filter Button */}
            <div className="md:hidden">
              <ProductFilterSidebar
                filters={filters}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
                categories={categories}
                features={availableFeatures}
                priceRange={priceRange}
                isMobile={true}
              />
            </div>

            <ProductComparisonTool products={products} locale={locale} />

            <ProductSort sortBy={filters.sortBy} sortOrder={filters.sortOrder} onSort={handleSort} />
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {filteredCount} of {totalProducts} products
          </p>

          {Object.keys(filters).some(
            (key) => key !== "sortBy" && key !== "sortOrder" && filters[key as keyof ProductFilter],
          ) && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Clear Filters
            </Button>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} locale={locale} />
      </div>
    </div>
  )
}
