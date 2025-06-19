import Link from "next/link"
import { ArrowUpDown, ChevronDown, Download, Plus, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import { getProducts } from "@/app/actions/products"
import { ProductActionsCell } from "@/components/admin/product-actions-cell" // Import the new client component

// Category display names
const categoryNames = {
  granules: "Granules & Resins",
  bags: "Carry Bags",
  packaging: "Food Packaging",
  films: "Films & Wraps",
  custom: "Custom Solutions",
}

export default async function ProductsPage() {
  const { products, error } = await getProducts()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-24">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-bold">Error Loading Products</h2>
          <p className="text-red-500">{error}</p>
          <Link href="/admin/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tighter">Products</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your product catalog efficiently.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" disabled>
              {" "}
              {/* Disabled as functionality is not implemented */}
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/admin/products/import">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </Link>
            <Link href="/admin/products/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>View, manage, and organize all products in your catalog.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Input placeholder="Search products..." className="w-full sm:w-[300px]" disabled /> {/* Disabled */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" disabled>
                      {" "}
                      {/* Disabled */}
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All Categories</DropdownMenuItem>
                    {Object.entries(categoryNames).map(([key, name]) => (
                      <DropdownMenuItem key={key}>{name}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" disabled>
                      {" "}
                      {/* Disabled */}
                      Status
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All Statuses</DropdownMenuItem>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Draft</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox disabled /> {/* Disabled */}
                    </TableHead>
                    <TableHead className="min-w-[100px]">
                      <div
                        className="flex items-center gap-1 cursor-pointer hover:text-primary"
                        title="Sort by Product Code (Not implemented)"
                      >
                        Code
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[200px]">
                      <div
                        className="flex items-center gap-1 cursor-pointer hover:text-primary"
                        title="Sort by Name (Not implemented)"
                      >
                        Name
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[150px]">Category</TableHead>
                    <TableHead className="min-w-[100px]">Price</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="text-right min-w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(products || []).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No products found.
                        <Link href="/admin/products/new" className="ml-2 text-primary hover:underline">
                          Add your first product!
                        </Link>
                      </TableCell>
                    </TableRow>
                  ) : (
                    (products || []).map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Checkbox disabled /> {/* Disabled */}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{product.code}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{categoryNames[product.category] || product.category}</TableCell>
                        <TableCell>{product.price ? `₹${product.price}` : "Contact for pricing"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={product.is_active ? "default" : "secondary"}
                            className={
                              product.is_active
                                ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100"
                            }
                          >
                            {product.is_active ? "Active" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <ProductActionsCell productId={product.id} productName={product.name} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            {(products || []).length > 0 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
