"use client"

import { useState, useEffect } from "react"
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
import { useRouter } from "next/navigation"
import { deleteBlogPost } from "@/app/actions/blog"

export function BlogPostsTable({ initialPosts = [] }) {
  const router = useRouter()
  const [posts, setPosts] = useState(initialPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPosts, setSelectedPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setPosts(initialPosts)
  }, [initialPosts])

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author_id?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const togglePostSelection = (postId) => {
    setSelectedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const toggleAllPosts = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(filteredPosts.map((post) => post.id))
    }
  }

  const handleDeletePost = async (postId) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setIsLoading(true)
      try {
        await deleteBlogPost(postId)
        setPosts((prev) => prev.filter((post) => post.id !== postId))
        setSelectedPosts((prev) => prev.filter((id) => id !== postId))
        router.refresh()
      } catch (error) {
        console.error("Error deleting post:", error)
        alert("Failed to delete post")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const bulkDeletePosts = async () => {
    if (confirm(`Are you sure you want to delete ${selectedPosts.length} posts?`)) {
      setIsLoading(true)
      try {
        for (const postId of selectedPosts) {
          await deleteBlogPost(postId)
        }
        setPosts((prev) => prev.filter((post) => !selectedPosts.includes(post.id)))
        setSelectedPosts([])
        router.refresh()
      } catch (error) {
        console.error("Error deleting posts:", error)
        alert("Failed to delete some posts")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const changePostStatus = async (postId, newStatus) => {
    // This would be implemented with a server action
    // For now, just update the UI
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
            <Button variant="destructive" size="sm" onClick={bulkDeletePosts} disabled={isLoading}>
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
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
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
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status || "draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{formatDate(post.publish_date || post.created_at)}</TableCell>
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
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeletePost(post.id)}
                          disabled={isLoading}
                        >
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
