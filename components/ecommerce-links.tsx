"use client"

import { OptimizedImage } from "@/components/optimized-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, ShoppingCart } from "lucide-react"

// Sample e-commerce platforms and links
const ecommerceLinks = [
  {
    id: "amazon",
    name: "Amazon",
    logo: "/ecommerce/amazon-logo.png",
    description: "Shop our biodegradable products on Amazon",
    link: "https://www.amazon.in/stores/AICMT/page/",
    products: [
      {
        name: "Biodegradable Garbage Bags (Medium)",
        price: "₹299",
        image: "/images/shop/garbage-bags.jpg",
        link: "https://www.amazon.in/product/biodegradable-garbage-bags",
      },
      {
        name: "Eco-Friendly Shopping Bags (Pack of 50)",
        price: "₹399",
        image: "/earth-friendly-shopping.png",
        link: "https://www.amazon.in/product/eco-shopping-bags",
      },
    ],
  },
  {
    id: "flipkart",
    name: "Flipkart",
    logo: "/ecommerce/flipkart-logo.png",
    description: "Find our products on Flipkart",
    link: "https://www.flipkart.com/seller/AICMT",
    products: [
      {
        name: "Compostable Food Containers (Set of 10)",
        price: "₹249",
        image: "/earth-friendly-takeout.png",
        link: "https://www.flipkart.com/product/compostable-food-containers",
      },
      {
        name: "Biodegradable Cutlery Set",
        price: "₹199",
        image: "/eco-friendly-packaging.png",
        link: "https://www.flipkart.com/product/biodegradable-cutlery",
      },
    ],
  },
  {
    id: "bigbasket",
    name: "BigBasket",
    logo: "/ecommerce/bigbasket-logo.png",
    description: "Order our eco-friendly products on BigBasket",
    link: "https://www.bigbasket.com/brands/AICMT",
    products: [
      {
        name: "Compostable Bin Liners (Large)",
        price: "₹349",
        image: "/eco-friendly-packaging.png",
        link: "https://www.bigbasket.com/product/compostable-bin-liners",
      },
    ],
  },
  {
    id: "zepto",
    name: "Zepto",
    logo: "/ecommerce/zepto-logo.png",
    description: "Get quick delivery of our products via Zepto",
    link: "https://www.zepto.com/brands/AICMT",
    products: [
      {
        name: "Biodegradable Produce Bags (Roll of 100)",
        price: "₹199",
        image: "/earth-friendly-shopping.png",
        link: "https://www.zepto.com/product/biodegradable-produce-bags",
      },
    ],
  },
]

export function EcommerceLinks() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Shop Our Products Online</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Our biodegradable products are available on major e-commerce platforms for your convenience
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
        {ecommerceLinks.map((platform) => (
          <a
            key={platform.id}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="h-12 flex items-center justify-center mb-4">
              <OptimizedImage
                src={platform.logo}
                alt={`${platform.name} e-commerce platform logo`}
                width={120}
                height={48}
                className="h-full w-auto object-contain"
                fallback={
                  <div className="h-12 w-32 bg-gray-100 flex items-center justify-center rounded">
                    <span className="font-medium text-gray-500">{platform.name}</span>
                  </div>
                }
              />
            </div>
            <p className="text-sm text-center text-gray-600">{platform.description}</p>
            <Button variant="ghost" size="sm" className="mt-4 gap-1">
              <ExternalLink className="h-4 w-4" />
              Visit Store
            </Button>
          </a>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-center mb-6">Featured Products</h3>

      <div className="grid md:grid-cols-3 gap-6">
        {ecommerceLinks
          .flatMap((platform) => platform.products)
          .slice(0, 6)
          .map((product, index) => {
            const platform = ecommerceLinks.find((p) => p.products.includes(product))
            return (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square relative">
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-900 mb-1">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold">{product.price}</span>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      aria-label={`Buy ${product.name} for ${product.price} on ${platform?.name}`}
                    >
                      <ShoppingCart className="h-3 w-3" />
                      Buy Now
                    </a>
                  </div>
                </CardContent>
              </Card>
            )
          })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 mb-4">
          Can't find what you're looking for? Contact us directly for bulk orders and custom solutions.
        </p>
        <Button>Contact for Bulk Orders</Button>
      </div>
    </div>
  )
}
