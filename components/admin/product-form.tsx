"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Trash, Star, StarOff, GripVertical } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { OptimizedImage } from "@/components/optimized-image"
import { createProduct, updateProduct } from "@/app/actions/products"
import { toast } from "@/components/ui/use-toast"

// Product categories
const PRODUCT_CATEGORIES = [
  { id: "granules", name: "Granules & Resins" },
  { id: "bags", name: "Carry Bags" },
  { id: "packaging", name: "Food Packaging" },
  { id: "films", name: "Films & Wraps" },
  { id: "custom", name: "Custom Solutions" },
]

export function ProductForm({ product = null }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: product?.name || "",
    code: product?.code || "",
    category: product?.category || "granules",
    description: product?.description || "",
    features: product?.features?.features || [""],
    specifications: product?.specifications || [{ name: "", value: "" }],
    price: product?.price || "",
    is_active: product?.is_active ?? true,
  })

  // Image handling
  const [newImages, setNewImages] = useState<File[]>([])
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<any[]>([])
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([])
  const [primaryImageId, setPrimaryImageId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize existing images if editing
  useEffect(() => {
    if (product && product.product_images) {
      // Sort images by display order
      const sortedImages = [...product.product_images].sort((a, b) => a.display_order - b.display_order)
      setExistingImages(sortedImages)

      // Set primary image
      const primaryImage = sortedImages.find((img) => img.is_primary)
      if (primaryImage) {
        setPrimaryImageId(primaryImage.id)
      }
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData((prev) => ({ ...prev, features: newFeatures }))
  }

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }))
  }

  const removeFeature = (index) => {
    const newFeatures = [...formData.features]
    newFeatures.splice(index, 1)
    setFormData((prev) => ({ ...prev, features: newFeatures }))
  }

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specifications]
    newSpecs[index] = { ...newSpecs[index], [field]: value }
    setFormData((prev) => ({ ...prev, specifications: newSpecs }))
  }

  const addSpec = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { name: "", value: "" }],
    }))
  }

  const removeSpec = (index) => {
    const newSpecs = [...formData.specifications]
    newSpecs.splice(index, 1)
    setFormData((prev) => ({ ...prev, specifications: newSpecs }))
  }

  // Handle image selection
  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      setNewImages((prev) => [...prev, ...selectedFiles])

      // Create preview URLs
      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file))
      setNewImagePreviews((prev) => [...prev, ...newPreviews])
    }
  }

  // Remove a new image
  const removeNewImage = (index) => {
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(newImagePreviews[index])

    const updatedImages = [...newImages]
    const updatedPreviews = [...newImagePreviews]

    updatedImages.splice(index, 1)
    updatedPreviews.splice(index, 1)

    setNewImages(updatedImages)
    setNewImagePreviews(updatedPreviews)
  }

  // Remove an existing image
  const removeExistingImage = (id) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id))
    setDeletedImageIds((prev) => [...prev, id])

    // If this was the primary image, reset primaryImageId
    if (id === primaryImageId) {
      const remainingImages = existingImages.filter((img) => img.id !== id)
      if (remainingImages.length > 0) {
        setPrimaryImageId(remainingImages[0].id)
      } else {
        setPrimaryImageId(null)
      }
    }
  }

  // Set an image as primary
  const setPrimaryImage = (id) => {
    setPrimaryImageId(id)
  }

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(existingImages)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setExistingImages(items)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData object
      const submitData = new FormData()

      // Add basic product data
      submitData.append("name", formData.name)
      submitData.append("code", formData.code)
      submitData.append("category", formData.category)
      submitData.append("description", formData.description)
      submitData.append("price", formData.price)
      submitData.append("isActive", formData.is_active.toString())

      // Add features
      const featuresText = formData.features.filter((f) => f.trim() !== "").join("\n")
      submitData.append("features", featuresText)

      // Add specifications
      const specsText = formData.specifications
        .filter((s) => s.name.trim() !== "" || s.value.trim() !== "")
        .map((s) => `${s.name}: ${s.value}`)
        .join("\n")
      submitData.append("specifications", specsText)

      // Add new images
      newImages.forEach((image) => {
        submitData.append("newImages", image)
      })

      // Add deleted image IDs
      if (deletedImageIds.length > 0) {
        submitData.append("deletedImageIds", deletedImageIds.join(","))
      }

      // Add primary image ID
      if (primaryImageId) {
        submitData.append("primaryImageId", primaryImageId)
      }

      // Add image order
      const orderMap = {}
      existingImages.forEach((img, index) => {
        orderMap[img.id] = index
      })
      submitData.append("imageOrder", JSON.stringify(orderMap))

      if (product) {
        // Update existing product
        await updateProduct(product.id, submitData)
        toast({
          title: "Product updated",
          description: "The product has been updated successfully.",
        })
      } else {
        // Create new product
        await createProduct(submitData)
        toast({
          title: "Product created",
          description: "The product has been created successfully.",
        })
      }

      router.push("/admin/products")
    } catch (error) {
      console.error("Error saving product:", error)
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      newImagePreviews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [newImagePreviews])

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{product ? "Edit Product" : "Add New Product"}</CardTitle>
          <CardDescription>
            {product ? "Update product information" : "Create a new product in the catalog"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Product Code</Label>
                <Input id="code" name="code" value={formData.code} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  type="text"
                  placeholder="Contact for pricing"
                />
                <p className="text-xs text-gray-500">Leave blank if price is variable or on request</p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Product Images</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                <Plus className="h-4 w-4 mr-2" /> Add Images
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Current Images</h4>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="existing-images" direction="horizontal">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-wrap gap-4">
                        {existingImages.map((image, index) => (
                          <Draggable key={image.id} draggableId={image.id} index={index}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} className="relative group">
                                <div className="border rounded-md overflow-hidden w-24 h-24">
                                  <div className="relative w-full h-full">
                                    <OptimizedImage
                                      src={image.image_url}
                                      alt={image.alt_text || formData.name}
                                      fill
                                      className="object-cover"
                                    />
                                    {image.id === primaryImageId && (
                                      <div className="absolute top-0 right-0 bg-yellow-400 text-xs px-1 rounded-bl">
                                        Primary
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="absolute top-0 right-0 flex opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="h-6 w-6 rounded-full"
                                    onClick={() => removeExistingImage(image.id)}
                                  >
                                    <Trash className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 flex justify-between bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-white hover:text-yellow-400"
                                    onClick={() => setPrimaryImage(image.id)}
                                    disabled={image.id === primaryImageId}
                                  >
                                    {image.id === primaryImageId ? (
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    ) : (
                                      <StarOff className="h-3 w-3" />
                                    )}
                                  </Button>
                                  <div {...provided.dragHandleProps} className="cursor-move p-1">
                                    <GripVertical className="h-3 w-3" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}

            {/* New Images */}
            {newImagePreviews.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">New Images</h4>
                <div className="flex flex-wrap gap-4">
                  {newImagePreviews.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="border rounded-md overflow-hidden w-24 h-24">
                        <div className="relative w-full h-full">
                          <OptimizedImage src={url} alt={`New image ${index + 1}`} fill className="object-cover" />
                          <div className="absolute top-0 right-0 bg-blue-400 text-xs px-1 rounded-bl">New</div>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 flex opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => removeNewImage(index)}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {existingImages.length === 0 && newImagePreviews.length === 0 && (
              <div className="border border-dashed rounded-md p-8 text-center">
                <div className="flex justify-center mb-2">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">
                  No images added yet. Click "Add Images" to upload product images.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label>Features</Label>
              <div className="space-y-2 mt-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="Product feature"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      disabled={formData.features.length <= 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addFeature} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" /> Add Feature
                </Button>
              </div>
            </div>

            <div>
              <Label>Specifications</Label>
              <div className="space-y-2 mt-2">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={spec.name}
                      onChange={(e) => handleSpecChange(index, "name", e.target.value)}
                      placeholder="Specification name"
                      className="flex-1"
                    />
                    <Input
                      value={spec.value}
                      onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                      placeholder="Value"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSpec(index)}
                      disabled={formData.specifications.length <= 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addSpec} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" /> Add Specification
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {product ? "Update Product" : "Create Product"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
