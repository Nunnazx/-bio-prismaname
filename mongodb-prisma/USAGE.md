# 📚 MongoDB + Prisma Usage Guide

This guide provides examples of how to use the MongoDB + Prisma integration in your AICMT International project.

## 🏗️ Basic CRUD Operations

### 📋 Products

#### Fetching Products

```typescript
import { prisma } from "@/mongodb-prisma/lib/prisma"

// Get all products
const allProducts = await prisma.product.findMany()

// Get a single product by ID
const product = await prisma.product.findUnique({
  where: { id: "product-id" }
})

// Get a product by slug with images
const productWithImages = await prisma.product.findUnique({
  where: { slug: "product-slug" },
  include: { images: true }
})

// Get products with filtering and pagination
const filteredProducts = await prisma.product.findMany({
  where: {
    category: "BAGS",
    isActive: true
  },
  skip: 0,
  take: 10,
  orderBy: { createdAt: "desc" }
})
```

#### Creating Products

```typescript
// Create a new product
const newProduct = await prisma.product.create({
  data: {
    name: "Biodegradable Shopping Bags",
    slug: "biodegradable-shopping-bags",
    code: "BSB-001",
    description: "Eco-friendly shopping bags",
    category: "BAGS",
    features: ["Biodegradable", "Strong", "Reusable"],
    specifications: {
      material: "Compostable polymer",
      thickness: "25 microns",
      dimensions: "12x16 inches"
    },
    price: 120.00,
    status: "PUBLISHED",
    isActive: true
  }
})

// Create a product with images
const productWithImages = await prisma.product.create({
  data: {
    name: "Compostable Food Containers",
    slug: "compostable-food-containers",
    code: "CFC-001",
    description: "Food-grade compostable containers",
    category: "PACKAGING",
    price: 150.00,
    status: "PUBLISHED",
    isActive: true,
    images: {
      create: [
        {
          url: "https://example.com/image1.jpg",
          altText: "Food Container Front",
          isPrimary: true,
          displayOrder: 0
        },
        {
          url: "https://example.com/image2.jpg",
          altText: "Food Container Side",
          isPrimary: false,
          displayOrder: 1
        }
      ]
    }
  }
})
```

#### Updating Products

```typescript
// Update a product
const updatedProduct = await prisma.product.update({
  where: { id: "product-id" },
  data: {
    price: 130.00,
    isActive: true
  }
})

// Update a product and its images
const updatedProductWithImages = await prisma.product.update({
  where: { id: "product-id" },
  data: {
    price: 140.00,
    images: {
      updateMany: {
        where: { isPrimary: true },
        data: { altText: "Updated Alt Text" }
      }
    }
  }
})
```

#### Deleting Products

```typescript
// Delete a product (will cascade delete related images)
await prisma.product.delete({
  where: { id: "product-id" }
})

// Delete multiple products
await prisma.product.deleteMany({
  where: {
    isActive: false
  }
})
```

### 📝 Blog Posts

#### Fetching Blog Posts

```typescript
// Get all blog posts
const allPosts = await prisma.blogPost.findMany()

// Get published blog posts with author
const publishedPosts = await prisma.blogPost.findMany({
  where: { status: "PUBLISHED" },
  include: {
    author: {
      select: {
        firstName: true,
        lastName: true,
        avatarUrl: true
      }
    }
  },
  orderBy: { publishedAt: "desc" }
})

// Get blog posts by category
const categoryPosts = await prisma.blogPost.findMany({
  where: { category: "Sustainability" }
})

// Get blog posts by tag
const taggedPosts = await prisma.blogPost.findMany({
  where: {
    tags: {
      has: "biodegradable"
    }
  }
})
```

#### Creating Blog Posts

```typescript
// Create a new blog post
const newPost = await prisma.blogPost.create({
  data: {
    title: "The Benefits of Biodegradable Plastics",
    slug: "benefits-biodegradable-plastics",
    content: "Content goes here...",
    excerpt: "A short excerpt about biodegradable plastics",
    authorId: "author-id",
    category: "Education",
    tags: ["biodegradable", "sustainability", "education"],
    status: "DRAFT"
  }
})
```

### 📊 Inquiries

