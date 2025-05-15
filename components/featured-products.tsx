"use client"

import { useState } from "react"
import { OptimizedImage } from "@/components/optimized-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Info, ShoppingCart } from "lucide-react"
import Link from "next/link"

// Sample featured products data
const featuredProducts = [
  {
    id: "eco-bags-premium",
    name: "Premium Eco Shopping Bags",
    description: "Our new premium biodegradable shopping bags with reinforced handles and custom printing options.",
    image: "/earth-friendly-shopping.png",
    badge: "New",
    badgeColor: "bg-blue-100 text-blue-800",
    price: "₹299 per pack of 50",
    features: ["Extra strong handles", "100% biodegradable", "Custom printing available", "Multiple sizes"],
  },
  {
    id: "food-containers-pro",
    name: "Pro Food Containers",
    description: "Advanced biodegradable food containers with improved heat resistance and leak-proof design.",
    image: "/earth-friendly-takeout.png",
    badge: "Featured",
    badgeColor: "bg-green-100 text-green-800",
    price: "₹349 per pack of 25",
    features: ["Heat resistant up to 100°C", "Leak-proof design", "Microwave safe", "Various sizes available"],
  },
  {
    id: "agri-film-plus",
    name: "Agricultural Film Plus",
    description: "Enhanced biodegradable agricultural film with improved UV resistance and durability.",
    image: "/clear-eco-pellets.png",
    badge: "New",
    badgeColor: "bg-blue-100 text-blue-800",
    price: "₹1,499 per roll",
    features: ["UV resistant", "Enhanced durability", "Fully biodegradable", "Custom widths available"],
  },
  {
    id: "garbage-bags-xl",
    name: "XL Garbage Bags",
    description: "Extra large biodegradable garbage bags with enhanced tear resistance and odor control.",
    image: "/images/shop/garbage-bags.jpg",
    badge: "Best Seller",
    badgeColor: "bg-orange-100 text-orange-800",
    price: "₹399 per pack of 30",
    features: ["Extra large capacity", "Tear resistant", "Odor control technology", "Drawstring closure"],
  },
]

export function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Discover our newest and most popular biodegradable plastic solutions
          </p>
        </div>
        <Link href="/products">
          <Button variant="outline" className="mt-4 md:mt-0 gap-2">
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            tabIndex={0}
          >
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <OptimizedImage
                  src={product.image}
                  alt={`${product.name}: ${product.description}`}
                  width={300}
                  height={300}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredProduct === product.id ? "scale-110" : "scale-100"
                  }`}
                />
              </div>

              {product.badge && (
                <Badge className={`absolute top-2 right-2 ${product.badgeColor}`}>{product.badge}</Badge>
              )}
            </div>

            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="font-medium text-green-600 mb-2">{product.price}</div>

              <div className="space-y-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <Star className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <Info className="h-3 w-3" />
                Details
              </Button>
              <Button size="sm" className="gap-1" aria-label={`Inquire about ${product.name}`}>
                <ShoppingCart className="h-3 w-3" />
                Inquire
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-green-50 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/4 flex justify-center">
            <OptimizedImage
              src="/eco-friendly-packaging.png"
              alt="Special food packaging"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-3/4">
            <Badge className="bg-green-100 text-green-800 mb-2">Special Highlight</Badge>
            <h3 className="text-xl font-bold mb-2">Special Food Packaging Solutions</h3>
            <p className="text-gray-600 mb-4">
              Our specialized food packaging solutions are designed to meet the unique requirements of the food
              industry. From heat-resistant containers to leak-proof designs, we offer a complete range of biodegradable
              options.
            </p>
            <Button className="gap-2">
              Explore Food Packaging
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
