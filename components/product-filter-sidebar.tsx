"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface ProductFilterSidebarProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

export function ProductFilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: ProductFilterSidebarProps) {
  const clearFilters = () => {
    onCategoryChange(null)
    onPriceRangeChange([0, 1000])
  }

  const hasActiveFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < 1000

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-3 w-3 p-0"
                  onClick={() => onCategoryChange(null)}
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 1000) && (
              <Badge variant="secondary" className="gap-1">
                ₹{priceRange[0]} - ₹{priceRange[1]}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-3 w-3 p-0"
                  onClick={() => onPriceRangeChange([0, 1000])}
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all-categories"
              checked={!selectedCategory}
              onCheckedChange={() => onCategoryChange(null)}
            />
            <Label htmlFor="all-categories" className="text-sm font-medium">
              All Categories
            </Label>
          </div>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategory === category}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onCategoryChange(category)
                  } else {
                    onCategoryChange(null)
                  }
                }}
              />
              <Label htmlFor={`category-${category}`} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Product Features Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            'Biodegradable',
            'Compostable',
            'Food Safe',
            'CPCB Certified',
            'Non-Toxic',
            'Eco-Friendly'
          ].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox id={`feature-${feature}`} />
              <Label htmlFor={`feature-${feature}`} className="text-sm">
                {feature}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}