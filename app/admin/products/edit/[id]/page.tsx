import { ProductForm } from "@/components/admin/product-form"
import { getProduct } from "@/app/actions/products"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Edit Product | Admin Dashboard",
  description: "Update product information",
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params

  try {
    const product = await getProduct(id)

    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <ProductForm product={product} />
      </div>
    )
  } catch (error) {
    console.error("Error fetching product:", error)
    notFound()
  }
}
