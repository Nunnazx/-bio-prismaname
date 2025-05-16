"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronUp, Filter } from "lucide-react"
import type { ProductFilter, ProductFilterOption } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface ProductFilterSidebarProps {
  filters: ProductFilter
  updateFilter: (filter: Partial<ProductFilter>) => void
  resetFilters: () => void
  categories: ProductFilterOption[]
  features: ProductFilterOption[]
  priceRange: { min: number; max: number }
  className?: string
  isMobile?: boolean
}

export function ProductFilterSidebar({
  filters,
  updateFilter,
  resetFilters,
  categories,
  features,
  priceRange,
  className,
  isMobile = false,
}: ProductFilterSidebarProps) {
  const [expanded, setExpanded] = useState({
    categories: true,
    price: true,
    features: true,
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCategoryChange = (categoryId: string) => {
    updateFilter({ category: filters.category === categoryId ? undefined : categoryId })
  }

  const handleFeatureChange = (featureId: string) => {
    const currentFeatures = filters.features || []
    const newFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter((id) => id !== featureId)
      : [...currentFeatures, featureId]

    updateFilter({ features: newFeatures.length > 0 ? newFeatures : undefined })
  }

  const handlePriceChange = (value: number[]) => {
    updateFilter({
      minPrice: value[0],
      maxPrice: value[1],
    })
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

  const filterContent = (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      {/* Categories */}
      <div className="border-t pt-4">
        <button onClick={() => toggleSection("categories")} className="flex w-full items-center justify-between mb-2">
          <h4 className="text-sm font-medium">Categories</h4>
          {expanded.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {expanded.categories && (
          <div className="space-y-2 mt-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filters.category === category.id}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <Label htmlFor={`category-${category.id}`} className="text-sm flex-1 cursor-pointer">
                  {category.label}
                </Label>
                <span className="text-xs text-gray-500">({category.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-t pt-4">
        <button onClick={() => toggleSection("price")} className="flex w-full items-center justify-between mb-2">
          <h4 className="text-sm font-medium">Price Range</h4>
          {expanded.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {expanded.price && (
          <div className="space-y-4 mt-2">
            <Slider
              defaultValue={[priceRange.min, priceRange.max]}
              min={priceRange.min}
              max={priceRange.max}
              step={10}
              value={[filters.minPrice ?? priceRange.min, filters.maxPrice ?? priceRange.max]}
              onValueChange={handlePriceChange}
              className="my-6"
            />
            <div className="flex items-center justify-between">
              <div className="border rounded-md px-2 py-1 w-24">
                <p className="text-xs text-gray-500">Min</p>
                <p className="font-medium">{formatPrice(filters.minPrice ?? priceRange.min)}</p>
              </div>
              <div className="border rounded-md px-2 py-1 w-24">
                <p className="text-xs text-gray-500">Max</p>
                <p className="font-medium">{formatPrice(filters.maxPrice ?? priceRange.max)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="border-t pt-4">
        <button onClick={() => toggleSection("features")} className="flex w-full items-center justify-between mb-2">
          <h4 className="text-sm font-medium">Features</h4>
          {expanded.features ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {expanded.features && (
          <div className="space-y-2 mt-2">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${feature.id}`}
                  checked={(filters.features || []).includes(feature.id)}
                  onCheckedChange={() => handleFeatureChange(feature.id)}
                />
                <Label htmlFor={`feature-${feature.id}`} className="text-sm cursor-pointer">
                  {feature.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // Mobile filter button and drawer
  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 bg-black/50">
            <div className="fixed bottom-0 left-0 right-0 top-auto z-50 h-[80vh] rounded-t-xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="overflow-y-auto h-[calc(80vh-8rem)]">{filterContent}</div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      resetFilters()
                      setMobileFiltersOpen(false)
                    }}
                  >
                    Reset
                  </Button>
                  <Button className="flex-1" onClick={() => setMobileFiltersOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return filterContent
}
