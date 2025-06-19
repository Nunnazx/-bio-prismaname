"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Trash, Star, StarOff, GripVertical, LinkIcon } from "lucide-react" // Added LinkIcon
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
  const [directImageUrls, setDirectImageUrls] = useState("") // State for direct image URLs input

  // Initialize existing images if editing
  useEffect(() => {
    if (product && product.product_images) {
      const sortedImages = [...product.product_images].sort((a, b) => a.display_order - b.display_order)
      setExistingImages(sortedImages)
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

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      setNewImages((prev) => [...prev, ...selectedFiles])
      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file))
      setNewImagePreviews((prev) => [...prev, ...newPreviews])
    }
  }

  const removeNewImage = (index) => {
    URL.revokeObjectURL(newImagePreviews[index])
    const updatedImages = [...newImages]
    const updatedPreviews = [...newImagePreviews]
    updatedImages.splice(index, 1)
    updatedPreviews.splice(index, 1)
    setNewImages(updatedImages)
    setNewImagePreviews(updatedPreviews)
  }

  const removeExistingImage = (id) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id))
    setDeletedImageIds((prev) => [...prev, id])
    if (id === primaryImageId) {
      const remainingImages = existingImages.filter((img) => img.id !== id)
      setPrimaryImageId(remainingImages.length > 0 ? remainingImages[0].id : null)
    }
  }

  const setPrimaryImage = (id) => {
    setPrimaryImageId(id)
  }

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
      const submitData = new FormData()
      submitData.append("name", formData.name)
      submitData.append("code", formData.code)
      submitData.append("category", formData.category)
      submitData.append("description", formData.description)
      submitData.append("price", formData.price)
      submitData.append("isActive", formData.is_active.toString())

      const featuresText = formData.features.filter((f) => f.trim() !== "").join("\n")
      submitData.append("features", featuresText)

      const specsText = formData.specifications
        .filter((s) => s.name.trim() !== "" || s.value.trim() !== "")
        .map((s) => `${s.name}: ${s.value}`)
        .join("\n")
      submitData.append("specifications", specsText)

      // Add new image files
      newImages.forEach((image) => {
        // Use "newImages" to match the server action when editing
        // Use "images" when creating a new product (if your createProduct action expects "images")
        submitData.append(product ? "newImages" : "images", image)
      })

      // Add direct image URLs
      if (directImageUrls.trim() !== "") {
        submitData.append("imageUrls", directImageUrls) // Send comma-separated URLs
      }

      if (product) {
        // When updating
        if (deletedImageIds.length > 0) {
          submitData.append("deletedImageIds", deletedImageIds.join(","))
        }
        if (primaryImageId) {
          submitData.append("primaryImageId", primaryImageId)
        }
        const orderMap = {}
        existingImages.forEach((img, index) => {
          orderMap[img.id] = index
        })
        submitData.append("imageOrder", JSON.stringify(orderMap))
        await updateProduct(product.id, submitData)
        toast({ title: "Product updated", description: "Product updated successfully." })
      } else {
        // When creating
        await createProduct(submitData)
        toast({ title: "Product created", description: "Product created successfully." })
      }

      router.push("/admin/products")
    } catch (error) {
      console.error("Error saving product:", error)
      toast({ title: "Error", description: "Failed to save product.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

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
          {/* ... other form fields remain the same ... */}
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

          {/* Product Images Section */}
          <div className="space-y-4">
            <Label>Product Images</Label>
            {/* File Upload Input */}
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                <Plus className="h-4 w-4 mr-2" /> Add Image Files
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

            {/* Direct Image URLs Input */}
            <div className="space-y-2">
              <Label htmlFor="directImageUrls">Or Add Image URLs (comma-separated)</Label>
              <div className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-gray-500" />
                <Input
                  id="directImageUrls"
                  name="directImageUrls"
                  value={directImageUrls}
                  onChange={(e) => setDirectImageUrls(e.target.value)}
                  placeholder="e.g., https://example.com/image1.jpg, https://example.com/image2.png"
                />
              </div>
              <p className="text-xs text-gray-500">
                Pasted URLs will be added to the product. They won&apos;t be re-hosted on your storage.
              </p>
            </div>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Current Images (Drag to reorder)</h4>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="existing-images" direction="horizontal">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-wrap gap-4 p-2 border rounded-md bg-muted/30"
                      >
                        {existingImages.map((image, index) => (
                          <Draggable key={image.id} draggableId={image.id} index={index}>
                            {(
                              providedDrag, // Renamed to avoid conflict
                            ) => (
                              <div
                                ref={providedDrag.innerRef}
                                {...providedDrag.draggableProps}
                                className="relative group w-28 h-28"
                              >
                                <div className="border rounded-md overflow-hidden w-full h-full">
                                  <div className="relative w-full h-full">
                                    <OptimizedImage
                                      src={image.image_url}
                                      alt={image.alt_text || formData.name}
                                      fill
                                      className="object-cover"
                                    />
                                    {image.id === primaryImageId && (
                                      <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs px-1 py-0.5 rounded-bl-md font-semibold">
                                        Primary
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="absolute top-1 right-1 flex opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="h-6 w-6 rounded-full shadow-md"
                                    onClick={() => removeExistingImage(image.id)}
                                  >
                                    <Trash className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-1 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-b-md">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-white hover:text-yellow-400"
                                    onClick={() => setPrimaryImage(image.id)}
                                    disabled={image.id === primaryImageId}
                                    title={image.id === primaryImageId ? "Primary Image" : "Set as primary"}
                                  >
                                    {image.id === primaryImageId ? (
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ) : (
                                      <StarOff className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <div
                                    {...providedDrag.dragHandleProps}
                                    className="cursor-move p-1"
                                    title="Drag to reorder"
                                  >
                                    <GripVertical className="h-4 w-4" />
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

            {/* New Images Previews */}
            {newImagePreviews.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">New Images to Upload</h4>
                <div className="flex flex-wrap gap-4 p-2 border rounded-md">
                  {newImagePreviews.map((url, index) => (
                    <div key={index} className="relative group w-28 h-28">
                      <div className="border rounded-md overflow-hidden w-full h-full">
                        <div className="relative w-full h-full">
                          <OptimizedImage src={url} alt={`New image ${index + 1}`} fill className="object-cover" />
                          <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-1 py-0.5 rounded-bl-md font-semibold">
                            New
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-1 right-1 flex opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 rounded-full shadow-md"
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

            {existingImages.length === 0 && newImagePreviews.length === 0 && directImageUrls.trim() === "" && (
              <div className="border border-dashed rounded-md p-8 text-center">
                <div className="flex justify-center mb-2">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">
                  No images added yet. Click "Add Image Files" or paste URLs above.
                </p>
              </div>
            )}
          </div>

          {/* Features and Specifications */}
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
                      disabled={formData.features.length <= 1 && feature.trim() === ""}
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
                      placeholder="Specification name (e.g., Material)"
                      className="flex-1"
                    />
                    <Input
                      value={spec.value}
                      onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                      placeholder="Value (e.g., Corn Starch PLA)"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSpec(index)}
                      disabled={
                        formData.specifications.length <= 1 && spec.name.trim() === "" && spec.value.trim() === ""
                      }
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
