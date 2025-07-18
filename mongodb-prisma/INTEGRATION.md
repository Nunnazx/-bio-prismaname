# 🔄 MongoDB + Prisma Integration Guide

This guide explains how to integrate the MongoDB + Prisma setup into your existing AICMT International project.

## 📋 Step-by-Step Integration

### 1. Install Required Dependencies

```bash
npm install @prisma/client mongodb
npm install -D prisma
```

### 2. Set Up Environment Variables

Create a `.env` file in your project root:

```env
# MongoDB Connection
DATABASE_URL="mongodb+srv://biobags:Naveenreddy@bio-bags.u7sdsj8.mongodb.net/aicmt-international?retryWrites=true&w=majority&appName=bio-bags"
```

### 3. Initialize Prisma

```bash
# Generate Prisma client
npx prisma generate

# Push schema to MongoDB
npx prisma db push

# Seed the database with initial data
npx prisma db seed
```

### 4. Import MongoDB-Prisma Server Actions

Update your existing server actions to use MongoDB instead of Supabase. For example:

```typescript
// Before (Supabase)
import { createClient } from "@/lib/supabase/server"

export async function getProducts() {
  const supabase = createClient()
  const { data, error } = await supabase.from("products").select("*")
  // ...
}

// After (MongoDB + Prisma)
import { prisma } from "@/mongodb-prisma/lib/prisma"

export async function getProducts() {
  const products = await prisma.product.findMany()
  // ...
}
```

### 5. Update API Routes

If you have API routes, update them to use Prisma:

```typescript
// Before (Supabase)
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = createClient()
  const { data } = await supabase.from("products").select("*")
  return Response.json({ products: data })
}

// After (MongoDB + Prisma)
import { prisma } from "@/mongodb-prisma/lib/prisma"

export async function GET() {
  const products = await prisma.product.findMany()
  return Response.json({ products })
}
```

### 6. Update Components

Update your components to work with the new data structure:

```tsx
// Before (Supabase)
const { data: products } = await supabase.from("products").select("*")

// After (MongoDB + Prisma)
const products = await prisma.product.findMany()
```

## 🔄 Migration Strategy

### Phase 1: Parallel Setup (Current)

- ✅ Set up MongoDB + Prisma alongside Supabase
- ✅ Create schema mapping
- ✅ Implement basic CRUD operations

### Phase 2: Data Migration

1. **Export Supabase Data**

```bash
# Export data from Supabase
npx supabase db dump -f supabase_dump.sql
```

2. **Transform Data for MongoDB**

Create a migration script:

```typescript
// scripts/migrate-data.ts
import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

const prisma = new PrismaClient()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

async function migrateProducts() {
  const { data: supabaseProducts } = await supabase.from('products').select('*')
  
  for (const product of supabaseProducts) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        // Map other fields...
      }
    })
  }
}

// Run migration functions
async function main() {
  await migrateProducts()
  // Migrate other data...
}

main()
```

3. **Run Migration Script**

```bash
npx ts-node scripts/migrate-data.ts
```

### Phase 3: Switch Over

1. **Update Import Paths**

```typescript
// Before
import { getProducts } from "@/app/actions/products"

// After
import { getProducts } from "@/mongodb-prisma/actions/products"
```

2. **Test Functionality**

Test all features with MongoDB to ensure they work correctly.

3. **Deploy and Monitor**

Deploy the updated application and monitor for any issues.

## 🔍 Troubleshooting

### Common Issues

1. **Connection Errors**

```
Error: MongoServerError: bad auth : Authentication failed
```

**Solution**: Check your MongoDB connection string and credentials.

2. **Schema Sync Issues**

```
Error: Unknown arg `isPrimary` in data.images.create.isPrimary for type ProductImageCreateInput
```

**Solution**: Run `npx prisma generate` to update the Prisma client.

3. **Type Errors**

```
Type 'Product' from Prisma is not assignable to type 'Product' from Supabase
```

**Solution**: Update your type definitions to match the new Prisma schema.

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Next.js with MongoDB](https://nextjs.org/docs/pages/building-your-application/configuring/databases#mongodb)

## 🛠️ Advanced Configuration

### Connection Pooling

For production environments, consider using connection pooling:

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    connectionLimit: 10, // Adjust based on your needs
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Monitoring and Logging

Set up monitoring for your MongoDB database:

1. Enable MongoDB Atlas monitoring
2. Implement logging for Prisma queries
3. Set up alerts for database performance issues

## 🔐 Security Best Practices

1. **Environment Variables**: Store connection strings in environment variables
2. **IP Whitelisting**: Restrict access to your MongoDB Atlas cluster
3. **Least Privilege**: Use database users with minimal required permissions
4. **Data Validation**: Validate all data before inserting into the database
5. **Query Optimization**: Use indexes for frequently queried fields

## 📈 Performance Optimization

1. **Indexing**: Create indexes for frequently queried fields
2. **Projection**: Select only the fields you need
3. **Pagination**: Use pagination for large datasets
4. **Caching**: Implement caching for frequently accessed data
5. **Aggregation**: Use MongoDB aggregation pipeline for complex queries

---

For any questions or issues, please refer to the MongoDB-Prisma documentation or contact the development team.