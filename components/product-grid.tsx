"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { OptimizedImage } from '@/components/optimized-image'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { WishlistButton } from '@/components/wishlist-button'
import { ProductReviews } from '@/components/product-reviews'
import { Eye, Star, ShoppingCart, Heart } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface Product {
  id: string
  name: string
  code: string
  description: string
  category: string
  price: string | number
  imageUrl: string
  features?: string[]
  specifications?: any
  isFeatured?: boolean
  stockStatus?: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <OptimizedImage
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isFeatured && (
                  <Badge className="absolute top-2 left-2 bg-green-600">
                    Featured
                  </Badge>
                )}
                <div className="absolute top-2 right-2">
                  <WishlistButton
                    productId={product.id}
                    productName={product.name}
                    size="sm"
                    showText={false}
                    variant="ghost"
                    className="bg-white/80 hover:bg-white"
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{product.code}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                </div>
                
                <div className="text-lg font-bold text-green-600">
                  {typeof product.price === 'string' ? product.price : `₹${product.price}`}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 space-y-2">
              <div className="flex gap-2 w-full">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{product.name}</DialogTitle>
                      <DialogDescription>{product.code}</DialogDescription>
                    </DialogHeader>
                    <ProductDetailModal product={product} />
                  </DialogContent>
                </Dialog>
              </div>
              
              <AddToCartButton 
                product={product} 
                size="sm" 
                showQuantitySelector={false}
                className="w-full"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

function ProductDetailModal({ product }: { product: Product }) {
  return (
    <div className="space-y-6">
      {/* Product Images and Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <OptimizedImage
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.code}</p>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
          
          <p className="text-gray-700">{product.description}</p>
          
          <div className="text-2xl font-bold text-green-600">
            {typeof product.price === 'string' ? product.price : `₹${product.price}`}
          </div>
          
          {product.features && (
            <div>
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="space-y-3">
            <AddToCartButton 
              product={product} 
              className="w-full"
            />
            <div className="flex gap-2">
              <WishlistButton
                productId={product.id}
                productName={product.name}
                className="flex-1"
              />
              <Button variant="outline" className="flex-1">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Specifications */}
      {product.specifications && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Specifications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b">
                <span className="font-medium">{key}:</span>
                <span className="text-gray-600">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Reviews Section */}
      <div>
        <ProductReviews 
          productId={product.id} 
          productName={product.name} 
        />
      </div>
    </div>
  )
}