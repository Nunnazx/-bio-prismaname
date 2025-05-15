import { ArrowLeft, Download, Leaf, Shield } from "lucide-react"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LanguageMeta } from "@/components/language-meta"
import { OptimizedImage } from "@/components/optimized-image"

async function getProducts() {
  const supabase = createServerComponentClient({ cookies })

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return products || []
}

export default async function ProductsPage({ params }: { params: { locale: string } }) {
  const products = await getProducts()

  // Group products by category
  const productsByCategory = products.reduce(
    (acc, product) => {
      const category = product.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(product)
      return acc
    },
    {} as Record<string, any[]>,
  )

  // Get unique categories for tabs
  const categories = Object.keys(productsByCategory)

  return (
    <>
      <LanguageMeta pageName="products" />
      <div className="container px-4 py-12 md:px-6 md:py-24">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <Link href={`/${params.locale}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Products</h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl">
              Explore our range of compostable plastic alternatives that are safe for you and the planet
            </p>
          </div>

          {/* Safety Banner */}
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">Safety Certified</h3>
              <p className="text-sm text-green-700">
                All our products are CPCB certified and tested for safety and compostability
              </p>
            </div>
          </div>

          {categories.length > 0 ? (
            <Tabs defaultValue={categories[0]} className="w-full">
              <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="pt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {productsByCategory[category].map((product) => {
                      // Parse features from JSONB
                      const features = product.features?.features || []

                      return (
                        <Card key={product.id}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{product.name}</CardTitle>
                                <CardDescription>CODE: {product.code}</CardDescription>
                              </div>
                              <Badge className="bg-green-600">CPCB Certified</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="aspect-square overflow-hidden rounded-md mb-4 bg-gray-100 flex items-center justify-center">
                              <OptimizedImage
                                src={product.image_url || "/placeholder.svg?height=300&width=300&query=product"}
                                alt={`${product.name} - ${product.description}`}
                                width={300}
                                height={300}
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-medium">Properties:</h3>
                              <ul className="list-disc pl-5 space-y-1">
                                {features.slice(0, 5).map((feature, index) => (
                                  <li key={index}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-green-700 text-sm">
                              <Leaf className="h-4 w-4" />
                              <span>100% Biodegradable & Non-toxic</span>
                            </div>
                          </CardContent>
                          <CardFooter className="flex gap-2">
                            <Button className="w-full">Request Sample</Button>
                          </CardFooter>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found. Please add products through the admin dashboard.</p>
            </div>
          )}

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold">Download Product Catalog</h2>
                <p className="text-gray-500">
                  Get detailed specifications and information about our complete product range
                </p>
              </div>
              <Button className="w-full md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download Catalog
              </Button>
            </div>
          </div>

          {/* Safety and Certification Section */}
          <div className="mt-8 bg-white border rounded-lg overflow-hidden">
            <div className="bg-green-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Safety & Certifications</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">CPCB Certified</h3>
                  <p className="text-sm text-gray-600">
                    All our products are certified by the Central Pollution Control Board
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">100% Biodegradable</h3>
                  <p className="text-sm text-gray-600">
                    Our products completely break down into natural elements within 180 days
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2">Non-Toxic</h3>
                  <p className="text-sm text-gray-600">
                    Safe for humans, animals, and the environment with no harmful chemicals
                  </p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href={`/${params.locale}/certification`}>
                  <Button variant="outline">View All Certifications</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
