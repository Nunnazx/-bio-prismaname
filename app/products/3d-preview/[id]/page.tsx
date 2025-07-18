import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Product360Viewer } from "@/components/product-360-viewer"
import { getProductById } from "@/mongodb-prisma/actions/products"

export default async function ProductPreviewPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  // Get model URL from product
  const modelUrl = product.modelUrl

  if (!modelUrl) {
    notFound()
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Link href={`/products/${params.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Product
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{product.name} - 3D Preview</h1>
          <p className="text-gray-500 mt-2">
            Interact with the 3D model by dragging to rotate, scrolling to zoom, and double-clicking to reset the view.
          </p>
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <Product360Viewer
            modelUrl={modelUrl}
            alt={`3D model of ${product.name}`}
            className="aspect-square w-full h-full border rounded-lg shadow-lg"
          />
        </div>

        <div className="max-w-3xl mx-auto mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">About This Product</h2>
          <p className="mb-4">{product.description}</p>
          <div className="flex justify-center mt-6">
            <Link href={`/products/${params.id}`}>
              <Button>View Product Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}