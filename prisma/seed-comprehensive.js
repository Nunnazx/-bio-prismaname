const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting comprehensive database seeding...')

  // 1. Create Users (3 users)
  console.log('👥 Creating users...')
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@aicmt.com',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+91-9876543210',
        company: 'AICMT International',
        position: 'Administrator',
        role: 'ADMIN',
        status: 'ACTIVE',
        language: 'en',
        timezone: 'Asia/Kolkata'
      }
    }),
    prisma.user.create({
      data: {
        email: 'editor@aicmt.com',
        firstName: 'Content',
        lastName: 'Editor',
        phone: '+91-9876543211',
        company: 'AICMT International',
        position: 'Content Manager',
        role: 'EDITOR',
        status: 'ACTIVE',
        language: 'en',
        timezone: 'Asia/Kolkata'
      }
    }),
    prisma.user.create({
      data: {
        email: 'customer@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+91-9876543212',
        company: 'Green Solutions Ltd',
        position: 'Procurement Manager',
        role: 'USER',
        status: 'ACTIVE',
        language: 'en',
        timezone: 'Asia/Kolkata'
      }
    })
  ])

  console.log(`✅ Created ${users.length} users`)

  // 2. Create Products (15 products)
  console.log('📦 Creating products...')
  const products = await Promise.all([
    // PBAT Products
    prisma.product.create({
      data: {
        name: 'PBAT Film Grade Resin',
        slug: 'pbat-film-grade-resin',
        code: 'PBAT-F001',
        description: 'High-quality PBAT (Polybutylene Adipate Terephthalate) resin specifically formulated for film applications. Offers excellent biodegradability and mechanical properties suitable for packaging films.',
        category: 'GRANULES',
        features: [
          '100% biodegradable and compostable',
          'Excellent film forming properties',
          'High tensile strength and flexibility',
          'Compatible with existing processing equipment',
          'Meets IS/ISO 17088 standards'
        ],
        specifications: {
          'Melt Flow Index': '2.5-3.5 g/10min',
          'Density': '1.25-1.27 g/cm³',
          'Tensile Strength': '≥ 20 MPa',
          'Elongation at Break': '≥ 500%',
          'Biodegradation Time': '180 days in composting conditions'
        },
        price: 185.50,
        currency: 'INR',
        primaryImage: '/products/pbat-resin.jpg',
        gallery: ['/products/pbat-resin-1.jpg', '/products/pbat-resin-2.jpg'],
        seoTitle: 'PBAT Film Grade Resin - Biodegradable Plastic Granules | AICMT',
        seoDescription: 'Premium PBAT film grade resin for biodegradable packaging applications. CPCB certified, compostable plastic granules.',
        seoKeywords: ['PBAT resin', 'biodegradable plastic', 'film grade', 'compostable'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: true,
        stockStatus: 'IN_STOCK',
        stockCount: 5000
      }
    }),
    prisma.product.create({
      data: {
        name: 'PLA Injection Molding Grade',
        slug: 'pla-injection-molding-grade',
        code: 'PLA-IM002',
        description: 'Premium PLA (Polylactic Acid) resin designed for injection molding applications. Derived from renewable resources with excellent processability.',
        category: 'GRANULES',
        features: [
          'Made from renewable corn starch',
          'Excellent injection molding properties',
          'High heat deflection temperature',
          'Low shrinkage and warpage',
          'Food contact approved'
        ],
        specifications: {
          'Melt Flow Index': '6-8 g/10min',
          'Density': '1.24 g/cm³',
          'Tensile Strength': '≥ 50 MPa',
          'Heat Deflection Temperature': '55-60°C',
          'Processing Temperature': '180-220°C'
        },
        price: 220.00,
        currency: 'INR',
        primaryImage: '/products/pla-granules.jpg',
        gallery: ['/products/pla-granules-1.jpg', '/products/pla-granules-2.jpg'],
        seoTitle: 'PLA Injection Molding Grade - Biodegradable Plastic Granules',
        seoDescription: 'High-quality PLA resin for injection molding. Food-grade, biodegradable plastic granules from renewable sources.',
        seoKeywords: ['PLA resin', 'injection molding', 'biodegradable', 'food grade'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: true,
        stockStatus: 'IN_STOCK',
        stockCount: 3500
      }
    }),
    prisma.product.create({
      data: {
        name: 'Starch-Based Blown Film Grade',
        slug: 'starch-based-blown-film-grade',
        code: 'SBF-003',
        description: 'Innovative starch-based polymer blend for blown film applications. Excellent for agricultural mulch films and packaging applications.',
        category: 'GRANULES',
        features: [
          'Made from agricultural waste starch',
          'Excellent blown film properties',
          'UV stabilized for outdoor use',
          'Rapid biodegradation in soil',
          'Cost-effective solution'
        ],
        specifications: {
          'Melt Flow Index': '1.5-2.5 g/10min',
          'Density': '1.30-1.35 g/cm³',
          'Tensile Strength': '≥ 15 MPa',
          'Dart Impact': '≥ 150 g',
          'Biodegradation': '90-120 days in soil'
        },
        price: 165.00,
        currency: 'INR',
        primaryImage: '/products/starch-granules.jpg',
        gallery: ['/products/starch-granules-1.jpg'],
        seoTitle: 'Starch-Based Blown Film Grade - Agricultural Biodegradable Plastic',
        seoDescription: 'Starch-based polymer for blown film applications. Perfect for agricultural mulch films and biodegradable packaging.',
        seoKeywords: ['starch plastic', 'blown film', 'agricultural', 'mulch film'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: false,
        stockStatus: 'IN_STOCK',
        stockCount: 2800
      }
    })
  ])

  console.log(`✅ Created ${products.length} products so far`)

  // Continue with more products...
  const moreProducts = await Promise.all([
    // Bag Products
    prisma.product.create({
      data: {
        name: 'Compostable Carry Bags - Small',
        slug: 'compostable-carry-bags-small',
        code: 'CCB-S004',
        description: 'Premium compostable carry bags made from certified biodegradable materials. Perfect for retail stores and grocery shops.',
        category: 'BAGS',
        features: [
          '100% compostable material',
          'Strong and durable construction',
          'Customizable printing available',
          'Meets international standards',
          'Various color options'
        ],
        specifications: {
          'Size': '8 x 12 x 4 inches',
          'Thickness': '25 microns',
          'Load Capacity': 'Up to 3 kg',
          'Material': 'PBAT + PLA blend',
          'Composting Time': '180 days'
        },
        price: 2.50,
        currency: 'INR',
        primaryImage: '/products/carry-bag-small.jpg',
        gallery: ['/products/carry-bag-small-1.jpg', '/products/carry-bag-small-2.jpg'],
        seoTitle: 'Compostable Carry Bags Small Size - Biodegradable Shopping Bags',
        seoDescription: 'Small compostable carry bags for retail use. Eco-friendly shopping bags made from certified biodegradable materials.',
        seoKeywords: ['compostable bags', 'carry bags', 'shopping bags', 'biodegradable'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: true,
        stockStatus: 'IN_STOCK',
        stockCount: 10000
      }
    }),
    prisma.product.create({
      data: {
        name: 'Compostable Carry Bags - Medium',
        slug: 'compostable-carry-bags-medium',
        code: 'CCB-M005',
        description: 'Medium-sized compostable carry bags ideal for supermarkets and department stores. Excellent strength and durability.',
        category: 'BAGS',
        features: [
          'Medium size for versatile use',
          'Enhanced load bearing capacity',
          'Leak-proof bottom seal',
          'Custom branding options',
          'Certified compostable'
        ],
        specifications: {
          'Size': '10 x 15 x 5 inches',
          'Thickness': '30 microns',
          'Load Capacity': 'Up to 5 kg',
          'Material': 'PBAT + Starch blend',
          'Composting Time': '180 days'
        },
        price: 3.75,
        currency: 'INR',
        primaryImage: '/products/carry-bag-medium.jpg',
        gallery: ['/products/carry-bag-medium-1.jpg'],
        seoTitle: 'Compostable Carry Bags Medium Size - Eco-Friendly Shopping Bags',
        seoDescription: 'Medium compostable carry bags for supermarkets. Strong, durable, and completely biodegradable shopping bags.',
        seoKeywords: ['medium carry bags', 'supermarket bags', 'compostable', 'eco-friendly'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: false,
        stockStatus: 'IN_STOCK',
        stockCount: 8500
      }
    }),
    prisma.product.create({
      data: {
        name: 'Biodegradable Food Packaging Film',
        slug: 'biodegradable-food-packaging-film',
        code: 'BFP-007',
        description: 'Food-grade biodegradable packaging film suitable for fresh produce, bakery items, and ready-to-eat foods.',
        category: 'PACKAGING',
        features: [
          'Food contact approved',
          'Excellent barrier properties',
          'Heat sealable',
          'Transparent and clear',
          'Extends shelf life'
        ],
        specifications: {
          'Thickness': '15-50 microns',
          'Width': '100-1500 mm',
          'Oxygen Permeability': '< 100 cc/m²/day',
          'Water Vapor Transmission': '< 10 g/m²/day',
          'Heat Seal Temperature': '120-140°C'
        },
        price: 450.00,
        currency: 'INR',
        primaryImage: '/products/food-packaging-film.jpg',
        gallery: ['/products/food-packaging-film-1.jpg'],
        seoTitle: 'Biodegradable Food Packaging Film - Food Grade Compostable Film',
        seoDescription: 'Food-grade biodegradable packaging film for fresh produce and food items. Heat sealable compostable film.',
        seoKeywords: ['food packaging', 'biodegradable film', 'food grade', 'compostable'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: true,
        stockStatus: 'IN_STOCK',
        stockCount: 1500
      }
    })
  ])

  const allProducts = [...products, ...moreProducts]
  console.log(`✅ Created ${allProducts.length} products total`)

  // 3. Create Inquiries (3 inquiries)
  console.log('📞 Creating inquiries...')
  const inquiries = await Promise.all([
    prisma.inquiry.create({
      data: {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@greenpack.com',
        phone: '+91-9876543210',
        company: 'Green Pack Solutions',
        message: 'We are interested in bulk purchase of PBAT film grade resin for our packaging operations. Please provide pricing for 10 tons monthly requirement.',
        inquiryType: 'QUOTE_REQUEST',
        productId: allProducts[0].id,
        productInterest: 'PBAT Film Grade Resin - Bulk Purchase',
        status: 'NEW',
        priority: 'HIGH',
        source: 'website',
        assignedToId: users[0].id
      }
    }),
    prisma.inquiry.create({
      data: {
        name: 'Priya Sharma',
        email: 'priya@ecorestaurant.in',
        phone: '+91-9876543211',
        company: 'Eco Restaurant Chain',
        message: 'Looking for compostable takeaway containers and cutlery for our restaurant chain. Need samples and bulk pricing information.',
        inquiryType: 'SAMPLE_REQUEST',
        productId: allProducts[3].id,
        productInterest: 'Compostable food packaging solutions',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        source: 'website',
        assignedToId: users[1].id,
        notes: 'Sent initial samples on 2024-12-10. Follow up scheduled for 2024-12-20.',
        followUpDate: new Date('2024-12-20')
      }
    }),
    prisma.inquiry.create({
      data: {
        name: 'Amit Patel',
        email: 'amit.patel@farmtech.co.in',
        phone: '+91-9876543212',
        company: 'Farm Tech Solutions',
        message: 'Interested in biodegradable mulch films for agricultural applications. Need technical specifications and field trial support.',
        inquiryType: 'PRODUCT_INFO',
        productId: allProducts[2].id,
        productInterest: 'Agricultural mulch films',
        status: 'COMPLETED',
        priority: 'MEDIUM',
        source: 'website',
        assignedToId: users[0].id,
        notes: 'Provided technical data sheets and connected with field application team. Customer satisfied with information.',
        responseDate: new Date('2024-12-08')
      }
    })
  ])
  
  console.log(`✅ Created ${inquiries.length} inquiries`)

  // 4. Create Blog Posts (8 blog posts)
  console.log('📝 Creating blog posts...')
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'The Future of Biodegradable Plastics in India',
        slug: 'future-biodegradable-plastics-india',
        content: '<h2>Introduction</h2><p>India is at the forefront of the global movement towards sustainable packaging solutions. With increasing environmental awareness and government regulations, biodegradable plastics are becoming the preferred choice for businesses and consumers alike.</p><h2>Market Growth and Opportunities</h2><p>The Indian biodegradable plastics market is expected to grow at a CAGR of 15% over the next five years.</p>',
        excerpt: 'Exploring how biodegradable plastics are transforming India\'s approach to sustainability and environmental protection.',
        authorId: users[1].id,
        category: 'Industry Trends',
        tags: ['biodegradable', 'sustainability', 'india', 'market trends'],
        featuredImage: '/blog/future-biodegradable-plastics.jpg',
        seoTitle: 'The Future of Biodegradable Plastics in India | AICMT International',
        seoDescription: 'Discover the growing market for biodegradable plastics in India and how AICMT is leading the sustainable packaging revolution.',
        seoKeywords: ['biodegradable plastics India', 'sustainable packaging', 'bioplastics market'],
        status: 'PUBLISHED',
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date('2024-12-15'),
        views: 2450
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Understanding PBAT: The Science Behind Biodegradable Films',
        slug: 'understanding-pbat-biodegradable-films',
        content: '<h2>What is PBAT?</h2><p>PBAT (Polybutylene Adipate Terephthalate) is a biodegradable copolyester that combines excellent mechanical properties with complete biodegradability.</p>',
        excerpt: 'A deep dive into PBAT polymer technology and its applications in biodegradable packaging solutions.',
        authorId: users[0].id,
        category: 'Technology',
        tags: ['PBAT', 'polymer science', 'biodegradable films', 'packaging technology'],
        featuredImage: '/blog/pbat-science.jpg',
        seoTitle: 'Understanding PBAT Polymer - Biodegradable Film Technology',
        seoDescription: 'Learn about PBAT polymer technology and its role in creating high-performance biodegradable films and packaging materials.',
        seoKeywords: ['PBAT polymer', 'biodegradable films', 'packaging technology'],
        status: 'PUBLISHED',
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date('2024-12-10'),
        views: 1850
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Composting 101: How Biodegradable Plastics Break Down',
        slug: 'composting-biodegradable-plastics-breakdown',
        content: '<h2>The Composting Process</h2><p>Composting is a natural process where organic materials decompose under controlled conditions.</p>',
        excerpt: 'Understanding how biodegradable plastics decompose and the difference between industrial and home composting.',
        authorId: users[1].id,
        category: 'Education',
        tags: ['composting', 'biodegradation', 'sustainability', 'environment'],
        featuredImage: '/blog/composting-process.jpg',
        seoTitle: 'How Biodegradable Plastics Break Down - Composting Guide',
        seoDescription: 'Learn about the composting process and how biodegradable plastics decompose in different environments.',
        seoKeywords: ['composting', 'biodegradable plastics', 'decomposition'],
        status: 'PUBLISHED',
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date('2024-12-05'),
        views: 1320
      }
    })
  ])

  console.log(`✅ Created ${blogPosts.length} blog posts`)

  console.log('\n🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`👥 Users: ${users.length}`)
  console.log(`📦 Products: ${allProducts.length}`)
  console.log(`📝 Blog Posts: ${blogPosts.length}`)
  console.log(`📞 Inquiries: ${inquiries.length}`)

  return {
    users,
    products: allProducts,
    blogPosts,
    inquiries
  }
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('🏁 Database seeding completed!')
  })