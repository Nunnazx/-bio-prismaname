"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createBlogPost, updateBlogPost } from "@/app/actions/blog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Save, CalendarDays } from "lucide-react"
import { RichTextEditor } from "@/components/admin/rich-text-editor" // Assuming you have this
import { TagInput } from "@/components/admin/tag-input" // Assuming you have this
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Define Zod schema based on your app/actions/blog.ts BlogPostSchema
// but make fields optional for the form and handle defaults/transformations
const FormSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  slug: z
    .string()
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, alphanumeric, with hyphens")
    .optional()
    .or(z.literal("")), // Allow empty string, will auto-generate if empty
  content: z.string().optional(),
  author_id: z.string().uuid("Invalid author ID").optional().nullable(), // Assuming you'll have a way to select authors
  category: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  featured_image: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  seo_title: z.string().max(70).optional().nullable(),
  seo_description: z.string().max(160).optional().nullable(),
  seo_keywords: z.string().optional().nullable(), // Will be split into array later
  publish_date: z.date().optional().nullable(),
})

type BlogPostFormValues = z.infer<typeof FormSchema>

interface BlogPostFormProps {
  post?: BlogPostFormValues & { id?: string; created_at?: string; updated_at?: string } // Allow existing post data
  authors?: { id: string; name: string }[] // Example author structure
  categories?: string[] // Example categories
}

export function BlogPostForm({ post, authors = [], categories = [] }: BlogPostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues = useMemo(
    () => ({
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      author_id: post?.author_id || null,
      category: post?.category || null,
      tags: post?.tags || [],
      status: post?.status || "draft",
      featured_image: post?.featured_image || "",
      seo_title: post?.seo_title || "",
      seo_description: post?.seo_description || "",
      seo_keywords: Array.isArray(post?.seo_keywords) ? post?.seo_keywords.join(", ") : post?.seo_keywords || "",
      publish_date: post?.publish_date ? new Date(post.publish_date) : null,
    }),
    [post],
  )

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [post, defaultValues, form])

  const onSubmit = async (data: BlogPostFormValues) => {
    setIsSubmitting(true)
    try {
      const formDataToSubmit = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === "tags" && Array.isArray(value)) {
            // Server action might expect tags as a comma-separated string or handle array directly
            // For FormData, it's easier to send multiple entries or a string
            value.forEach((tag) => formDataToSubmit.append("tags", tag))
          } else if (key === "publish_date" && value instanceof Date) {
            formDataToSubmit.append(key, value.toISOString())
          } else if (key === "seo_keywords" && typeof value === "string") {
            // Split keywords string into array for server if needed, or send as string
            formDataToSubmit.append(key, value)
          } else {
            formDataToSubmit.append(key, String(value))
          }
        }
      })

      let result
      if (post?.id) {
        result = await updateBlogPost(post.id, formDataToSubmit)
        toast({ title: "Blog Post Updated", description: "Your blog post has been successfully updated." })
      } else {
        result = await createBlogPost(formDataToSubmit)
        toast({ title: "Blog Post Created", description: "Your blog post has been successfully created." })
      }
      router.push("/admin/blog") // Redirect to blog list
      router.refresh() // Refresh server components
    } catch (error: any) {
      console.error("Failed to save blog post:", error)
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateSlug = () => {
    const title = form.getValues("title")
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove non-word characters except hyphens and spaces
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/--+/g, "-") // Replace multiple hyphens with single
        .slice(0, 200) // Max length
      form.setValue("slug", slug, { shouldValidate: true })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{post ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
          <CardDescription>
            {post ? "Update the details of this blog post." : "Fill in the details to create a new blog post."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content Column */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...form.register("title")} />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <div className="flex items-center gap-2">
                  <Input id="slug" {...form.register("slug")} placeholder="auto-generated-if-empty" />
                  <Button type="button" variant="outline" size="sm" onClick={generateSlug}>
                    Generate
                  </Button>
                </div>
                {form.formState.errors.slug && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.slug.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field }) => <RichTextEditor value={field.value || ""} onChange={field.onChange} />}
                />
                {form.formState.errors.content && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.content.message}</p>
                )}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-4 md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Publish Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Controller
                      name="status"
                      control={form.control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="publish_date">Publish Date (Optional)</Label>
                    <Controller
                      name="publish_date"
                      control={form.control}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Controller
                      name="category"
                      control={form.control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {/* Populate with actual categories later */}
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="sustainability">Sustainability</SelectItem>
                            <SelectItem value="industry-news">Industry News</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Controller
                      name="tags"
                      control={form.control}
                      render={({ field }) => (
                        <TagInput
                          tags={field.value || []}
                          onTagsChange={(newTags) => field.onChange(newTags)}
                          placeholder="Add tags..."
                        />
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    id="featured_image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    {...form.register("featured_image")}
                  />
                  {form.watch("featured_image") && (
                    <div className="mt-2 aspect-video w-full overflow-hidden rounded border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.watch("featured_image")! || "/placeholder.svg"}
                        alt="Featured image preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  {form.formState.errors.featured_image && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.featured_image.message}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* SEO Section */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize for search engines.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input id="seo_title" {...form.register("seo_title")} />
                <p className="text-xs text-muted-foreground mt-1">
                  {form.watch("seo_title")?.length || 0}/70 characters
                </p>
              </div>
              <div>
                <Label htmlFor="seo_description">SEO Description</Label>
                <Textarea id="seo_description" {...form.register("seo_description")} rows={3} />
                <p className="text-xs text-muted-foreground mt-1">
                  {form.watch("seo_description")?.length || 0}/160 characters
                </p>
              </div>
              <div>
                <Label htmlFor="seo_keywords">SEO Keywords (comma-separated)</Label>
                <Input id="seo_keywords" {...form.register("seo_keywords")} />
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            {post ? "Update Post" : "Create Post"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
