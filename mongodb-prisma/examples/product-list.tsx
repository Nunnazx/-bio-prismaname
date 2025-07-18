"use client"

import { useState, useEffect } from "react"
import { getProducts } from "../actions/products"
import { ProductCategory, ProductStatus } from "@prisma/client"
import { ProductWithImages } from "../types"

export default function ProductList() {
  const [products, setProducts] = useState<ProductWithImages[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<ProductCategory | undefined>(undefined)
  const [status, setStatus] = useState<ProductStatus | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      try {
        const result = await getProducts({
          page,
          limit: 10,
          category,
          status,
        })
        
        setProducts(result.products)
        setTotalPages(result.pagination.totalPages)
        setError(null)
      } catch (err) {
        console.error("Error loading products:", err)
        setError("Failed to load products. Please try again.")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    
    loadProducts()
  }, [page, category, status])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCategory(value ? value as ProductCategory : undefined)
    setPage(1)
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setStatus(value ? value as ProductStatus : undefined)
    setPage(1)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select 
            className="border rounded p-2 w-full"
            value={category || ""}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="GRANULES">Granules</option>
            <option value="BAGS">Bags</option>
            <option value="PACKAGING">Packaging</option>
            <option value="FILMS">Films</option>
            <option value="CUSTOM">Custom</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select 
            className="border rounded p-2 w-full"
            value={status || ""}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 relative">
                  {product.images && product.images[0] ? (
                    <img 
                      src={product.images[0].url} 
                      alt={product.images[0].altText || product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      product.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 
                      product.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-1">{product.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">Code: {product.code}</p>
                  <p className="text-sm line-clamp-2 mb-3">{product.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-600">
                      {product.price ? `₹${product.price}` : "Contact for pricing"}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <button 
              className="px-4 py-2 border rounded disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Previous
            </button>
            
            <span>
              Page {page} of {totalPages}
            </span>
            
            <button 
              className="px-4 py-2 border rounded disabled:opacity-50"
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}