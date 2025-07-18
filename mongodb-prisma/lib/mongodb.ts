import { MongoClient } from 'mongodb'

// MongoDB connection string from environment variable
const uri = process.env.DATABASE_URL || 'mongodb+srv://biobags:Naveenreddy@bio-bags.u7sdsj8.mongodb.net/?retryWrites=true&w=majority&appName=bio-bags'

// MongoDB client
let client: MongoClient
let clientPromise: Promise<MongoClient>

// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// Helper function to get database
export async function getDatabase(dbName = 'aicmt-international') {
  const client = await clientPromise
  return client.db(dbName)
}

// Helper function to get collection
export async function getCollection(collectionName: string, dbName = 'aicmt-international') {
  const db = await getDatabase(dbName)
  return db.collection(collectionName)
}

// Helper function to check database connection
export async function checkConnection() {
  try {
    const client = await clientPromise
    await client.db().command({ ping: 1 })
    return { connected: true, message: 'Successfully connected to MongoDB' }
  } catch (error) {
    console.error('MongoDB connection error:', error)
    return { connected: false, message: error.message }
  }
}

// Helper function to get database stats
export async function getDatabaseStats(dbName = 'aicmt-international') {
  try {
    const db = await getDatabase(dbName)
    const stats = await db.stats()
    
    // Get collection stats
    const collections = await db.listCollections().toArray()
    const collectionStats = await Promise.all(
      collections.map(async (collection) => {
        const stats = await db.command({ collStats: collection.name })
        return {
          name: collection.name,
          count: stats.count,
          size: stats.size,
          avgObjSize: stats.avgObjSize
        }
      })
    )
    
    return {
      dbName,
      collections: collections.length,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize,
      indexes: stats.indexes,
      collectionStats
    }
  } catch (error) {
    console.error('Error getting database stats:', error)
    throw error
  }
}