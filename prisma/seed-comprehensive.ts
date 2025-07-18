import { PrismaClient } from '@prisma/client'

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
    }),
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
          'Size': '8" × 12" × 4"',
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
          'Size': '10" × 15" × 5"',
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
        name: 'Compostable Carry Bags - Large',
        slug: 'compostable-carry-bags-large',
        code: 'CCB-L006',
        description: 'Large compostable carry bags for heavy-duty applications. Perfect for bulk shopping and industrial use.',
        category: 'BAGS',
        features: [
          'Extra large capacity',
          'Reinforced handles',
          'Heavy-duty construction',
          'Industrial grade strength',
          'Bulk order discounts available'
        ],
        specifications: {
          'Size': '12" × 18" × 6"',
          'Thickness': '40 microns',
          'Load Capacity': 'Up to 8 kg',
          'Material': 'PBAT + PLA + Starch',
          'Composting Time': '180 days'
        },
        price: 5.25,
        currency: 'INR',
        primaryImage: '/products/carry-bag-large.jpg',
        gallery: ['/products/carry-bag-large-1.jpg', '/products/carry-bag-large-2.jpg'],
        seoTitle: 'Compostable Carry Bags Large Size - Heavy Duty Biodegradable Bags',
        seoDescription: 'Large compostable carry bags for heavy-duty use. Industrial strength biodegradable shopping bags.',
        seoKeywords: ['large carry bags', 'heavy duty', 'industrial bags', 'compostable'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: false,
        stockStatus: 'IN_STOCK',
        stockCount: 6200
      }
    })
  ])

  // Continue with more products...
  const moreProducts = await Promise.all([
    // Packaging Products
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
    }),
    prisma.product.create({
      data: {
        name: 'Compostable Mulch Film',
        slug: 'compostable-mulch-film',
        code: 'CMF-008',
        description: 'Agricultural mulch film that biodegrades in soil, eliminating the need for removal after harvest.',
        category: 'FILMS',
        features: [
          'Biodegrades in soil',
          'UV stabilized',
          'Weed suppression',
          'Moisture retention',
          'Temperature regulation'
        ],
        specifications: {
          'Thickness': '12-25 microns',
          'Width': '1000-2000 mm',
          'UV Stability': '6-12 months',
          'Biodegradation': '6-24 months in soil',
          'Color': 'Black, Clear, Silver'
        },
        price: 380.00,
        currency: 'INR',
        primaryImage: '/products/mulch-film.jpg',
        gallery: ['/products/mulch-film-1.jpg', '/products/mulch-film-2.jpg'],
        seoTitle: 'Compostable Mulch Film - Biodegradable Agricultural Film',
        seoDescription: 'Compostable mulch film for agriculture. Biodegrades in soil, UV stabilized, perfect for crop protection.',
        seoKeywords: ['mulch film', 'agricultural film', 'biodegradable', 'farming'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: false,
        stockStatus: 'IN_STOCK',
        stockCount: 2200
      }
    }),
    prisma.product.create({
      data: {
        name: 'Biodegradable Garbage Bags',
        slug: 'biodegradable-garbage-bags',
        code: 'BGB-009',
        description: 'Strong and durable biodegradable garbage bags for household and commercial waste management.',
        category: 'BAGS',
        features: [
          'Leak-proof construction',
          'Odor control technology',
          'Various sizes available',
          'Tie-handle design',
          'Certified compostable'
        ],
        specifications: {
          'Sizes': '19"×21", 24"×32", 30"×37"',
          'Thickness': '20-25 microns',
          'Load Capacity': '10-15 kg',
          'Material': 'PBAT + Corn starch',
          'Degradation': '180 days in composting'
        },
        price: 8.50,
        currency: 'INR',
        primaryImage: '/products/garbage-bags.jpg',
        gallery: ['/products/garbage-bags-1.jpg'],
        seoTitle: 'Biodegradable Garbage Bags - Compostable Waste Bags',
        seoDescription: 'Strong biodegradable garbage bags for waste management. Leak-proof, odor control, compostable waste bags.',
        seoKeywords: ['garbage bags', 'waste bags', 'biodegradable', 'compostable'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: false,
        stockStatus: 'IN_STOCK',
        stockCount: 7500
      }
    })
  ])

  const allProducts = [...products, ...moreProducts]
  console.log(`✅ Created ${allProducts.length} products`)

  return { users, products: allProducts }
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('🏁 Database seeding completed!')
  })  /
