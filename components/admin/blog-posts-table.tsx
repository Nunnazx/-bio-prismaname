"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, MoreHorizontal, Search, Trash } from "lucide-react"

// Mock data - this would come from Supabase in the real implementation
const initialPosts = [
  {
    id: "1",
    title: "How Biodegradable Plastics Are Changing the Industry",
    slug: "biodegradable-plastics-industry",
    status: "published",
    category: "Industry Insights",
    author: "Rahul Sharma",
    date: "2023-06-15T10:30:00Z",
    views: 987,
  },
  {
    id: "2",
    title: "5 Ways to Reduce Plastic Waste in Your Business",
    slug: "reduce-plastic-waste-business",
    status: "published",
    category: "Sustainability",
    author: "Priya Patel",
    date: "2023-06-10T14:45:00Z",
    views: 754,
  },
  {
    id: "3",
    title: "The Future of Biodegradable Packaging in India",
    slug: "future-biodegradable-packaging-india",
    status: "published",
    category: "Market Trends",
    author: "Amit Kumar",
    date: "2023-06-05T09:15:00Z",
    views: 632,
  },
  {
    id: "4",
    title: "Comparing Traditional vs. Biodegradable Plastics",
    slug: "traditional-vs-biodegradable-plastics",
    status: "published",
    category: "Product Insights",
    author: "Sneha Reddy",
    date: "2023-05-28T16:20:00Z",
    views: 521,
  },
  {
    id: "5",
    title: "New Regulations for Single-Use Plastics in 2023",
    slug: "regulations-single-use-plastics-2023",
    status: "draft",
    category: "Regulations",
    author: "Rahul Sharma",
    date: "2023-05-20T11:10:00Z",
    views: 0,
  },
  {
    id: "6",
    title: "Biodegradable Solutions for E-commerce Packaging",
    slug: "biodegradable-ecommerce-packaging",
    status: "draft",
    category: "E-commerce",
    author: "Priya Patel",
    date: "2023-05-15T13:25:00Z",
    views: 0,
  },
]

export function BlogPostsTable() {
  const [posts, setPosts] = useState(initialPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const togglePostSelection = (postId: string) => {
    setSelectedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const toggleAllPosts = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(filteredPosts.map((post) => post.id))
    }
  }

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId))
    setSelectedPosts((prev) => prev.filter((id) => id !== postId))
  }

  const bulkDeletePosts = () => {
    setPosts((prev) => prev.filter((post) => !selectedPosts.includes(post.id)))
    setSelectedPosts([])
  }

  const changePostStatus = (postId: string, newStatus: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, status: newStatus } : post)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-8 w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {selectedPosts.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{selectedPosts.length} selected</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newStatus = "published"
                selectedPosts.forEach((postId) => {
                  changePostStatus(postId, newStatus)
                })
                setSelectedPosts([])
              }}
            >
              Publish
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newStatus = "draft"
                selectedPosts.forEach((postId) => {
                  changePostStatus(postId, newStatus)
                })
                setSelectedPosts([])
              }}
            >
              Unpublish
            </Button>
            <Button variant="destructive" size="sm" onClick={bulkDeletePosts}>
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={filteredPosts.length > 0 && selectedPosts.length === filteredPosts.length}
                  onCheckedChange={toggleAllPosts}
                  aria-label="Select all posts"
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No posts found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPosts.includes(post.id)}
                      onCheckedChange={() => togglePostSelection(post.id)}
                      aria-label={`Select ${post.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{formatDate(post.date)}</TableCell>
                  <TableCell>{post.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/blog/edit/${post.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {post.status === "published" ? (
                          <DropdownMenuItem onClick={() => changePostStatus(post.id, "draft")}>
                            Unpublish
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => changePostStatus(post.id, "published")}>
                            Publish
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => deletePost(post.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
