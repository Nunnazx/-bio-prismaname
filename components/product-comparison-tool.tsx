"use client"

import { useState, useEffect } from "react"
import { X, ArrowLeft, ArrowRight } from "lucide-react"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OptimizedImage } from "@/components/optimized-image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface ProductComparisonToolProps {
  products: Product[]
  locale?: string
}

export function ProductComparisonTool({ products, locale = "en" }: ProductComparisonToolProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<"select" | "compare">("select")

  // Group products by category for easier selection
  const productsByCategory = products.reduce(
    (acc, product) => {
      const category = product.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(product)
      return acc
    },
    {} as Record<string, Product[]>,
  )

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setCurrentStep("select")
    }
  }, [open])

  const handleAddProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product && !selectedProducts.some((p) => p.id === productId)) {
      setSelectedProducts((prev) => [...prev, product])
    }
  }

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const handleCompare = () => {
    setCurrentStep("compare")
  }

  const handleBack = () => {
    setCurrentStep("select")
  }

  // Get all unique specification names from selected products
  const specificationNames = selectedProducts.reduce((acc, product) => {
    const specs = product.specifications || []
    specs.forEach((spec) => {
      if (!acc.includes(spec.name)) {
        acc.push(spec.name)
      }
    })
    return acc
  }, [] as string[])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Compare Products
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        {currentStep === "select" ? (
          <>
            <DialogHeader>
              <DialogTitle>Compare Products</DialogTitle>
              <DialogDescription>
                Select up to 3 products to compare their features and specifications.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6 my-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedProducts.map((product, index) => (
                  <div key={product.id} className="relative border rounded-md p-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-col items-center text-center pt-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <OptimizedImage
                          src={product.image_url || "/placeholder.svg?height=80&width=80&query=product"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                      <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{product.code}</p>
                    </div>
                  </div>
                ))}

                {selectedProducts.length < 3 && (
                  <div className="border rounded-md p-3 flex flex-col items-center justify-center min-h-[140px]">
                    <Select onValueChange={handleAddProduct}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Add product" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                          <div key={category}>
                            <div className="px-2 py-1.5 text-sm font-semibold">{category}</div>
                            {categoryProducts
                              .filter((p) => !selectedProducts.some((sp) => sp.id === p.id))
                              .map((product) => (
                                <SelectItem key={product.id} value={product.id}>
                                  {product.name}
                                </SelectItem>
                              ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-2">
                      {3 - selectedProducts.length} more product{selectedProducts.length < 2 ? "s" : ""} can be added
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={handleCompare} disabled={selectedProducts.length < 2}>
                  Compare
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="flex flex-row items-center justify-between">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <DialogTitle>Product Comparison</DialogTitle>
              <div className="w-[70px]"></div> {/* Spacer for alignment */}
            </DialogHeader>

            <ScrollArea className="flex-grow pr-4">
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-2 border-b w-1/4">Product</th>
                      {selectedProducts.map((product) => (
                        <th key={product.id} className="text-center p-2 border-b">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                              <OptimizedImage
                                src={product.image_url || "/placeholder.svg?height=64&width=64&query=product"}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="object-contain"
                              />
                            </div>
                            <h4 className="font-medium text-sm">{product.name}</h4>
                            <p className="text-xs text-gray-500">{product.code}</p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border-b font-medium">Category</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="text-center p-2 border-b">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-2 border-b font-medium">Price</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="text-center p-2 border-b">
                          {product.price || "Contact for pricing"}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-2 border-b font-medium">Features</td>
                      {selectedProducts.map((product) => {
                        const features = Array.isArray(product.features)
                          ? product.features
                          : product.features?.features || []

                        return (
                          <td key={product.id} className="p-2 border-b">
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </td>
                        )
                      })}
                    </tr>

                    {/* Specifications */}
                    {specificationNames.map((specName) => (
                      <tr key={specName}>
                        <td className="p-2 border-b font-medium">{specName}</td>
                        {selectedProducts.map((product) => {
                          const spec = (product.specifications || []).find((s) => s.name === specName)
                          return (
                            <td key={product.id} className="text-center p-2 border-b">
                              {spec?.value || "-"}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <Button variant="outline" asChild>
                <a href={`/${locale}/contact`}>Request Information</a>
              </Button>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
