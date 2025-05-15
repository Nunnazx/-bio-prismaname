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
import { createBlogPost, updateBlogPost } from "@/app/actions/blog"

export function BlogPostForm({ post = null }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    id: post?.id || undefined, // Set to undefined instead of empty string
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    author_id: post?.author_id || null, // Set to null instead of empty string
    category: post?.category || "Industry Trends",
    tags: post?.tags || [],
    status: post?.status || "draft",
    publish_date: post?.publish_date ? new Date(post.publish_date) : null,
    featured_image: post?.featured_image || "",
    seo_title: post?.seo_title || "",
    seo_description: post?.seo_description || "",
    seo_keywords: post?.seo_keywords || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagsChange = (tags) => {
    setFormData((prev) => ({ ...prev, tags }))
  }

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, publish_date: date }))
  }

  const handleImageSelect = (url) => {
    setFormData((prev) => ({ ...prev, featured_image: url }))
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
      // Prepare the data for submission
      const postData = {
        ...formData,
        // Remove id if it's undefined (for new posts)
        id: formData.id === undefined ? undefined : formData.id,
        // Remove author_id if it's null or empty
        author_id: formData.author_id || undefined,
        // Ensure dates are properly formatted for the database
        publish_date: formData.publish_date ? formData.publish_date.toISOString() : null,
      }

      // Create or update the post
      if (post?.id) {
        await updateBlogPost(post.id, postData)
      } else {
        await createBlogPost(postData)
      }

      // Redirect to blog list
      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      console.error("Error saving blog post:", error)
      alert("Failed to save blog post. Please try again.")
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
                  <MediaSelector selectedImage={formData.featured_image} onSelect={handleImageSelect} />
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
                  <Label htmlFor="seo_title">SEO Title</Label>
                  <Input
                    id="seo_title"
                    name="seo_title"
                    value={formData.seo_title}
                    onChange={handleChange}
                    placeholder="SEO optimized title (optional)"
                  />
                  <p className="text-xs text-muted-foreground">Leave blank to use the post title</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo_description">Meta Description</Label>
                  <Textarea
                    id="seo_description"
                    name="seo_description"
                    value={formData.seo_description}
                    onChange={handleChange}
                    placeholder="Brief description for search engines"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">Recommended length: 150-160 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo_keywords">Meta Keywords</Label>
                  <Input
                    id="seo_keywords"
                    name="seo_keywords"
                    value={formData.seo_keywords}
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
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Enter category"
                  />
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
                    <Label htmlFor="publish_date">Publish Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.publish_date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.publish_date ? format(formData.publish_date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.publish_date}
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
