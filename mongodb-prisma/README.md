# 🍃 MongoDB + Prisma Integration for AICMT International

This folder contains the MongoDB integration with Prisma ORM for the AICMT International biodegradable plastics website. This integration provides a modern, type-safe database layer that replaces the existing Supabase PostgreSQL implementation.

## 📋 Table of Contents

- [Overview](#-overview)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [Documentation](#-documentation)
- [Examples](#-examples)
- [Migration Strategy](#-migration-strategy)
- [Troubleshooting](#-troubleshooting)

## 🌟 Overview

This integration provides a complete MongoDB database layer using Prisma ORM for the AICMT International website. It includes:

- **Prisma Schema**: Comprehensive MongoDB schema definition
- **Server Actions**: Type-safe database operations
- **Type Definitions**: TypeScript types for all models
- **Examples**: Sample components using the MongoDB integration
- **Documentation**: Detailed guides for usage and integration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. **Install dependencies**:

```bash
npm install @prisma/client mongodb
npm install -D prisma
```

2. **Set up environment variables**:

Create a `.env` file in your project root with your MongoDB connection string:

```env
DATABASE_URL="mongodb+srv://biobags:Naveenreddy@bio-bags.u7sdsj8.mongodb.net/aicmt-international?retryWrites=true&w=majority&appName=bio-bags"
```

3. **Generate Prisma client**:

```bash
npx prisma generate
```

4. **Push schema to MongoDB**:

```bash
npx prisma db push
```

5. **Seed the database** (optional):

```bash
npx prisma db seed
```

## 📁 Project Structure

```
mongodb-prisma/
├── prisma/
│   ├── schema.prisma          # Prisma schema for MongoDB
│   └── seed.ts               # Database seeding script
├── lib/
│   ├── prisma.ts             # Prisma client configuration
│   └── mongodb.ts            # MongoDB utilities
├── actions/                  # Server actions for MongoDB
│   ├── products.ts
│   ├── blog.ts
│   ├── inquiries.ts
│   └── users.ts
├── types/                    # TypeScript types
│   └── index.ts
├── examples/                 # Example components
│   ├── product-list.tsx
│   ├── inquiry-form.tsx
│   └── blog-post.tsx
├── .env.example              # Environment variables template
├── README.md                 # This file
├── INTEGRATION.md            # Integration guide
└── USAGE.md                  # Usage documentation
```

## 🔑 Key Features

- **Document-Based Schema**: Flexible schema design for complex data
- **Type Safety**: Full TypeScript support with Prisma-generated types
- **Server Actions**: Ready-to-use server actions for all CRUD operations
- **Pagination & Filtering**: Built-in support for pagination and filtering
- **Relationships**: Support for embedded and referenced relationships
- **Performance**: Optimized queries with proper indexing
- **Scalability**: Horizontal scaling with MongoDB Atlas

## 📚 Documentation

- [Integration Guide](./INTEGRATION.md): Step-by-step guide for integrating MongoDB
- [Usage Guide](./USAGE.md): Examples and best practices for using the MongoDB integration

## 🧩 Examples

### Product List Component

```tsx
// Example usage of the product list component
import ProductList from "@/mongodb-prisma/examples/product-list"

export default function ProductsPage() {
  return (
    <div>
      <h1>Our Products</h1>
      <ProductList />
    </div>
  )
}
```

### Inquiry Form Component

```tsx
// Example usage of the inquiry form component
import InquiryForm from "@/mongodb-prisma/examples/inquiry-form"

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <InquiryForm />
    </div>
  )
}
```

### Blog Post Component

```tsx
// Example usage of the blog post component
import BlogPost from "@/mongodb-prisma/examples/blog-post"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPost slug={params.slug} />
}
```

## 🔄 Migration Strategy

### Phase 1: Parallel Setup (Current)

- ✅ Set up MongoDB + Prisma alongside Supabase
- ✅ Create schema mapping
- ✅ Implement basic CRUD operations

### Phase 2: Data Migration

- 🔄 Export data from Supabase
- 🔄 Transform and import to MongoDB
- 🔄 Validate data integrity

### Phase 3: Switch Over

- 🔄 Update server actions to use MongoDB
- 🔄 Test all functionality
- 🔄 Deploy and monitor

## 🛠️ Troubleshooting

For common issues and solutions, please refer to the [Integration Guide](./INTEGRATION.md#-troubleshooting).

## 📞 Support

For issues related to MongoDB integration:
- Check the troubleshooting section in the Integration Guide
- Review Prisma documentation
- Contact the development team

---

**Last Updated:** July 2025
**Version:** 1.0.0