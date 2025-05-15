"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Copy, Download, FileText, Filter, ImagePlus, MoreHorizontal, Search, Trash, Upload } from "lucide-react"

// Mock data - this would come from Supabase in the real implementation
const initialMediaFiles = [
  {
    id: "1",
    name: "biodegradable-plastic-granules.png",
    type: "image",
    size: "1.2 MB",
    dimensions: "1200 x 800",
    url: "/biodegradable-plastic-granules.png",
    uploadedAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    name: "clear-biodegradable-pellets.png",
    type: "image",
    size: "0.9 MB",
    dimensions: "1200 x 800",
    url: "/clear-biodegradable-pellets.png",
    uploadedAt: "2023-06-14T14:45:00Z",
  },
  {
    id: "3",
    name: "sustainable-factory-exterior.png",
    type: "image",
    size: "1.5 MB",
    dimensions: "1600 x 900",
    url: "/sustainable-factory-exterior.png",
    uploadedAt: "2023-06-13T09:15:00Z",
  },
  {
    id: "4",
    name: "eco-friendly-packaging.png",
    type: "image",
    size: "1.1 MB",
    dimensions: "1200 x 800",
    url: "/eco-friendly-packaging.png",
    uploadedAt: "2023-06-12T16:20:00Z",
  },
  {
    id: "5",
    name: "microbial-decomposition.png",
    type: "image",
    size: "1.3 MB",
    dimensions: "1400 x 900",
    url: "/microbial-decomposition.png",
    uploadedAt: "2023-06-11T11:10:00Z",
  },
  {
    id: "6",
    name: "product-specifications.pdf",
    type: "document",
    size: "2.4 MB",
    dimensions: "",
    url: "/documents/product-specifications.pdf",
    uploadedAt: "2023-06-10T13:25:00Z",
  },
  {
    id: "7",
    name: "certification-documents.pdf",
    type: "document",
    size: "3.1 MB",
    dimensions: "",
    url: "/documents/certification-documents.pdf",
    uploadedAt: "2023-06-09T15:40:00Z",
  },
  {
    id: "8",
    name: "earth-friendly-shopping.png",
    type: "image",
    size: "1.0 MB",
    dimensions: "1200 x 800",
    url: "/earth-friendly-shopping.png",
    uploadedAt: "2023-06-08T09:55:00Z",
  },
]

export function MediaLibrary() {
  const [mediaFiles, setMediaFiles] = useState(initialMediaFiles)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedFile, setSelectedFile] = useState<(typeof initialMediaFiles)[0] | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || file.type === activeTab
    return matchesSearch && matchesTab
  })

  const confirmDeleteFile = (fileId: string) => {
    setFileToDelete(fileId)
    setDeleteConfirmOpen(true)
  }

  const deleteFile = () => {
    if (fileToDelete) {
      setMediaFiles((prev) => prev.filter((file) => file.id !== fileToDelete))
      setFileToDelete(null)
      setDeleteConfirmOpen(false)
      if (selectedFile && selectedFile.id === fileToDelete) {
        setSelectedFile(null)
      }
    }
  }

  const handleUpload = () => {
    // In a real implementation, this would handle file uploads to Supabase Storage
    setUploadDialogOpen(false)
  }

  const copyFileUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    // In a real implementation, we would show a toast notification
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab("all")}>All Files</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("image")}>Images</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("document")}>Documents</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("video")}>Videos</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button onClick={() => setUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredFiles.length === 0 ? (
          <div className="col-span-full h-40 flex items-center justify-center text-muted-foreground">
            No files found.
          </div>
        ) : (
          filteredFiles.map((file) => (
            <div
              key={file.id}
              className={`group relative rounded-lg border overflow-hidden ${
                selectedFile?.id === file.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedFile(file)}
            >
              {file.type === "image" ? (
                <div className="relative aspect-square">
                  <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex items-center justify-center aspect-square bg-muted">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => copyFileUrl(file.url)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href={file.url} download target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => confirmDeleteFile(file.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="p-2 text-xs truncate">{file.name}</div>
            </div>
          ))
        )}
      </div>

      {selectedFile && (
        <div className="mt-6 border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-medium">{selectedFile.name}</h3>
            <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
              <span className="sr-only">Close</span>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {selectedFile.type === "image" ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src={selectedFile.url || "/placeholder.svg"}
                    alt={selectedFile.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center aspect-video bg-muted rounded-lg">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">File Details</h4>
                <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Type</dt>
                    <dd className="capitalize">{selectedFile.type}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Size</dt>
                    <dd>{selectedFile.size}</dd>
                  </div>
                  {selectedFile.dimensions && (
                    <div>
                      <dt className="text-muted-foreground">Dimensions</dt>
                      <dd>{selectedFile.dimensions}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-muted-foreground">Uploaded</dt>
                    <dd>{formatDate(selectedFile.uploadedAt)}</dd>
                  </div>
                </dl>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">File URL</h4>
                <div className="flex items-center gap-2">
                  <Input value={selectedFile.url} readOnly className="text-xs" />
                  <Button variant="outline" size="icon" onClick={() => copyFileUrl(selectedFile.url)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={selectedFile.url} download target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => confirmDeleteFile(selectedFile.id)}
                  className="w-full"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this file? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteFile}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>Upload new files to your media library</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <div className="flex flex-col items-center gap-2">
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
                <Input type="file" className="hidden" id="file-upload" multiple />
                <Button asChild variant="secondary" size="sm">
                  <label htmlFor="file-upload">Browse Files</label>
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
