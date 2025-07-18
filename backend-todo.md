# MongoDB + Prisma Backend Schema Completion Status

This document outlines the collections and fields defined in your MongoDB + Prisma backend schema.
A checkmark (✅) indicates that the collection and its fields are defined in the Prisma schema, meaning their structure is complete.

---

## ✅ `products` Collection
*Server actions exist in `mongodb-prisma/actions/products.ts`.*
- ✅ `id: string`
- ✅ `name: string`
- ✅ `code: string`
- ✅ `category: string`
- ✅ `description: string | null`
- ✅ `features: Json | null`
- ✅ `specifications: Json | null`
- ✅ `price: string | null`
- ✅ `imageUrl: string | null`
- ✅ `isActive: boolean`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `productImages` Collection
*Server actions manage these images through MongoDB.*
- ✅ `id: string`
- ✅ `productId: string`
- ✅ `imageUrl: string`
- ✅ `altText: string | null`
- ✅ `isPrimary: boolean`
- ✅ `displayOrder: number`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `blogPosts` Collection
*Server actions exist in `mongodb-prisma/actions/blog.ts`.*
- ✅ `id: string`
- ✅ `title: string`
- ✅ `slug: string`
- ✅ `content: string | null`
- ✅ `excerpt: string | null`
- ✅ `authorId: string | null`
- ✅ `category: string | null`
- ✅ `tags: string[]`
- ✅ `status: string`
- ✅ `featuredImage: string | null`
- ✅ `seoTitle: string | null`
- ✅ `seoDescription: string | null`
- ✅ `seoKeywords: string | null`
- ✅ `publishDate: DateTime | null`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `inquiries` Collection
*Server actions exist in `mongodb-prisma/actions/inquiries.ts`.*
- ✅ `id: string`
- ✅ `name: string`
- ✅ `email: string`
- ✅ `company: string | null`
- ✅ `phone: string | null`
- ✅ `message: string`
- ✅ `productInterest: string | null`
- ✅ `status: string`
- ✅ `priority: string`
- ✅ `assignedTo: string | null`
- ✅ `notes: string | null`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `users` Collection
*Server actions exist in `mongodb-prisma/actions/users.ts`.*
- ✅ `id: string`
- ✅ `firstName: string | null`
- ✅ `lastName: string | null`
- ✅ `email: string`
- ✅ `avatarUrl: string | null`
- ✅ `company: string | null`
- ✅ `position: string | null`
- ✅ `phone: string | null`
- ✅ `bio: string | null`
- ✅ `role: string`
- ✅ `preferences: Json`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `media` Collection
*Server actions manage file uploads and metadata.*
- ✅ `id: string`
- ✅ `fileName: string`
- ✅ `filePath: string`
- ✅ `fileType: string`
- ✅ `fileSize: number`
- ✅ `mimeType: string | null`
- ✅ `dimensions: string | null`
- ✅ `altText: string | null`
- ✅ `caption: string | null`
- ✅ `uploadedBy: string | null`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `seoMetadata` Collection
*Server actions exist in `app/actions/seo.ts`.*
- ✅ `id: string`
- ✅ `pagePath: string`
- ✅ `title: string`
- ✅ `description: string | null`
- ✅ `keywords: string | null`
- ✅ `ogTitle: string | null`
- ✅ `ogDescription: string | null`
- ✅ `ogImage: string | null`
- ✅ `canonicalUrl: string | null`
- ✅ `robots: string`
- ✅ `structuredData: Json | null`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `roles` Collection
*Server actions exist in `app/actions/roles.ts`.*
- ✅ `id: string`
- ✅ `name: string`
- ✅ `description: string | null`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `permissions` Collection
*Server actions exist in `app/actions/roles.ts`.*
- ✅ `id: string`
- ✅ `name: string`
- ✅ `description: string | null`
- ✅ `resource: string`
- ✅ `action: string`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `rolePermissions` Collection (Join Collection)
*Server actions exist in `app/actions/roles.ts`.*
- ✅ `roleId: string`
- ✅ `permissionId: string`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `backups` Collection
*Server actions exist in `app/actions/backups.ts`.*
- ✅ `id: string`
- ✅ `filename: string`
- ✅ `size: number`
- ✅ `backupType: string`
- ✅ `status: string`
- ✅ `storagePath: string`
- ✅ `createdBy: string | null`
- ✅ `notes: string | null`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `customOrders` Collection
*Server actions exist in `app/actions/custom-orders.ts`.*
- ✅ `id: string`
- ✅ `productType: string`
- ✅ `size: string`
- ✅ `color: string`
- ✅ `thickness: string`
- ✅ `printing: boolean`
- ✅ `printingColors: number | null`
- ✅ `logoUrl: string | null`
- ✅ `quantity: number`
- ✅ `companyName: string`
- ✅ `contactName: string`
- ✅ `email: string`
- ✅ `phone: string | null`
- ✅ `timeline: string | null`
- ✅ `specialRequirements: string | null`
- ✅ `status: string`
- ✅ `quoteAmount: number | null`
- ✅ `quoteDate: DateTime | null`
- ✅ `notes: string | null`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `reviews` Collection
*Server actions exist in `app/actions/reviews.ts`.*
- ✅ `id: string`
- ✅ `productId: string`
- ✅ `userId: string | null`
- ✅ `name: string`
- ✅ `email: string`
- ✅ `rating: number`
- ✅ `title: string`
- ✅ `content: string`
- ✅ `status: string`
- ✅ `isVerifiedPurchase: boolean`
- ✅ `helpfulCount: number`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `reviewImages` Collection
*Server actions exist in `app/actions/reviews.ts`.*
- ✅ `id: string`
- ✅ `reviewId: string`
- ✅ `imageUrl: string`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `reviewResponses` Collection
*Server actions exist in `app/actions/reviews.ts`.*
- ✅ `id: string`
- ✅ `reviewId: string`
- ✅ `adminId: string | null`
- ✅ `content: string`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---

## ✅ `newsletterSubscriptions` Collection
*Server actions exist in `app/actions/newsletter.ts`.*
- ✅ `id: string`
- ✅ `email: string`
- ✅ `isSubscribed: boolean`
- ✅ `subscribedAt: DateTime`
- ✅ `unsubscribedAt: DateTime | null`
- ✅ `source: string | null`
- ✅ `createdAt: DateTime`
- ✅ `updatedAt: DateTime`

---
This `backend-todo.md` file now reflects the defined state of your MongoDB + Prisma database schema.