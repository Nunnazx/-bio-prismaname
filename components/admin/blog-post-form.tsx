"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { TagInput } from "@/components/admin/tag-input"
import { MediaSelector } from "@/components/admin/media-selector"

// Sample categories and authors - in a real app, these would come from your API
const categories = [
  { id: "industry-trends", name: "Industry Trends" },
  { id: "education", name: "Education" },
  { id: "environment", name: "Environment" },
  { id: "certification", name: "Certification" },
  { id: "innovation", name: "Innovation" },
  { id: "sustainability", name: "Sustainability" },
  { id: "business", name: "Business" },
]

const authors = [
  { id: "author-1", name: "Priya Sharma", avatar: "/confident-leader.png" },
  { id: "author-2", name: "Rajesh Kumar", avatar: "/confident-indian-professional.png" },
  { id: "author-3", name: "Amit Patel", avatar: "" },
]

export function BlogPostForm({ post = null }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    author: post?.author?.id || "author-1",
    category: post?.category?.toLowerCase().replace(/\s+/g, "-") || "industry-trends",
    tags: post?.tags || [],
    status: post?.status || "draft",
    publishDate: post?.publishDate ? new Date(post.publishDate) : null,
    featuredImage: post?.featuredImage || "",
    seo: {
      title: post?.seo?.title || "",
      description: post?.seo?.description || "",
      keywords: post?.seo?.keywords || "",
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleTagsChange = (tags) => {
    setFormData((prev) => ({ ...prev, tags }))
  }

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, publishDate: date }))
  }

  const handleImageSelect = (url) => {
    setFormData((prev) => ({ ...prev, featuredImage: url }))
  }

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }))
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    setFormData((prev) => ({ ...prev, slug }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // This would be replaced with your actual API call
      // const response = await fetch('/api/blog', {
      //   method: post ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to blog list
      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      console.error("Error saving blog post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter post title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slug">Slug</Label>
                    <Button type="button" variant="ghost" size="sm" onClick={generateSlug} className="h-8 text-xs">
                      Generate from title
                    </Button>
                  </div>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="enter-post-slug"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <RichTextEditor initialValue={formData.content} onChange={handleContentChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Brief summary of the post"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <MediaSelector selectedImage={formData.featuredImage} onSelect={handleImageSelect} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seo.title">SEO Title</Label>
                  <Input
                    id="seo.title"
                    name="seo.title"
                    value={formData.seo.title}
                    onChange={handleChange}
                    placeholder="SEO optimized title (optional)"
                  />
                  <p className="text-xs text-muted-foreground">Leave blank to use the post title</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo.description">Meta Description</Label>
                  <Textarea
                    id="seo.description"
                    name="seo.description"
                    value={formData.seo.description}
                    onChange={handleChange}
                    placeholder="Brief description for search engines"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">Recommended length: 150-160 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo.keywords">Meta Keywords</Label>
                  <Input
                    id="seo.keywords"
                    name="seo.keywords"
                    value={formData.seo.keywords}
                    onChange={handleChange}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Select
                    value={formData.author}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, author: value }))}
                  >
                    <SelectTrigger id="author">
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <TagInput tags={formData.tags} onChange={handleTagsChange} placeholder="Add tags..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(formData.status === "published" || formData.status === "scheduled") && (
                  <div className="space-y-2">
                    <Label htmlFor="publishDate">Publish Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.publishDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.publishDate ? format(formData.publishDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.publishDate}
                          onSelect={handleDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  )
}