/ Continue with remaining products (6 more to reach 15 total)
  const finalProducts = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Compostable Takeaway Containers',
        slug: 'compostable-takeaway-containers',
        code: 'CTC-010',
        description: 'Food-grade compostable takeaway containers perfect for restaurants and food delivery services.',
        category: 'PACKAGING',
        features: [
          'Microwave safe',
          'Leak-proof design',
          'Stackable for storage',
          'Various sizes available',
          'Grease resistant'
        ],
        specifications: {
          'Material': 'PLA + Natural fiber',
          'Temperature Range': '-20°C to +100°C',
          'Sizes': '500ml, 750ml, 1000ml',
          'Composting Time': '90-180 days',
          'Certification': 'BPI Certified'
        },
        price: 12.50,
        currency: 'INR',
        primaryImage: '/products/takeaway-containers.jpg',
        gallery: ['/products/takeaway-containers-1.jpg'],
        seoTitle: 'Compostable Takeaway Containers - Food Grade Biodegradable Containers',
        seoDescription: 'Compostable takeaway containers for restaurants. Microwave safe, leak-proof biodegradable food containers.',
        seoKeywords: ['takeaway containers', 'food containers', 'compostable', 'restaurant'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: true,
        stockStatus: 'IN_STOCK',
        stockCount: 4500
      }
    }),
    prisma.product.create({
      data: {
        name: 'Biodegradable Cutlery Set',
        slug: 'biodegradable-cutlery-set',
        code: 'BCS-011',
        description: 'Complete biodegradable cutlery set including spoons, forks, and knives made from plant-based materials.',
        category: 'PACKAGING',
        features: [
          'Heat resistant up to 85°C',
          'Smooth finish',
          'No splinters or rough edges',
          'Natural color options',
          'Bulk packaging available'
        ],
        specifications: {
          'Material': 'PLA + Wood fiber',
          'Length': '160mm (standard)',
          'Weight': '3-4g per piece',
          'Heat Resistance': 'Up to 85°C',
          'Composting': '90-120 days'
        },
        price: 1.25,
        currency: 'INR',
        primaryImage: '/products/biodegradable-cutlery.jpg',
        gallery: ['/products/biodegradable-cutlery-1.jpg', '/products/biodegradable-cutlery-2.jpg'],
        seoTitle: 'Biodegradable Cutlery Set - Compostable Spoons Forks Knives',
        seoDescription: 'Biodegradable cutlery set made from plant-based materials. Heat resistant compostable spoons, forks, and knives.',
        seoKeywords: ['biodegradable cutlery', 'compostable spoons', 'eco cutlery', 'plant based'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: false,
        stockStatus: 'IN_STOCK',
        stockCount: 15000
      }
    }),
    prisma.product.create({
      data: {
        name: 'Compostable Plates and Bowls',
        slug: 'compostable-plates-bowls',
        code: 'CPB-012',
        description: 'Sturdy compostable plates and bowls made from sugarcane bagasse and bamboo fiber.',
        category: 'PACKAGING',
        features: [
          'Made from agricultural waste',
          'Oil and water resistant',
          'Microwave and freezer safe',
          'Natural appearance',
          'Various sizes available'
        ],
        specifications: {
          'Material': 'Sugarcane bagasse + Bamboo',
          'Sizes': '6", 8", 10" plates; 12oz, 16oz bowls',
          'Temperature Range': '-18°C to +120°C',
          'Thickness': '1.5-2.0 mm',
          'Composting': '60-90 days'
        },
        price: 4.75,
        currency: 'INR',
        primaryImage: '/products/compostable-plates.jpg',
        gallery: ['/products/compostable-plates-1.jpg'],
        seoTitle: 'Compostable Plates and Bowls - Biodegradable Tableware',
        seoDescription: 'Compostable plates and bowls made from sugarcane bagasse. Microwave safe biodegradable tableware.',
        seoKeywords: ['compostable plates', 'biodegradable bowls', 'tableware', 'sugarcane'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: false,
        stockStatus: 'IN_STOCK',
        stockCount: 8200
      }
    }),
    prisma.product.create({
      data: {
        name: 'Biodegradable Stretch Wrap Film',
        slug: 'biodegradable-stretch-wrap-film',
        code: 'BSW-013',
        description: 'Industrial-grade biodegradable stretch wrap film for pallet wrapping and cargo protection.',
        category: 'FILMS',
        features: [
          'High stretch ratio',
          'Excellent cling properties',
          'Puncture resistant',
          'UV stabilized',
          'Industrial strength'
        ],
        specifications: {
          'Thickness': '15-25 microns',
          'Width': '450-500 mm',
          'Stretch Ratio': '200-300%',
          'Tensile Strength': '≥ 25 MPa',
          'Biodegradation': '12-18 months'
        },
        price: 520.00,
        currency: 'INR',
        primaryImage: '/products/stretch-wrap.jpg',
        gallery: ['/products/stretch-wrap-1.jpg'],
        seoTitle: 'Biodegradable Stretch Wrap Film - Industrial Pallet Wrap',
        seoDescription: 'Industrial biodegradable stretch wrap film for pallet wrapping. High strength compostable packaging film.',
        seoKeywords: ['stretch wrap', 'pallet wrap', 'biodegradable', 'industrial'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: false,
        stockStatus: 'LOW_STOCK',
        stockCount: 850
      }
    }),
    prisma.product.create({
      data: {
        name: 'Compostable Shopping Bags with Logo',
        slug: 'compostable-shopping-bags-logo',
        code: 'CSL-014',
        description: 'Custom printed compostable shopping bags with your company logo and branding.',
        category: 'CUSTOM',
        features: [
          'Custom logo printing',
          'Multiple color options',
          'Various handle styles',
          'Minimum order quantities',
          'Fast turnaround time'
        ],
        specifications: {
          'Printing': 'Flexographic, up to 6 colors',
          'Minimum Order': '5000 pieces',
          'Lead Time': '15-20 working days',
          'Handle Options': 'Loop, Patch, Twisted',
          'Customization': 'Size, color, printing'
        },
        price: 4.50,
        currency: 'INR',
        primaryImage: '/products/custom-bags.jpg',
        gallery: ['/products/custom-bags-1.jpg', '/products/custom-bags-2.jpg'],
        seoTitle: 'Custom Compostable Shopping Bags with Logo - Branded Eco Bags',
        seoDescription: 'Custom printed compostable shopping bags with your logo. Branded biodegradable bags for businesses.',
        seoKeywords: ['custom bags', 'branded bags', 'logo printing', 'compostable'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: true,
        stockStatus: 'IN_STOCK',
        stockCount: 0 // Custom orders
      }
    }),
    prisma.product.create({
      data: {
        name: 'Biodegradable Nursery Pots',
        slug: 'biodegradable-nursery-pots',
        code: 'BNP-015',
        description: 'Biodegradable nursery pots that can be planted directly in soil, eliminating transplant shock.',
        category: 'CUSTOM',
        features: [
          'Plant directly in soil',
          'Eliminates transplant shock',
          'Made from coconut coir',
          'Various sizes available',
          'Promotes root growth'
        ],
        specifications: {
          'Material': 'Coconut coir + Natural binder',
          'Sizes': '2", 3", 4", 6" diameter',
          'Degradation': '2-6 months in soil',
          'Water Retention': 'Excellent',
          'Root Penetration': 'Easy'
        },
        price: 3.25,
        currency: 'INR',
        primaryImage: '/products/nursery-pots.jpg',
        gallery: ['/products/nursery-pots-1.jpg'],
        seoTitle: 'Biodegradable Nursery Pots - Plantable Seed Starting Pots',
        seoDescription: 'Biodegradable nursery pots made from coconut coir. Plant directly in soil, eliminates transplant shock.',
        seoKeywords: ['nursery pots', 'biodegradable pots', 'seed starting', 'coconut coir'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: false,
        stockStatus: 'IN_STOCK',
        stockCount: 12000
      }
    })
  ])

  const allProductsFinal = [...allProducts, ...finalProducts]
  console.log(`✅ Total products created: ${allProductsFinal.length}`)

  // 3. Create Blog Posts (8 blog posts)
  console.log('📝 Creating blog posts...')
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'The Future of Biodegradable Plastics in India',
        slug: 'future-biodegradable-plastics-india',
        content: `<h2>Introduction</h2>
        <p>India is at the forefront of the global movement towards sustainable packaging solutions. With increasing environmental awareness and government regulations, biodegradable plastics are becoming the preferred choice for businesses and consumers alike.</p>
        
        <h2>Market Growth and Opportunities</h2>
        <p>The Indian biodegradable plastics market is expected to grow at a CAGR of 15% over the next five years. This growth is driven by:</p>
        <ul>
          <li>Government ban on single-use plastics</li>
          <li>Increasing consumer awareness</li>
          <li>Corporate sustainability initiatives</li>
          <li>Technological advancements in bioplastics</li>
        </ul>
        
        <h2>AICMT's Role in the Revolution</h2>
        <p>At AICMT International, we are pioneering the development of high-quality biodegradable plastics that meet international standards while being cost-effective for the Indian market.</p>`,
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
        content: `<h2>What is PBAT?</h2>
        <p>PBAT (Polybutylene Adipate Terephthalate) is a biodegradable copolyester that combines excellent mechanical properties with complete biodegradability. It's one of the most promising materials for replacing conventional plastic films.</p>
        
        <h2>Key Properties of PBAT</h2>
        <ul>
          <li><strong>Biodegradability:</strong> Completely breaks down in composting conditions within 180 days</li>
          <li><strong>Flexibility:</strong> Excellent elongation properties make it ideal for film applications</li>
          <li><strong>Processability:</strong> Compatible with existing plastic processing equipment</li>
          <li><strong>Barrier Properties:</strong> Good moisture and oxygen barrier characteristics</li>
        </ul>
        
        <h2>Applications in Packaging</h2>
        <p>PBAT is widely used in various packaging applications including shopping bags, food packaging films, and agricultural mulch films.</p>`,
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
        content: `<h2>The Composting Process</h2>
        <p>Composting is a natural process where organic materials decompose under controlled conditions. Biodegradable plastics are designed to break down in similar conditions.</p>
        
        <h2>Industrial vs Home Composting</h2>
        <p>There are two main types of composting environments:</p>
        <ul>
          <li><strong>Industrial Composting:</strong> High temperature (55-60°C), controlled humidity, regular turning</li>
          <li><strong>Home Composting:</strong> Lower temperature, variable conditions, longer timeframes</li>
        </ul>
        
        <h2>Certification Standards</h2>
        <p>Look for certifications like ASTM D6400, EN 13432, and IS/ISO 17088 to ensure proper biodegradability.</p>`,
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

  // Continue with more blog posts...
  const moreBlogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'Sustainable Packaging Solutions for E-commerce',
        slug: 'sustainable-packaging-ecommerce',
        content: `<h2>The E-commerce Packaging Challenge</h2>
        <p>With the rapid growth of e-commerce, packaging waste has become a significant environmental concern. Traditional plastic packaging contributes to pollution and waste accumulation.</p>
        
        <h2>Biodegradable Alternatives</h2>
        <p>Our range of biodegradable packaging solutions includes:</p>
        <ul>
          <li>Compostable mailer bags</li>
          <li>Biodegradable bubble wrap alternatives</li>
          <li>Plant-based packaging peanuts</li>
          <li>Compostable tape and labels</li>
        </ul>
        
        <h2>Benefits for E-commerce Businesses</h2>
        <p>Switching to sustainable packaging helps businesses reduce their environmental footprint while appealing to eco-conscious consumers.</p>`,
        excerpt: 'Exploring sustainable packaging solutions that help e-commerce businesses reduce their environmental impact.',
        authorId: users[0].id,
        category: 'Business Solutions',
        tags: ['e-commerce', 'sustainable packaging', 'business', 'environment'],
        featuredImage: '/blog/ecommerce-packaging.jpg',
        seoTitle: 'Sustainable E-commerce Packaging Solutions - Biodegradable Options',
        seoDescription: 'Discover biodegradable packaging solutions for e-commerce businesses. Reduce environmental impact with compostable mailers and packaging.',
        seoKeywords: ['sustainable packaging', 'e-commerce packaging', 'biodegradable mailers'],
        status: 'PUBLISHED',
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date('2024-11-28'),
        views: 1680
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Agricultural Applications of Biodegradable Mulch Films',
        slug: 'agricultural-biodegradable-mulch-films',
        content: `<h2>Traditional vs Biodegradable Mulch Films</h2>
        <p>Traditional plastic mulch films require removal after harvest, creating waste and labor costs. Biodegradable mulch films eliminate this problem by breaking down naturally in soil.</p>
        
        <h2>Benefits for Farmers</h2>
        <ul>
          <li>No removal required after harvest</li>
          <li>Reduces labor costs</li>
          <li>Improves soil health</li>
          <li>Eliminates plastic waste</li>
          <li>Maintains crop yield benefits</li>
        </ul>
        
        <h2>Crop Applications</h2>
        <p>Biodegradable mulch films are suitable for various crops including tomatoes, peppers, strawberries, and melons.</p>`,
        excerpt: 'How biodegradable mulch films are revolutionizing agriculture by eliminating plastic waste while maintaining crop benefits.',
        authorId: users[1].id,
        category: 'Agriculture',
        tags: ['agriculture', 'mulch film', 'farming', 'crop protection'],
        featuredImage: '/blog/agricultural-mulch.jpg',
        seoTitle: 'Biodegradable Mulch Films for Agriculture - Sustainable Farming',
        seoDescription: 'Learn about biodegradable mulch films for agriculture. Eliminate plastic waste while maintaining crop yield benefits.',
        seoKeywords: ['biodegradable mulch film', 'agricultural film', 'sustainable farming'],
        status: 'PUBLISHED',
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date('2024-11-20'),
        views: 980
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Food Safety and Biodegradable Packaging Materials',
        slug: 'food-safety-biodegradable-packaging',
        content: `<h2>Food Contact Regulations</h2>
        <p>Biodegradable packaging materials used for food contact must meet strict safety regulations to ensure consumer health and product quality.</p>
        
        <h2>Testing and Certification</h2>
        <p>Our food-grade biodegradable materials undergo rigorous testing including:</p>
        <ul>
          <li>Migration testing</li>
          <li>Toxicity assessment</li>
          <li>Barrier property evaluation</li>
          <li>Shelf-life studies</li>
        </ul>
        
        <h2>Applications in Food Industry</h2>
        <p>Safe biodegradable packaging is used for fresh produce, bakery items, dairy products, and ready-to-eat meals.</p>`,
        excerpt: 'Understanding food safety requirements for biodegradable packaging materials and their applications in the food industry.',
        authorId: users[0].id,
        category: 'Food Safety',
        tags: ['food safety', 'food packaging', 'regulations', 'certification'],
        featuredImage: '/blog/food-safety-packaging.jpg',
        seoTitle: 'Food Safety in Biodegradable Packaging - Regulations and Testing',
        seoDescription: 'Learn about food safety requirements for biodegradable packaging materials and certification processes.',
        seoKeywords: ['food safety packaging', 'biodegradable food packaging', 'food contact materials'],
        status: 'PUBLISHED',
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date('2024-11-15'),
        views: 1150
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Cost-Benefit Analysis: Switching to Biodegradable Plastics',
        slug: 'cost-benefit-biodegradable-plastics',
        content: `<h2>Initial Investment Considerations</h2>
        <p>While biodegradable plastics may have higher upfront costs, the long-term benefits often outweigh the initial investment.</p>
        
        <h2>Cost Factors</h2>
        <ul>
          <li>Raw material costs</li>
          <li>Processing equipment compatibility</li>
          <li>Waste disposal savings</li>
          <li>Regulatory compliance costs</li>
        </ul>
        
        <h2>Long-term Benefits</h2>
        <p>Benefits include reduced waste management costs, improved brand image, regulatory compliance, and access to environmentally conscious markets.</p>`,
        excerpt: 'Analyzing the costs and benefits of switching from conventional to biodegradable plastics for businesses.',
        authorId: users[1].id,
        category: 'Business Analysis',
        tags: ['cost analysis', 'business benefits', 'ROI', 'sustainability'],
        featuredImage: '/blog/cost-benefit-analysis.jpg',
        seoTitle: 'Cost-Benefit Analysis of Biodegradable Plastics - Business ROI',
        seoDescription: 'Comprehensive cost-benefit analysis of switching to biodegradable plastics. Understand ROI and long-term benefits.',
        seoKeywords: ['biodegradable plastics cost', 'sustainability ROI', 'business benefits'],
        status: 'PUBLISHED',
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date('2024-11-08'),
        views: 1420
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Innovation in Bioplastic Manufacturing: Latest Technologies',
        slug: 'innovation-bioplastic-manufacturing-technologies',
        content: `<h2>Advanced Manufacturing Processes</h2>
        <p>The bioplastic industry is rapidly evolving with new manufacturing technologies that improve quality, reduce costs, and enhance performance.</p>
        
        <h2>Key Innovations</h2>
        <ul>
          <li>Reactive extrusion technology</li>
          <li>Nano-composite reinforcement</li>
          <li>Bio-based additives</li>
          <li>Advanced blending techniques</li>
        </ul>
        
        <h2>Future Developments</h2>
        <p>Emerging technologies promise even better performance and lower costs, making biodegradable plastics more competitive with conventional plastics.</p>`,
        excerpt: 'Exploring the latest innovations and technologies in bioplastic manufacturing that are shaping the future of sustainable materials.',
        authorId: users[0].id,
        category: 'Innovation',
        tags: ['innovation', 'manufacturing', 'technology', 'bioplastics'],
        featuredImage: '/blog/manufacturing-innovation.jpg',
        seoTitle: 'Latest Innovations in Bioplastic Manufacturing Technology',
        seoDescription: 'Discover the latest innovations and technologies in bioplastic manufacturing that are advancing sustainable materials.',
        seoKeywords: ['bioplastic manufacturing', 'innovation', 'sustainable technology'],
        status: 'PUBLISHED',
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date('2024-11-01'),
        views: 1890
      }
    })
  ])

  const allBlogPosts = [...blogPosts, ...moreBlogPosts]
  console.log(`✅ Created ${allBlogPosts.length} blog posts`)

  // 4. Create Product Images (3 per featured product)
  console.log('🖼️ Creating product images...')
  const featuredProducts = allProductsFinal.filter(p => p.isFeatured)
  const productImages = []
  
  for (const product of featuredProducts.slice(0, 3)) {
    const images = await Promise.all([
      prisma.productImage.create({
        data: {
          productId: product.id,
          url: `/products/${product.code.toLowerCase()}-main.jpg`,
          altText: `${product.name} - Main Image`,
          caption: `High-quality ${product.name}`,
          isPrimary: true,
          displayOrder: 1
        }
      }),
      prisma.productImage.create({
        data: {
          productId: product.id,
          url: `/products/${product.code.toLowerCase()}-detail.jpg`,
          altText: `${product.name} - Detail View`,
          caption: `Detailed view of ${product.name}`,
          isPrimary: false,
          displayOrder: 2
        }
      }),
      prisma.productImage.create({
        data: {
          productId: product.id,
          url: `/products/${product.code.toLowerCase()}-application.jpg`,
          altText: `${product.name} - Application`,
          caption: `${product.name} in use`,
          isPrimary: false,
          displayOrder: 3
        }
      })
    ])
    productImages.push(...images)
  }
  
  console.log(`✅ Created ${productImages.length} product images`)

  // 5. Create Inquiries (3 inquiries)
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
        productId: allProductsFinal[0].id,
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
        productId: allProductsFinal.find(p => p.name.includes('Takeaway'))?.id,
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
        productId: allProductsFinal.find(p => p.name.includes('Mulch'))?.id,
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

  // 6. Create Custom Orders (3 orders)
  console.log('🛒 Creating custom orders...')
  const customOrders = await Promise.all([
    prisma.customOrder.create({
      data: {
        companyName: 'Metro Supermarket Chain',
        contactName: 'Suresh Gupta',
        email: 'suresh@metrosupermarket.com',
        phone: '+91-9876543213',
        productType: 'Compostable Shopping Bags',
        size: '12" x 15" x 4"',
        color: 'White with green handles',
        thickness: '30 microns',
        quantity: 50000,
        printing: true,
        printingColors: 2,
        logoUrl: '/uploads/metro-logo.png',
        timeline: '3 weeks',
        specialRequirements: 'Logo printing on both sides, reinforced bottom seal',
        status: 'QUOTED',
        quoteAmount: 225000.00,
        quoteCurrency: 'INR',
        quoteDate: new Date('2024-12-12'),
        notes: 'Premium quality bags with custom branding. Delivery in 3 batches.'
      }
    }),
    prisma.customOrder.create({
      data: {
        companyName: 'Fresh Foods Pvt Ltd',
        contactName: 'Meera Singh',
        email: 'meera@freshfoods.in',
        phone: '+91-9876543214',
        productType: 'Food Packaging Film',
        size: '200mm width x 500m length',
        color: 'Transparent',
        thickness: '25 microns',
        quantity: 1000,
        printing: false,
        printingColors: 0,
        timeline: '2 weeks',
        specialRequirements: 'Food grade certification required, heat sealable',
        status: 'IN_PRODUCTION',
        quoteAmount: 180000.00,
        quoteCurrency: 'INR',
        quoteDate: new Date('2024-12-05'),
        notes: 'Production started on 2024-12-15. Expected completion by 2024-12-28.'
      }
    }),
    prisma.customOrder.create({
      data: {
        companyName: 'Green Events Management',
        contactName: 'Kiran Reddy',
        email: 'kiran@greenevents.com',
        phone: '+91-9876543215',
        productType: 'Compostable Plates and Cutlery Set',
        size: 'Mixed sizes - 8" plates, standard cutlery',
        color: 'Natural',
        thickness: 'Standard',
        quantity: 25000,
        printing: true,
        printingColors: 1,
        logoUrl: '/uploads/green-events-logo.png',
        timeline: '10 days',
        specialRequirements: 'Event branding, eco-friendly packaging',
        status: 'COMPLETED',
        quoteAmount: 87500.00,
        quoteCurrency: 'INR',
        quoteDate: new Date('2024-11-25'),
        notes: 'Order completed and delivered on time. Customer very satisfied.'
      }
    })
  ])
  
  console.log(`✅ Created ${customOrders.length} custom orders`)

  // 7. Create Reviews (3 reviews)
  console.log('⭐ Creating reviews...')
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        productId: allProductsFinal[0].id, // PBAT Film Grade Resin
        name: 'Vikram Industries',
        email: 'contact@vikramindustries.com',
        company: 'Vikram Packaging Industries',
        title: 'Excellent Quality PBAT Resin',
        content: 'We have been using AICMT\'s PBAT film grade resin for the past 6 months. The quality is consistent and the biodegradation properties are exactly as specified. Our customers are very happy with the eco-friendly packaging.',
        rating: 5,
        status: 'APPROVED',
        isVerified: true,
        isFeatured: true,
        helpfulCount: 12,
        images: ['/reviews/vikram-review-1.jpg']
      }
    }),
    prisma.review.create({
      data: {
        productId: allProductsFinal.find(p => p.name.includes('Carry Bags'))?.id,
        name: 'Organic Mart',
        email: 'feedback@organicmart.in',
        company: 'Organic Mart Retail Chain',
        title: 'Perfect for Our Retail Stores',
        content: 'These compostable carry bags are perfect for our organic retail stores. They are strong, durable, and align perfectly with our sustainability goals. Customers appreciate the eco-friendly packaging.',
        rating: 4,
        status: 'APPROVED',
        isVerified: true,
        isFeatured: false,
        helpfulCount: 8,
        images: []
      }
    }),
    prisma.review.create({
      data: {
        productId: allProductsFinal.find(p => p.name.includes('Takeaway'))?.id,
        name: 'Cafe Green',
        email: 'owner@cafegreen.com',
        company: 'Cafe Green',
        title: 'Great for Food Service',
        content: 'We switched to these compostable takeaway containers 3 months ago. They work great for hot and cold foods, and our customers love that we\'re being environmentally responsible.',
        rating: 5,
        status: 'APPROVED',
        isVerified: false,
        isFeatured: true,
        helpfulCount: 15,
        images: ['/reviews/cafe-green-1.jpg', '/reviews/cafe-green-2.jpg']
      }
    })
  ])
  
  console.log(`✅ Created ${reviews.length} reviews`)

  // 8. Create Newsletter Subscriptions (3 subscriptions)
  console.log('📧 Creating newsletter subscriptions...')
  const newsletters = await Promise.all([
    prisma.newsletter.create({
      data: {
        email: 'sustainability@techcorp.com',
        isSubscribed: true,
        isActive: true,
        frequency: 'MONTHLY',
        categories: ['Industry News', 'Product Updates', 'Sustainability Tips'],
        language: 'en',
        source: 'website footer',
        emailsSent: 12,
        emailsOpened: 8,
        emailsClicked: 3
      }
    }),
    prisma.newsletter.create({
      data: {
        email: 'procurement@greenpack.in',
        isSubscribed: true,
        isActive: true,
        frequency: 'WEEKLY',
        categories: ['Product Updates', 'Pricing Updates'],
        language: 'en',
        source: 'contact form',
        emailsSent: 48,
        emailsOpened: 35,
        emailsClicked: 12
      }
    }),
    prisma.newsletter.create({
      data: {
        email: 'info@ecorestaurant.com',
        isSubscribed: false,
        isActive: false,
        frequency: 'MONTHLY',
        categories: ['Industry News'],
        language: 'en',
        source: 'popup',
        unsubscribedAt: new Date('2024-11-15'),
        emailsSent: 6,
        emailsOpened: 4,
        emailsClicked: 1
      }
    })
  ])
  
  console.log(`✅ Created ${newsletters.length} newsletter subscriptions`)

  // 9. Create Settings (3 settings)
  console.log('⚙️ Creating settings...')
  const settings = await Promise.all([
    prisma.setting.create({
      data: {
        key: 'company_info',
        value: {
          name: 'AICMT International',
          address: 'Plot No. 123, Industrial Area, Phase-II, Chandigarh - 160002',
          phone: '+91-172-4567890',
          email: 'info@aicmt.com',
          website: 'https://aicmt.com',
          gst: '03ABCDE1234F1Z5',
          cin: 'U25209CH2018PTC041234'
        },
        description: 'Company basic information and contact details',
        category: 'company',
        isPublic: true,
        isEditable: true
      }
    }),
    prisma.setting.create({
      data: {
        key: 'email_settings',
        value: {
          smtp_host: 'smtp.hostinger.com',
          smtp_port: 465,
          smtp_user: 'info@aicmt.com',
          from_name: 'AICMT International',
          reply_to: 'support@aicmt.com'
        },
        description: 'Email configuration settings',
        category: 'email',
        isPublic: false,
        isEditable: true
      }
    }),
    prisma.setting.create({
      data: {
        key: 'seo_settings',
        value: {
          site_title: 'AICMT International - Biodegradable Plastics Manufacturer',
          meta_description: 'Leading manufacturer of CPCB certified biodegradable and compostable plastics in India. Sustainable packaging solutions for businesses.',
          keywords: 'biodegradable plastics, compostable packaging, sustainable materials, PBAT, PLA, eco-friendly',
          google_analytics: 'G-XXXXXXXXXX',
          google_tag_manager: 'GTM-XXXXXXX'
        },
        description: 'SEO and analytics configuration',
        category: 'seo',
        isPublic: true,
        isEditable: true
      }
    })
  ])
  
  console.log(`✅ Created ${settings.length} settings`)

  // 10. Create Certifications (3 certifications)
  console.log('🏆 Creating certifications...')
  const certifications = await Promise.all([
    prisma.certification.create({
      data: {
        name: 'CPCB Authorization for Biodegradable Plastics',
        issuingBody: 'Central Pollution Control Board (CPCB)',
        description: 'Official authorization from CPCB for manufacturing and selling biodegradable plastic products in India.',
        certificateNumber: 'CPCB/BP/2023/001234',
        imageUrl: '/certifications/cpcb-certificate.jpg',
        documentUrl: '/certifications/cpcb-certificate.pdf',
        validFrom: new Date('2023-01-15'),
        validUntil: new Date('2026-01-14'),
        isActive: true,
        displayOrder: 1,
        isFeatured: true
      }
    }),
    prisma.certification.create({
      data: {
        name: 'IS/ISO 17088:2021 Compostability Certification',
        issuingBody: 'Bureau of Indian Standards (BIS)',
        description: 'Certification for compostability of plastic materials under composting conditions as per Indian Standard.',
        certificateNumber: 'BIS/ISO17088/2023/5678',
        imageUrl: '/certifications/iso-17088-certificate.jpg',
        documentUrl: '/certifications/iso-17088-certificate.pdf',
        validFrom: new Date('2023-03-20'),
        validUntil: new Date('2026-03-19'),
        isActive: true,
        displayOrder: 2,
        isFeatured: true
      }
    }),
    prisma.certification.create({
      data: {
        name: 'ASTM D6400 Biodegradability Certification',
        issuingBody: 'American Society for Testing and Materials',
        description: 'International certification for biodegradability of plastic materials in composting environments.',
        certificateNumber: 'ASTM/D6400/2023/9012',
        imageUrl: '/certifications/astm-d6400-certificate.jpg',
        documentUrl: '/certifications/astm-d6400-certificate.pdf',
        validFrom: new Date('2023-06-10'),
        validUntil: new Date('2026-06-09'),
        isActive: true,
        displayOrder: 3,
        isFeatured: false
      }
    })
  ])
  
  console.log(`✅ Created ${certifications.length} certifications`)

  // 11. Create Media files (3 media entries)
  console.log('📁 Creating media entries...')
  const mediaFiles = await Promise.all([
    prisma.media.create({
      data: {
        fileName: 'company-brochure-2024.pdf',
        filePath: '/media/documents/company-brochure-2024.pdf',
        fileType: 'pdf',
        fileSize: 2048576, // 2MB
        mimeType: 'application/pdf',
        altText: 'AICMT International Company Brochure 2024',
        caption: 'Complete product catalog and company information',
        description: 'Comprehensive brochure containing all product information, certifications, and company details',
        folder: 'documents',
        tags: ['brochure', 'catalog', 'company info'],
        category: 'DOCUMENT',
        uploadedById: users[0].id,
        usageCount: 45
      }
    }),
    prisma.media.create({
      data: {
        fileName: 'pbat-resin-hero.jpg',
        filePath: '/media/images/pbat-resin-hero.jpg',
        fileType: 'jpg',
        fileSize: 512000, // 500KB
        mimeType: 'image/jpeg',
        dimensions: '1920x1080',
        width: 1920,
        height: 1080,
        altText: 'PBAT Film Grade Resin Product Image',
        caption: 'High-quality PBAT resin granules',
        description: 'Hero image for PBAT film grade resin product page',
        folder: 'products',
        tags: ['PBAT', 'resin', 'product', 'hero'],
        category: 'PRODUCT_IMAGE',
        uploadedById: users[1].id,
        usageCount: 23
      }
    }),
    prisma.media.create({
      data: {
        fileName: 'manufacturing-process-video.mp4',
        filePath: '/media/videos/manufacturing-process-video.mp4',
        fileType: 'mp4',
        fileSize: 15728640, // 15MB
        mimeType: 'video/mp4',
        altText: 'AICMT Manufacturing Process Video',
        caption: 'Behind the scenes look at our manufacturing facility',
        description: 'Video showcasing the biodegradable plastic manufacturing process at AICMT facility',
        folder: 'videos',
        tags: ['manufacturing', 'process', 'facility', 'video'],
        category: 'VIDEO',
        uploadedById: users[0].id,
        usageCount: 67
      }
    })
  ])
  
  console.log(`✅ Created ${mediaFiles.length} media files`)

  // 12. Create Analytics entries (3 sample entries)
  console.log('📊 Creating analytics entries...')
  const analyticsEntries = await Promise.all([
    prisma.analytics.create({
      data: {
        date: new Date('2024-12-15'),
        pagePath: '/en/products/pbat-film-grade-resin',
        pageTitle: 'PBAT Film Grade Resin - Biodegradable Plastic Granules',
        visitorId: 'visitor_001',
        sessionId: 'session_001',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ipAddress: '203.192.12.34',
        country: 'India',
        city: 'Mumbai',
        device: 'Desktop',
        browser: 'Chrome',
        os: 'Windows',
        referrer: 'https://google.com',
        referrerDomain: 'google.com',
        utmSource: 'google',
        utmMedium: 'organic',
        timeOnPage: 245,
        bounceRate: 0.0,
        exitPage: false,
        events: [
          { type: 'page_view', timestamp: '2024-12-15T10:30:00Z' },
          { type: 'scroll', percentage: 75, timestamp: '2024-12-15T10:32:15Z' }
        ]
      }
    }),
    prisma.analytics.create({
      data: {
        date: new Date('2024-12-15'),
        pagePath: '/en/contact',
        pageTitle: 'Contact Us - AICMT International',
        visitorId: 'visitor_002',
        sessionId: 'session_002',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
        ipAddress: '157.48.23.67',
        country: 'India',
        city: 'Delhi',
        device: 'Mobile',
        browser: 'Safari',
        os: 'iOS',
        referrer: 'https://linkedin.com',
        referrerDomain: 'linkedin.com',
        utmSource: 'linkedin',
        utmMedium: 'social',
        timeOnPage: 180,
        bounceRate: 0.0,
        exitPage: false,
        events: [
          { type: 'page_view', timestamp: '2024-12-15T14:20:00Z' },
          { type: 'form_submit', form: 'contact', timestamp: '2024-12-15T14:23:00Z' }
        ]
      }
    }),
    prisma.analytics.create({
      data: {
        date: new Date('2024-12-15'),
        pagePath: '/en/blog/future-biodegradable-plastics-india',
        pageTitle: 'The Future of Biodegradable Plastics in India',
        visitorId: 'visitor_003',
        sessionId: 'session_003',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        ipAddress: '49.207.45.123',
        country: 'India',
        city: 'Bangalore',
        device: 'Desktop',
        browser: 'Chrome',
        os: 'macOS',
        referrer: 'https://twitter.com',
        referrerDomain: 'twitter.com',
        utmSource: 'twitter',
        utmMedium: 'social',
        utmCampaign: 'blog_promotion',
        timeOnPage: 420,
        bounceRate: 0.0,
        exitPage: true,
        events: [
          { type: 'page_view', timestamp: '2024-12-15T16:45:00Z' },
          { type: 'scroll', percentage: 100, timestamp: '2024-12-15T16:52:00Z' },
          { type: 'share', platform: 'twitter', timestamp: '2024-12-15T16:52:30Z' }
        ]
      }
    })
  ])
  
  console.log(`✅ Created ${analyticsEntries.length} analytics entries`)

  console.log('\n🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`👥 Users: ${users.length}`)
  console.log(`📦 Products: ${allProductsFinal.length}`)
  console.log(`🖼️ Product Images: ${productImages.length}`)
  console.log(`📝 Blog Posts: ${allBlogPosts.length}`)
  console.log(`📞 Inquiries: ${inquiries.length}`)
  console.log(`🛒 Custom Orders: ${customOrders.length}`)
  console.log(`⭐ Reviews: ${reviews.length}`)
  console.log(`📧 Newsletter Subscriptions: ${newsletters.length}`)
  console.log(`⚙️ Settings: ${settings.length}`)
  console.log(`🏆 Certifications: ${certifications.length}`)
  console.log(`📁 Media Files: ${mediaFiles.length}`)
  console.log(`📊 Analytics Entries: ${analyticsEntries.length}`)

  return {
    users,
    products: allProductsFinal,
    productImages,
    blogPosts: allBlogPosts,
    inquiries,
    customOrders,
    reviews,
    newsletters,
    settings,
    certifications,
    mediaFiles,
    analyticsEntries
  }
}