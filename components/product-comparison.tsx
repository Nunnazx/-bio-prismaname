"use client"

import { useState, useEffect } from 'react'
import { X, Plus, Check, Minus, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { OptimizedImage } from '@/components/optimized-image'
import { useToast } from '@/components/ui/use-toast'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { WishlistButton } from '@/components/wishlist-button'

interface Product {
  id: string
  name: string
  code: string
  description: string
  price: string | number
  category: string
  imageUrl: string
  specifications?: {
    [key: string]: string | number
  }
  features?: string[]
  certifications?: string[]
  applications?: string[]
}

interface ProductComparisonProps {
  className?: string
}

export function ProductComparison({ className = '' }: ProductComparisonProps) {
  const [compareProducts, setCompareProducts] = useState<Product[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const { toast } = useToast()

  // Mock products for comparison
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'PBAT Biodegradable Resin',
      code: 'PBAT-001',
      description: 'High-quality PBAT resin for flexible packaging',
      price: '₹850/kg',
      category: 'Resins',
      imageUrl: '/api/placeholder/300/200',
      specifications: {
        'Tensile Strength': '25 MPa',
        'Elongation at Break': '400%',
        'Biodegradation Time': '6-12 months',
        'Temperature Range': '-20°C to 60°C',
        'Density': '1.25 g/cm³'
      },
      features: ['Compostable', 'Food Safe', 'Flexible', 'Transparent'],
      certifications: ['ASTM D6400', 'EN 13432', 'BPI Certified'],
      applications: ['Food Packaging', 'Shopping Bags', 'Agricultural Films']
    },
    {
      id: '2',
      name: 'PLA Biodegradable Resin',
      code: 'PLA-002',
      description: 'Premium PLA resin for rigid applications',
      price: '₹750/kg',
      category: 'Resins',
      imageUrl: '/api/placeholder/300/200',
      specifications: {
        'Tensile Strength': '50 MPa',
        'Elongation at Break': '6%',
        'Biodegradation Time': '3-6 months',
        'Temperature Range': '0°C to 50°C',
        'Density': '1.24 g/cm³'
      },
      features: ['Rigid', 'Clear', 'Food Safe', 'Printable'],
      certifications: ['ASTM D6400', 'EN 13432', 'FDA Approved'],
      applications: ['Containers', 'Cutlery', '3D Printing', 'Bottles']
    },
    {
      id: '3',
      name: 'Starch-Based Blend',
      code: 'SBB-003',
      description: 'Natural starch-based biodegradable blend',
      price: '₹650/kg',
      category: 'Resins',
      imageUrl: '/api/placeholder/300/200',
      specifications: {
        'Tensile Strength': '15 MPa',
        'Elongation at Break': '200%',
        'Biodegradation Time': '2-4 months',
        'Temperature Range': '5°C to 45°C',
        'Density': '1.30 g/cm³'
      },
      features: ['Natural', 'Fast Degrading', 'Cost Effective', 'Renewable'],
      certifications: ['ASTM D6400', 'OK Compost'],
      applications: ['Mulch Films', 'Disposable Items', 'Packaging Foam']
    }
  ]

  useEffect(() => {
    // Load comparison products from localStorage
    const saved = localStorage.getItem('product-comparison')
    if (saved) {
      try {
        const productIds = JSON.parse(saved)
        const products = mockProducts.filter(p => productIds.includes(p.id))
        setCompareProducts(products)
        setIsVisible(products.length > 0)
      } catch (error) {
        console.error('Error loading comparison:', error)
      }
    }
  }, [])

  const addToComparison = (product: Product) => {
    if (compareProducts.length >= 3) {
      toast({
        title: "Comparison Limit",
        description: "You can compare up to 3 products at a time.",
        variant: "destructive"
      })
      return
    }

    if (compareProducts.find(p => p.id === product.id)) {
      toast({
        title: "Already Added",
        description: "This product is already in your comparison.",
        variant: "destructive"
      })
      return
    }

    const updated = [...compareProducts, product]
    setCompareProducts(updated)
    setIsVisible(true)
    
    // Save to localStorage
    localStorage.setItem('product-comparison', JSON.stringify(updated.map(p => p.id)))
    
    toast({
      title: "Added to Comparison",
      description: `${product.name} has been added to comparison.`,
    })
  }

  const removeFromComparison = (productId: string) => {
    const updated = compareProducts.filter(p => p.id !== productId)
    setCompareProducts(updated)
    
    if (updated.length === 0) {
      setIsVisible(false)
    }
    
    // Save to localStorage
    localStorage.setItem('product-comparison', JSON.stringify(updated.map(p => p.id)))
    
    toast({
      title: "Removed from Comparison",
      description: "Product has been removed from comparison.",
    })
  }

  const clearComparison = () => {
    setCompareProducts([])
    setIsVisible(false)
    localStorage.removeItem('product-comparison')
    
    toast({
      title: "Comparison Cleared",
      description: "All products have been removed from comparison.",
    })
  }

  // Get all unique specification keys
  const allSpecKeys = Array.from(
    new Set(
      compareProducts.flatMap(product => 
        Object.keys(product.specifications || {})
      )
    )
  ).sort()

  if (!isVisible || compareProducts.length === 0) {
    return null
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Product Comparison ({compareProducts.length}/3)</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearComparison}>
              Clear All
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {compareProducts.map((product) => (
            <Card key={product.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0 z-10"
                onClick={() => removeFromComparison(product.id)}
              >
                <X className="h-3 w-3" />
              </Button>
              
              <CardHeader className="pb-2">
                <div className="relative aspect-video mb-2">
                  <OptimizedImage
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <CardTitle className="text-sm">{product.name}</CardTitle>
                <p className="text-xs text-gray-500">{product.code}</p>
                <p className="text-sm font-semibold text-green-600">{product.price}</p>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-3">
                {/* Specifications */}
                {allSpecKeys.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium mb-2">Specifications</h4>
                    <div className="space-y-1">
                      {allSpecKeys.slice(0, 3).map(key => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-gray-600">{key}:</span>
                          <span className="font-medium">
                            {product.specifications?.[key] || '-'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {product.features && (
                  <div>
                    <h4 className="text-xs font-medium mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 3).map(feature => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <AddToCartButton 
                    product={product} 
                    size="sm" 
                    showQuantitySelector={false}
                    className="flex-1"
                  />
                  <WishlistButton
                    productId={product.id}
                    productName={product.name}
                    size="sm"
                    showText={false}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add More Products */}
          {compareProducts.length < 3 && (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="flex items-center justify-center h-full min-h-[200px]">
                <div className="text-center">
                  <Plus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Add another product</p>
                  <p className="text-xs text-gray-400">
                    Compare up to 3 products
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Hook to add products to comparison from other components
export function useProductComparison() {
  const { toast } = useToast()

  const addToComparison = (product: Product) => {
    // Get current comparison
    const saved = localStorage.getItem('product-comparison')
    const currentIds = saved ? JSON.parse(saved) : []
    
    if (currentIds.length >= 3) {
      toast({
        title: "Comparison Limit",
        description: "You can compare up to 3 products at a time.",
        variant: "destructive"
      })
      return false
    }

    if (currentIds.includes(product.id)) {
      toast({
        title: "Already Added",
        description: "This product is already in your comparison.",
        variant: "destructive"
      })
      return false
    }

    // Add to comparison
    const updated = [...currentIds, product.id]
    localStorage.setItem('product-comparison', JSON.stringify(updated))
    
    // Trigger a custom event to update the comparison component
    window.dispatchEvent(new CustomEvent('comparison-updated'))
    
    toast({
      title: "Added to Comparison",
      description: `${product.name} has been added to comparison.`,
    })
    
    return true
  }

  return { addToComparison }
}