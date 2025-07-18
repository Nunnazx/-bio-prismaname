"use client"

import { useState, useEffect } from 'react'
import { Heart, Package, Trash, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { OptimizedImage } from '@/components/optimized-image'
import { useToast } from '@/components/ui/use-toast'
import { useCart } from '@/lib/cart-context'

interface WishlistProduct {
  id: string
  name: string
  code: string
  description: string
  price: string | number
  imageUrl: string
  category: string
}

// Mock product data - replace with actual API call
const mockProducts: WishlistProduct[] = [
  {
    id: '1',
    name: 'PBAT Biodegradable Resin',
    code: 'PBAT-001',
    description: 'High-quality PBAT resin for flexible packaging applications',
    price: '₹850/kg',
    imageUrl: '/api/placeholder/300/200',
    category: 'Resins'
  },
  {
    id: '2',
    name: 'Compostable Shopping Bags',
    code: 'CSB-100',
    description: 'Certified compostable bags for retail use',
    price: '₹12/piece',
    imageUrl: '/api/placeholder/300/200',
    category: 'Bags'
  },
  {
    id: '3',
    name: 'Biodegradable Food Containers',
    code: 'BFC-250',
    description: 'Food-safe biodegradable containers',
    price: '₹25/piece',
    imageUrl: '/api/placeholder/300/200',
    category: 'Containers'
  }
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { addToCart } = useCart()

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    try {
      setLoading(true)
      
      // Get wishlist from localStorage
      if (typeof window !== 'undefined') {
        const wishlist = JSON.parse(localStorage.getItem('biodegradable-wishlist') || '[]')
        setWishlistItems(wishlist)
        
        // Filter products that are in wishlist
        const products = mockProducts.filter(product => wishlist.includes(product.id))
        setWishlistProducts(products)
      }
      
    } catch (error) {
      console.error('Error loading wishlist:', error)
      toast({
        title: "Error",
        description: "Failed to load wishlist. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = (productId: string) => {
    try {
      const updatedWishlist = wishlistItems.filter(id => id !== productId)
      localStorage.setItem('biodegradable-wishlist', JSON.stringify(updatedWishlist))
      setWishlistItems(updatedWishlist)
      setWishlistProducts(prev => prev.filter(product => product.id !== productId))
      
      toast({
        title: "Removed from Wishlist",
        description: "Product has been removed from your wishlist.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove product from wishlist.",
        variant: "destructive"
      })
    }
  }

  const handleAddToCart = (product: WishlistProduct) => {
    addToCart(product, 1)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const clearWishlist = () => {
    localStorage.setItem('biodegradable-wishlist', JSON.stringify([]))
    setWishlistItems([])
    setWishlistProducts([])
    
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-gray-600">{wishlistProducts.length} saved items</p>
          </div>
        </div>
        
        {wishlistProducts.length > 0 && (
          <Button variant="outline" onClick={clearWishlist}>
            Clear All
          </Button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Save products you're interested in to easily find them later.
          </p>
          <Link href="/en/products">
            <Button className="bg-green-600 hover:bg-green-700">
              <Package className="mr-2 h-4 w-4" />
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <OptimizedImage
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                <p className="text-sm text-gray-600 mb-2">{product.code}</p>
                <p className="text-sm text-gray-700 mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    {product.price}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 space-y-2">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <Heart className="mr-2 h-4 w-4 fill-current text-red-500" />
                  Remove from Wishlist
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}