```typescript
// Get all inquiries
const inquiries = await prisma.inquiry.findMany()

// Get new inquiries
const newInquiries = await prisma.inquiry.findMany({
  where: { status: "NEW" }
})

// Create a new inquiry
const newInquiry = await prisma.inquiry.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+919876543210",
    company: "Eco Solutions",
    message: "I'm interested in your products",
    inquiryType: "PRODUCT_INFO",
    status: "NEW",
    priority: "MEDIUM"
  }
})

// Update inquiry status
const updatedInquiry = await prisma.inquiry.update({
  where: { id: "inquiry-id" },
  data: {
    status: "IN_PROGRESS",
    assignedToId: "user-id"
  }
})
```

## 🔍 Advanced Queries

### 🔎 Full-Text Search

```typescript
// Search products
const searchResults = await prisma.product.findMany({
  where: {
    OR: [
      { name: { contains: "biodegradable", mode: "insensitive" } },
      { description: { contains: "biodegradable", mode: "insensitive" } }
    ]
  }
})
```

### 📊 Aggregations

```typescript
// Count products by category
const productsByCategory = await prisma.product.groupBy({
  by: ["category"],
  _count: {
    id: true
  }
})

// Get average product price
const averagePrice = await prisma.product.aggregate({
  _avg: {
    price: true
  }
})
```

### 🔄 Transactions

```typescript
// Use transactions for multiple operations
const result = await prisma.$transaction(async (tx) => {
  // Create a product
  const product = await tx.product.create({
    data: {
      name: "New Product",
      slug: "new-product",
      code: "NP-001",
      category: "BAGS",
      status: "DRAFT"
    }
  })
  
  // Create product images
  const image = await tx.productImage.create({
    data: {
      productId: product.id,
      url: "https://example.com/image.jpg",
      isPrimary: true
    }
  })
  
  return { product, image }
})
```

## 📱 Using in Components

### 🔄 Server Components

```tsx
// app/products/page.tsx
import { prisma } from "@/mongodb-prisma/lib/prisma"
import { ProductCard } from "@/components/product-card"

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { 
      images: {
        where: { isPrimary: true },
        take: 1
      }
    }
  })
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### 🔄 Server Actions

```tsx
// app/actions/create-inquiry.ts
"use server"

import { prisma } from "@/mongodb-prisma/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createInquiry(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string
  
  if (!name || !email || !message) {
    return { error: "Missing required fields" }
  }
  
  try {
    await prisma.inquiry.create({
      data: {
        name,
        email,
        message,
        inquiryType: "PRODUCT_INFO",
        status: "NEW",
        priority: "MEDIUM"
      }
    })
    
    revalidatePath("/contact")
    return { success: true }
  } catch (error) {
    return { error: "Failed to submit inquiry" }
  }
}
```

### 🔄 Client Components

```tsx
// components/contact-form.tsx
"use client"

import { useState } from "react"
import { createInquiry } from "@/app/actions/create-inquiry"

export function ContactForm() {
  const [pending, setPending] = useState(false)
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    
    const formData = new FormData(event.currentTarget)
    const result = await createInquiry(formData)
    
    setPending(false)
    
    if (result.error) {
      alert(result.error)
    } else {
      alert("Inquiry submitted successfully!")
      event.currentTarget.reset()
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}
```

## 🔧 Utilities

### 🔍 Database Health Check

```typescript
import { checkDatabaseHealth } from "@/mongodb-prisma/lib/prisma"

// API route for health check
export async function GET() {
  const health = await checkDatabaseHealth()
  
  if (health.status === "healthy") {
    return Response.json(health, { status: 200 })
  } else {
    return Response.json(health, { status: 500 })
  }
}
```

### 📊 Database Stats

```typescript
import { getDatabaseStats } from "@/mongodb-prisma/lib/mongodb"

// Get database statistics
const stats = await getDatabaseStats()
console.log(`Database size: ${stats.dataSize} bytes`)
console.log(`Number of collections: ${stats.collections}`)
```

## 🔐 Best Practices

1. **Use Transactions** for operations that modify multiple records
2. **Include Only Necessary Fields** to optimize query performance
3. **Use Pagination** for large result sets
4. **Handle Errors** properly in all database operations
5. **Validate Input** before sending to the database
6. **Use Indexes** for frequently queried fields
7. **Close Connections** when done (handled automatically by Prisma)
8. **Use Environment Variables** for connection strings
9. **Implement Caching** for frequently accessed data
10. **Monitor Performance** using Prisma's logging capabilities

## 🛠️ Debugging

Enable detailed logging in Prisma:

```typescript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})
```

This will log all queries, making it easier to debug issues.

---

For more information, refer to the [Prisma documentation](https://www.prisma.io/docs) or the [MongoDB documentation](https://docs.mongodb.com/).