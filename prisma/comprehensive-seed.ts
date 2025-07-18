import { PrismaClient } from '@prisma/client'
import { 
  UserRole, 
  UserStatus, 
  ProductCategory, 
  ProductStatus, 
  StockStatus,
  BlogStatus,
  InquiryType,
  InquiryStatus,
  InquiryPriority,
  MediaCategory,
  ReviewStatus,
  NewsletterFrequency,
  CustomOrderStatus
} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting comprehensive database seeding...')

  // Clear existing data
  console.log('🧹 Cleaning existing data...')
  await prisma.productImage.deleteMany()
  await prisma.review.deleteMany()
  await prisma.inquiry.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.product.deleteMany()
  await prisma.media.deleteMany()
  await prisma.newsletter.deleteMany()
  await prisma.customOrder.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.analytics.deleteMany()
  await prisma.setting.deleteMany()
  await prisma.user.deleteMany()

  // 1. Create Users
  console.log('👥 Creating users...')
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@aicmt.com',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+91-9876543210',
      company: 'AICMT International',
      position: 'Administrator',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      language: 'en',
      timezone: 'Asia/Kolkata'
    }
  })

  const editorUser = await prisma.user.create({
    data: {
      email: 'editor@aicmt.com',
      firstName: 'Content',
      lastName: 'Editor',
      phone: '+91-9876543211',
      company: 'AICMT International',
      position: 'Content Manager',
      role: UserRole.EDITOR,
      status: UserStatus.ACTIVE,
      language: 'en',
      timezone: 'Asia/Kolkata'
    }
  })

  // 2. Create Products (15 products)
  console.log('📦 Creating 15 products...')
  const products = [
    {
      name: 'PBAT Film Grade Resin',
      slug: 'pbat-film-grade-resin',
      code: 'PBAT-F001',
      description: 'High-quality PBAT (Polybutylene Adipate Terephthalate) resin specifically formulated for film applications. Offers excellent biodegradability and mechanical properties suitable for packaging films.',
      category: ProductCategory.GRANULES,
      features: ['100% biodegradable', 'Excellent film forming properties', 'High tensile strength', 'Compatible with existing processing equipment'],
      specifications: {
        meltFlowIndex: '2.5-3.5 g/10min',
        density: '1.25-1.27 g/cm³',
        tensileStrength: '≥ 20 MPa',
        elongationAtBreak: '≥ 500%'
      },
      price: 185.50,
      currency: 'INR',
      primaryImage: '/products/pbat-resin.jpg',
      seoTitle: 'PBAT Film Grade Resin - Biodegradable Plastic Granules',
      seoDescription: 'Premium PBAT resin for biodegradable film production. CPCB certified, excellent mechanical properties.',
      seoKeywords: ['PBAT', 'biodegradable resin', 'film grade', 'plastic granules'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: true,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 500
    },
    {
      name: 'PLA Injection Molding Grade',
      slug: 'pla-injection-molding-grade',
      code: 'PLA-IM002',
      description: 'Premium PLA (Polylactic Acid) granules designed for injection molding applications. Perfect for creating biodegradable containers, cutlery, and packaging components.',
      category: ProductCategory.GRANULES,
      features: ['Plant-based polymer', 'Excellent moldability', 'Food-safe grade', 'Compostable in industrial facilities'],
      specifications: {
        meltFlowIndex: '6-8 g/10min',
        density: '1.24 g/cm³',
        tensileStrength: '≥ 50 MPa',
        heatDeflectionTemp: '55°C'
      },
      price: 165.00,
      currency: 'INR',
      primaryImage: '/products/pla-granules.jpg',
      seoTitle: 'PLA Injection Molding Grade - Biodegradable Plastic Granules',
      seoDescription: 'High-quality PLA granules for injection molding. Food-safe, compostable plastic material.',
      seoKeywords: ['PLA', 'injection molding', 'biodegradable', 'food safe'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: true,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 750
    },
    {
      name: 'Compostable Carry Bags - Small',
      slug: 'compostable-carry-bags-small',
      code: 'CCB-S003',
      description: 'Eco-friendly carry bags made from certified compostable materials. Perfect for retail stores, grocery shops, and environmentally conscious businesses.',
      category: ProductCategory.BAGS,
      features: ['100% compostable', 'Meets IS/ISO 17088 standards', 'High load capacity', 'Custom printing available'],
      specifications: {
        size: '8" × 12"',
        thickness: '25 microns',
        loadCapacity: 'Up to 2 kg',
        biodegradationTime: '180 days in composting conditions'
      },
      price: 2.50,
      currency: 'INR',
      primaryImage: '/products/carry-bags-small.jpg',
      seoTitle: 'Compostable Carry Bags Small Size - Eco-Friendly Shopping Bags',
      seoDescription: 'Certified compostable carry bags for retail use. Biodegradable shopping bags with custom printing.',
      seoKeywords: ['compostable bags', 'carry bags', 'biodegradable', 'retail bags'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: true,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 10000
    },
    {
      name: 'Biodegradable Food Containers',
      slug: 'biodegradable-food-containers',
      code: 'BFC-M004',
      description: 'Microwave-safe biodegradable food containers perfect for takeaway restaurants, food delivery services, and catering businesses.',
      category: ProductCategory.PACKAGING,
      features: ['Microwave safe', 'Oil and grease resistant', 'Stackable design', 'Leak-proof'],
      specifications: {
        capacity: '500ml',
        dimensions: '15cm × 12cm × 5cm',
        temperature: 'Up to 100°C',
        material: 'PLA + Natural fiber blend'
      },
      price: 8.75,
      currency: 'INR',
      primaryImage: '/products/food-containers.jpg',
      seoTitle: 'Biodegradable Food Containers - Eco-Friendly Takeaway Boxes',
      seoDescription: 'Microwave-safe biodegradable food containers for restaurants and food delivery.',
      seoKeywords: ['food containers', 'biodegradable', 'takeaway', 'microwave safe'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 5000
    },
    {
      name: 'Compostable Mulch Film',
      slug: 'compostable-mulch-film',
      code: 'CMF-A005',
      description: 'Agricultural mulch film that biodegrades naturally in soil. Helps retain moisture, suppress weeds, and improve crop yield while being environmentally friendly.',
      category: ProductCategory.FILMS,
      features: ['Soil biodegradable', 'UV stabilized', 'Moisture retention', 'Weed suppression'],
      specifications: {
        thickness: '12-15 microns',
        width: '1.2m',
        length: '500m per roll',
        biodegradation: '6-12 months in soil'
      },
      price: 450.00,
      currency: 'INR',
      primaryImage: '/products/mulch-film.jpg',
      seoTitle: 'Compostable Mulch Film - Biodegradable Agricultural Film',
      seoDescription: 'Soil-biodegradable mulch film for sustainable agriculture. UV stabilized, moisture retaining.',
      seoKeywords: ['mulch film', 'agricultural film', 'biodegradable', 'farming'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 200
    }
  ]

  // Continue with more products to reach 15 total
  const moreProducts = [
    {
      name: 'Biodegradable Cutlery Set',
      slug: 'biodegradable-cutlery-set',
      code: 'BCS-006',
      description: 'Complete cutlery set made from plant-based materials. Includes spoons, forks, and knives perfect for events, parties, and food service.',
      category: ProductCategory.PACKAGING,
      features: ['Plant-based material', 'Heat resistant', 'Smooth finish', 'Compostable'],
      specifications: {
        material: 'PLA + Cornstarch',
        heatResistance: 'Up to 85°C',
        setContents: '10 spoons, 10 forks, 10 knives',
        compostingTime: '90-180 days'
      },
      price: 45.00,
      currency: 'INR',
      primaryImage: '/products/cutlery-set.jpg',
      seoTitle: 'Biodegradable Cutlery Set - Eco-Friendly Disposable Utensils',
      seoDescription: 'Plant-based biodegradable cutlery set for events and food service. Compostable utensils.',
      seoKeywords: ['biodegradable cutlery', 'eco utensils', 'compostable', 'disposable'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 1500
    },
    {
      name: 'Compostable Garbage Bags',
      slug: 'compostable-garbage-bags',
      code: 'CGB-007',
      description: 'Strong and reliable compostable garbage bags for household and commercial use. Made from certified biodegradable materials.',
      category: ProductCategory.BAGS,
      features: ['Tear resistant', 'Leak proof', 'Odor control', 'Certified compostable'],
      specifications: {
        size: '19" × 21"',
        thickness: '18 microns',
        capacity: '30 liters',
        packSize: '30 bags per pack'
      },
      price: 125.00,
      currency: 'INR',
      primaryImage: '/products/garbage-bags.jpg',
      seoTitle: 'Compostable Garbage Bags - Biodegradable Waste Bags',
      seoDescription: 'Strong compostable garbage bags for eco-friendly waste management. Leak-proof and tear-resistant.',
      seoKeywords: ['garbage bags', 'compostable', 'waste bags', 'biodegradable'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 800
    },
    {
      name: 'PHA Blown Film Grade',
      slug: 'pha-blown-film-grade',
      code: 'PHA-BF008',
      description: 'Polyhydroxyalkanoate (PHA) resin specifically designed for blown film applications. Marine biodegradable and suitable for flexible packaging.',
      category: ProductCategory.GRANULES,
      features: ['Marine biodegradable', 'Excellent barrier properties', 'Heat sealable', 'FDA approved'],
      specifications: {
        meltFlowIndex: '1.5-2.5 g/10min',
        density: '1.24 g/cm³',
        tensileStrength: '≥ 25 MPa',
        oxygenPermeability: 'Low'
      },
      price: 295.00,
      currency: 'INR',
      primaryImage: '/products/pha-resin.jpg',
      seoTitle: 'PHA Blown Film Grade - Marine Biodegradable Plastic Resin',
      seoDescription: 'Premium PHA resin for blown film applications. Marine biodegradable with excellent barrier properties.',
      seoKeywords: ['PHA', 'blown film', 'marine biodegradable', 'barrier film'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: true,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 300
    },
    {
      name: 'Biodegradable Straws',
      slug: 'biodegradable-straws',
      code: 'BS-009',
      description: 'Eco-friendly drinking straws made from plant-based materials. Perfect replacement for plastic straws in restaurants and cafes.',
      category: ProductCategory.PACKAGING,
      features: ['Plant-based material', 'Durable and flexible', 'Various colors available', 'Compostable'],
      specifications: {
        length: '20cm',
        diameter: '6mm',
        material: 'PLA + Natural fibers',
        packSize: '200 pieces per pack'
      },
      price: 85.00,
      currency: 'INR',
      primaryImage: '/products/biodegradable-straws.jpg',
      seoTitle: 'Biodegradable Straws - Eco-Friendly Drinking Straws',
      seoDescription: 'Plant-based biodegradable straws for restaurants and cafes. Compostable alternative to plastic straws.',
      seoKeywords: ['biodegradable straws', 'eco straws', 'plant-based', 'compostable'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 2000
    },
    {
      name: 'Compostable Plates',
      slug: 'compostable-plates',
      code: 'CP-010',
      description: 'Sturdy compostable plates made from sugarcane bagasse and plant fibers. Microwave safe and perfect for events and food service.',
      category: ProductCategory.PACKAGING,
      features: ['Sugarcane bagasse', 'Microwave safe', 'Oil resistant', 'Compostable'],
      specifications: {
        diameter: '23cm',
        thickness: '2mm',
        material: 'Bagasse + Plant fiber',
        packSize: '50 pieces per pack'
      },
      price: 95.00,
      currency: 'INR',
      primaryImage: '/products/compostable-plates.jpg',
      seoTitle: 'Compostable Plates - Biodegradable Disposable Plates',
      seoDescription: 'Sturdy compostable plates made from sugarcane bagasse. Microwave safe and oil resistant.',
      seoKeywords: ['compostable plates', 'bagasse plates', 'biodegradable', 'disposable plates'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 1200
    },
    {
      name: 'Biodegradable Bubble Wrap',
      slug: 'biodegradable-bubble-wrap',
      code: 'BBW-011',
      description: 'Eco-friendly bubble wrap made from biodegradable materials. Provides excellent protection for shipping and packaging.',
      category: ProductCategory.PACKAGING,
      features: ['Biodegradable material', 'Excellent cushioning', 'Tear resistant', 'Recyclable'],
      specifications: {
        bubbleSize: '10mm',
        thickness: '3mm',
        width: '1m',
        length: '100m per roll'
      },
      price: 350.00,
      currency: 'INR',
      primaryImage: '/products/bubble-wrap.jpg',
      seoTitle: 'Biodegradable Bubble Wrap - Eco-Friendly Packaging Material',
      seoDescription: 'Biodegradable bubble wrap for eco-friendly shipping and packaging protection.',
      seoKeywords: ['biodegradable bubble wrap', 'eco packaging', 'shipping material', 'protective packaging'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 150
    },
    {
      name: 'Compostable Shopping Bags - Large',
      slug: 'compostable-shopping-bags-large',
      code: 'CSB-L012',
      description: 'Large compostable shopping bags perfect for grocery stores and supermarkets. Strong handles and high load capacity.',
      category: ProductCategory.BAGS,
      features: ['High load capacity', 'Reinforced handles', 'Compostable', 'Custom printing available'],
      specifications: {
        size: '15" × 18" × 6"',
        thickness: '30 microns',
        loadCapacity: 'Up to 8 kg',
        handleType: 'Loop handles'
      },
      price: 4.50,
      currency: 'INR',
      primaryImage: '/products/shopping-bags-large.jpg',
      seoTitle: 'Compostable Shopping Bags Large - Eco-Friendly Grocery Bags',
      seoDescription: 'Large compostable shopping bags for grocery stores. High load capacity with reinforced handles.',
      seoKeywords: ['shopping bags', 'compostable bags', 'grocery bags', 'large bags'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 5000
    },
    {
      name: 'Biodegradable Seed Trays',
      slug: 'biodegradable-seed-trays',
      code: 'BST-013',
      description: 'Biodegradable seed starting trays for nurseries and gardening. Can be planted directly in soil where they decompose naturally.',
      category: ProductCategory.CUSTOM,
      features: ['Direct planting', 'Root-friendly', 'Moisture retaining', 'Soil biodegradable'],
      specifications: {
        cells: '72 cells per tray',
        cellSize: '3cm × 3cm',
        material: 'Peat + Biodegradable binder',
        biodegradation: '2-4 weeks in soil'
      },
      price: 25.00,
      currency: 'INR',
      primaryImage: '/products/seed-trays.jpg',
      seoTitle: 'Biodegradable Seed Trays - Eco-Friendly Plant Starting Trays',
      seoDescription: 'Biodegradable seed trays for direct planting. Root-friendly and soil biodegradable.',
      seoKeywords: ['seed trays', 'biodegradable', 'plant starting', 'nursery supplies'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 800
    },
    {
      name: 'Compostable Food Wrap Film',
      slug: 'compostable-food-wrap-film',
      code: 'CFWF-014',
      description: 'Transparent compostable film for food wrapping and preservation. Excellent cling properties and food safety.',
      category: ProductCategory.FILMS,
      features: ['Food grade', 'Excellent cling', 'Moisture barrier', 'Compostable'],
      specifications: {
        thickness: '12 microns',
        width: '30cm',
        length: '300m per roll',
        transparency: 'High clarity'
      },
      price: 180.00,
      currency: 'INR',
      primaryImage: '/products/food-wrap-film.jpg',
      seoTitle: 'Compostable Food Wrap Film - Biodegradable Cling Film',
      seoDescription: 'Food-grade compostable wrap film with excellent cling properties for food preservation.',
      seoKeywords: ['food wrap', 'compostable film', 'cling film', 'food packaging'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 400
    },
    {
      name: 'Biodegradable Nursery Pots',
      slug: 'biodegradable-nursery-pots',
      code: 'BNP-015',
      description: 'Biodegradable plant pots perfect for nurseries and home gardening. Can be planted directly without transplant shock.',
      category: ProductCategory.CUSTOM,
      features: ['Direct planting', 'No transplant shock', 'Root penetrable', 'Soil biodegradable'],
      specifications: {
        diameter: '10cm',
        height: '8cm',
        material: 'Coconut coir + Biodegradable binder',
        biodegradation: '3-6 months in soil'
      },
      price: 15.00,
      currency: 'INR',
      primaryImage: '/products/nursery-pots.jpg',
      seoTitle: 'Biodegradable Nursery Pots - Eco-Friendly Plant Pots',
      seoDescription: 'Biodegradable plant pots for direct planting. Made from coconut coir, no transplant shock.',
      seoKeywords: ['nursery pots', 'biodegradable pots', 'plant pots', 'gardening supplies'],
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
      stockCount: 1000
    }
  ]

  // Create all products
  const allProducts = [...products, ...moreProducts]
  const createdProducts = []

  for (const productData of allProducts) {
    const product = await prisma.product.create({
      data: productData
    })
    createdProducts.push(product)
  }

  console.log(`✅ Created ${createdProducts.length} products`)

  // 3. Create Blog Posts (8 blog posts)
  console.log('📝 Creating 8 blog posts...')
  const blogPosts = [
    {
      title: 'The Future of Biodegradable Plastics in India',
      slug: 'future-biodegradable-plastics-india',
      content: `<h2>Introduction</h2>
      <p>India is making significant strides in adopting biodegradable plastics as an alternative to conventional plastics. With the government's push for a cleaner environment and the growing awareness among consumers, the biodegradable plastics industry is poised for substantial growth.</p>
      
      <h2>Government Initiatives</h2>
      <p>The Indian government has implemented several policies to promote the use of biodegradable materials:</p>
      <ul>
        <li>Plastic Waste Management Rules 2016</li>
        <li>Single-use plastic ban in major cities</li>
        <li>Incentives for biodegradable plastic manufacturers</li>
      </ul>
      
      <h2>Market Opportunities</h2>
      <p>The biodegradable plastics market in India is expected to grow at a CAGR of 15% over the next five years, driven by increasing environmental awareness and regulatory support.</p>`,
      excerpt: 'Exploring how biodegradable plastics are transforming India\'s approach to sustainability and environmental protection.',
      authorId: adminUser.id,
      category: 'Industry Trends',
      tags: ['biodegradable', 'sustainability', 'india', 'plastic ban'],
      status: BlogStatus.PUBLISHED,
      isPublished: true,
      isFeatured: true,
      featuredImage: '/blog/biodegradable-future.jpg',
      seoTitle: 'The Future of Biodegradable Plastics in India | AICMT International',
      seoDescription: 'Discover the growing opportunities in India\'s biodegradable plastics market and government initiatives.',
      seoKeywords: ['biodegradable plastics India', 'sustainable packaging', 'plastic ban'],
      publishedAt: new Date('2024-01-15'),
      views: 1245
    },
    {
      title: 'Understanding PBAT: The Versatile Biodegradable Polymer',
      slug: 'understanding-pbat-biodegradable-polymer',
      content: `<h2>What is PBAT?</h2>
      <p>PBAT (Polybutylene Adipate Terephthalate) is a biodegradable copolyester that combines excellent mechanical properties with complete biodegradability. It's becoming increasingly popular in packaging applications.</p>
      
      <h2>Key Properties</h2>
      <ul>
        <li>Excellent flexibility and toughness</li>
        <li>Good processability on conventional equipment</li>
        <li>Complete biodegradation in composting conditions</li>
        <li>Compatible with other biodegradable polymers</li>
      </ul>
      
      <h2>Applications</h2>
      <p>PBAT is widely used in:</p>
      <ul>
        <li>Shopping bags and carry bags</li>
        <li>Food packaging films</li>
        <li>Agricultural mulch films</li>
        <li>Compost bags</li>
      </ul>`,
      excerpt: 'A comprehensive guide to PBAT polymer, its properties, and applications in biodegradable packaging.',
      authorId: editorUser.id,
      category: 'Technical',
      tags: ['PBAT', 'polymer science', 'biodegradable materials'],
      status: BlogStatus.PUBLISHED,
      isPublished: true,
      isFeatured: true,
      featuredImage: '/blog/pbat-polymer.jpg',
      seoTitle: 'Understanding PBAT Polymer | Biodegradable Plastic Technology',
      seoDescription: 'Learn about PBAT polymer properties, applications, and benefits in biodegradable packaging.',
      seoKeywords: ['PBAT polymer', 'biodegradable plastic', 'sustainable packaging'],
      publishedAt: new Date('2024-02-01'),
      views: 876
    }
  ]

  // Create more blog posts to reach 8 total
  const moreBlogPosts = [
    {
      title: 'Composting 101: How Biodegradable Plastics Break Down',
      slug: 'composting-biodegradable-plastics-breakdown',
      content: `<h2>The Composting Process</h2>
      <p>Understanding how biodegradable plastics decompose is crucial for proper waste management and environmental protection.</p>
      
      <h2>Industrial vs Home Composting</h2>
      <p>Different biodegradable materials require different composting conditions for proper breakdown. Industrial composting facilities maintain higher temperatures and controlled conditions.</p>
      
      <h2>Timeline for Biodegradation</h2>
      <p>Most certified biodegradable plastics break down within 90-180 days in industrial composting facilities.</p>`,
      excerpt: 'Learn how biodegradable plastics decompose and the difference between industrial and home composting.',
      authorId: editorUser.id,
      category: 'Education',
      tags: ['composting', 'biodegradation', 'waste management'],
      status: BlogStatus.PUBLISHED,
      isPublished: true,
      isFeatured: false,
      featuredImage: '/blog/composting-process.jpg',
      seoTitle: 'Composting Biodegradable Plastics | Complete Guide',
      seoDescription: 'Understanding the composting process for biodegradable plastics and proper disposal methods.',
      seoKeywords: ['composting', 'biodegradable plastics', 'waste management'],
      publishedAt: new Date('2024-02-15'),
      views: 543
    },
    {
      title: 'PLA vs PBAT: Choosing the Right Biodegradable Plastic',
      slug: 'pla-vs-pbat-choosing-biodegradable-plastic',
      content: `<h2>Introduction to PLA and PBAT</h2>
      <p>Both PLA and PBAT are popular biodegradable plastics, but they have different properties and applications.</p>
      
      <h2>PLA (Polylactic Acid)</h2>
      <ul>
        <li>Plant-based polymer from corn starch</li>
        <li>Rigid and strong</li>
        <li>Good for injection molding</li>
        <li>Requires industrial composting</li>
      </ul>
      
      <h2>PBAT (Polybutylene Adipate Terephthalate)</h2>
      <ul>
        <li>Flexible and tough</li>
        <li>Excellent for films and bags</li>
        <li>Better processability</li>
        <li>Faster biodegradation</li>
      </ul>`,
      excerpt: 'Compare PLA and PBAT biodegradable plastics to choose the right material for your application.',
      authorId: adminUser.id,
      category: 'Technical',
      tags: ['PLA', 'PBAT', 'comparison', 'material selection'],
      status: BlogStatus.PUBLISHED,
      isPublished: true,
      isFeatured: true,
      featuredImage: '/blog/pla-vs-pbat.jpg',
      seoTitle: 'PLA vs PBAT Comparison | Biodegradable Plastic Guide',
      seoDescription: 'Detailed comparison of PLA and PBAT biodegradable plastics for material selection.',
      seoKeywords: ['PLA vs PBAT', 'biodegradable plastic comparison', 'material selection'],
      publishedAt: new Date('2024-03-01'),
      views: 892
    },
    {
      title: 'Sustainable Packaging Solutions for Food Industry',
      slug: 'sustainable-packaging-food-industry',
      content: `<h2>The Need for Sustainable Food Packaging</h2>
      <p>The food industry is rapidly adopting sustainable packaging solutions to reduce environmental impact and meet consumer demands.</p>
      
      <h2>Key Requirements</h2>
      <ul>
        <li>Food safety and hygiene</li>
        <li>Barrier properties for freshness</li>
        <li>Temperature resistance</li>
        <li>Biodegradability</li>
      </ul>
      
      <h2>Our Solutions</h2>
      <p>AICMT International offers a complete range of food-grade biodegradable packaging materials.</p>`,
      excerpt: 'Discover sustainable packaging solutions specifically designed for the food industry.',
      authorId: editorUser.id,
      category: 'Industry Solutions',
      tags: ['food packaging', 'sustainable packaging', 'food safety'],
      status: BlogStatus.PUBLISHED,
      isPublished: true,
      isFeatured: false,
      featuredImage: '/blog/food-packaging.jpg',
      seoTitle: 'Sustainable Food Packaging Solutions | AICMT International',
      seoDescription: 'Explore biodegradable packaging solutions for the food industry with food safety compliance.',
      seoKeywords: ['sustainable food packaging', 'biodegradable food containers', 'food safety'],
      publishedAt: new Date('2024-03-15'),
      views: 678
    },
    {
      title: 'Agricultural Applications of Biodegradable Plastics',
      slug: 'agricultural-applications-biodegradable-plastics',
      content: `<h2>Revolutionizing Agriculture</h2>
      <p>Biodegradable plastics are transforming agricultural practices by providing sustainable solutions for farming needs.</p>
      
      <h2>Mulch Films</h2>
      <p>Our biodegradable mulch films help farmers improve crop yield while eliminating plastic waste in soil.</p>
      
      <h2>Seed Trays and Pots</h2>
      <p>Biodegradable seed trays and pots can be planted directly, reducing transplant shock and labor costs.</p>`,
      excerpt: 'Explore how biodegradable plastics are revolutionizing agricultural practices and sustainability.',
      authorId: adminUser.id,
      category: 'Agriculture',
      tags: ['agriculture', 'mulch film', 'sustainable farming'],
      status: BlogStatus.PUBLISHED,
      isPublished: true,
      isFeatured: false,
      featuredImage: '/blog/agriculture-applications.jpg',
      seoTitle: 'Agricultural Applications of Biodegradable Plastics',
      seoDescription: 'Learn how biodegradable plastics are transforming agriculture with sustainable farming solutions.',
      seoKeywords: ['agricultural biodegradable plastics', 'mulch film', 'sustainable farming'],
      publishedAt: new Date('2024-04-01'),
      views: 456
    },
    {
      title: 'Certification Standards for Biodegradable Plastics',
      slug: 'certification-standards-biodegradable-plastics',
      content: `<h2>Understanding Certification Standards</h2>
      <p>Various international and national standards ensure the quality and biodegradability of plastic products.</p>
      
      <h2>Key Standards</h2>
      <ul>
        <li>ASTM D6400 (USA)</li>
        <li>EN 13432 (Europe)</li>
        <li>IS/ISO 17088 (India)</li>
        <li>CPCB Guidelines (India)</li>
      </ul>
      
      <h2>Our Certifications</h2>
      <p>All AICMT International products are certified to meet the highest international standards.</p>`,
      excerpt: 'Understanding the certification standards that ensure quality and biodegradability of plastic products.',
      authorId: editorUser.id,
      category: 'Standards & Compliance',
      tags: ['certification', 'standards', 'compliance', 'quality'],
      status: BlogStatus.PUBLISHED,
      isPublished: true,
      isFeatured: false,
      featuredImage: '/blog/certification-standards.jpg',
      seoTitle: 'Biodegradable Plastic Certification Standards | Complete Guide',
      seoDescription: 'Learn about international certification standards for biodegradable plastics and compliance requirements.',
      seoKeywords: ['biodegradable plastic standards', 'ASTM D6400', 'EN 13432', 'CPCB certification'],
      publishedAt: new Date('2024-04-15'),
      views: 734
    },
    {
      title: 'The Economics of Switching to Biodegradable Plastics',
      slug: 'economics-switching-biodegradable-plastics',
      content: `<h2>Cost-Benefit Analysis</h2>
      <p>While biodegradable plastics may have higher upfront costs, the long-term benefits often outweigh the initial investment.</p>
      
      <h2>Benefits</h2>
      <ul>
        <li>Reduced waste management costs</li>
        <li>Brand reputation enhancement</li>
        <li>Compliance with regulations</li>
        <li>Consumer preference advantage</li>
      </ul>
      
      <h2>ROI Considerations</h2>
      <p>Companies typically see positive ROI within 2-3 years of switching to biodegradable alternatives.</p>`,
      excerpt: 'Analyze the economic benefits and ROI of switching from conventional to biodegradable plastics.',
      authorId: adminUser.id,
      category: 'Business',
      tags: ['economics', 'ROI', 'cost analysis', 'business benefits'],
      status: BlogStatus.PUBLISHED,
      isPublished: true,
      isFeatured: false,
      featuredImage: '/blog/economics-biodegradable.jpg',
      seoTitle: 'Economics of Biodegradable Plastics | Cost-Benefit Analysis',
      seoDescription: 'Understand the economic benefits and ROI of switching to biodegradable plastic alternatives.',
      seoKeywords: ['biodegradable plastic economics', 'cost benefit analysis', 'ROI biodegradable'],
      publishedAt: new Date('2024-05-01'),
      views: 612
    }
  ]

  const allBlogPosts = [...blogPosts, ...moreBlogPosts]
  const createdBlogPosts = []

  for (const blogData of allBlogPosts) {
    const blog = await prisma.blogPost.create({
      data: blogData
    })
    createdBlogPosts.push(blog)
  }

  console.log(`✅ Created ${createdBlogPosts.length} blog posts`)

  // 4. Create Inquiries
  console.log('📞 Creating inquiries...')
  const inquiries = [
    {
      name: 'Rajesh Kumar',
      email: 'rajesh@greenpackaging.com',
      phone: '+91-9876543210',
      company: 'Green Packaging Solutions',
      message: 'We are interested in bulk purchase of PBAT film grade resin for our packaging operations. Please provide pricing for 10 tons monthly requirement.',
      inquiryType: InquiryType.QUOTE_REQUEST,
      productId: createdProducts[0].id,
      status: InquiryStatus.NEW,
      priority: InquiryPriority.HIGH,
      source: 'website'
    },
    {
      name: 'Priya Sharma',
      email: 'priya@ecoretail.in',
      phone: '+91-9876543211',
      company: 'Eco Retail Chain',
      message: 'Looking for compostable carry bags for our retail stores. Need samples and bulk pricing information.',
      inquiryType: InquiryType.SAMPLE_REQUEST,
      productId: createdProducts[2].id,
      status: InquiryStatus.IN_PROGRESS,
      priority: InquiryPriority.MEDIUM,
      source: 'website'
    }
  ]

  for (const inquiryData of inquiries) {
    await prisma.inquiry.create({
      data: inquiryData
    })
  }

  console.log(`✅ Created ${inquiries.length} inquiries`)

  // 5. Create Custom Orders
  console.log('🛍️ Creating custom orders...')
  const customOrders = [
    {
      companyName: 'Fresh Foods Ltd',
      contactName: 'Amit Patel',
      email: 'amit@freshfoods.com',
      phone: '+91-9876543212',
      productType: 'Food Containers',
      size: '750ml',
      color: 'Natural',
      thickness: '1.2mm',
      quantity: 50000,
      printing: true,
      printingColors: 2,
      timeline: '4 weeks',
      specialRequirements: 'Logo printing on lid, microwave safe certification required',
      status: CustomOrderStatus.QUOTED,
      quoteAmount: 275000.00,
      quoteCurrency: 'INR',
      quoteDate: new Date('2024-03-01')
    }
  ]

  for (const orderData of customOrders) {
    await prisma.customOrder.create({
      data: orderData
    })
  }

  console.log(`✅ Created ${customOrders.length} custom orders`)

  // 6. Create Certifications
  console.log('🏆 Creating certifications...')
  const certifications = [
    {
      name: 'CPCB Certification',
      issuingBody: 'Central Pollution Control Board',
      description: 'Certification for biodegradable plastic products as per Indian standards',
      certificateNumber: 'CPCB/BP/2023/001',
      imageUrl: '/certifications/cpcb-cert.jpg',
      validFrom: new Date('2023-01-01'),
      validUntil: new Date('2026-01-01'),
      isActive: true,
      isFeatured: true,
      displayOrder: 1
    },
    {
      name: 'ISO 17088 Certification',
      issuingBody: 'International Organization for Standardization',
      description: 'International standard for biodegradable plastics',
      certificateNumber: 'ISO17088/2023/AICMT',
      imageUrl: '/certifications/iso-cert.jpg',
      validFrom: new Date('2023-06-01'),
      validUntil: new Date('2026-06-01'),
      isActive: true,
      isFeatured: true,
      displayOrder: 2
    }
  ]

  for (const certData of certifications) {
    await prisma.certification.create({
      data: certData
    })
  }

  console.log(`✅ Created ${certifications.length} certifications`)

  // 7. Create Newsletter Subscriptions
  console.log('📧 Creating newsletter subscriptions...')
  const newsletters = [
    {
      email: 'subscriber1@example.com',
      isSubscribed: true,
      frequency: NewsletterFrequency.MONTHLY,
      categories: ['Industry News', 'Product Updates'],
      language: 'en',
      source: 'footer'
    },
    {
      email: 'subscriber2@example.com',
      isSubscribed: true,
      frequency: NewsletterFrequency.WEEKLY,
      categories: ['Technical Articles'],
      language: 'en',
      source: 'popup'
    }
  ]

  for (const newsletterData of newsletters) {
    await prisma.newsletter.create({
      data: newsletterData
    })
  }

  console.log(`✅ Created ${newsletters.length} newsletter subscriptions`)

  // 8. Create Settings
  console.log('⚙️ Creating system settings...')
  const settings = [
    {
      key: 'site_title',
      value: 'AICMT International - Biodegradable Plastics Manufacturer',
      description: 'Main site title',
      category: 'general',
      isPublic: true
    },
    {
      key: 'contact_email',
      value: 'info@aicmt.com',
      description: 'Primary contact email',
      category: 'contact',
      isPublic: true
    },
    {
      key: 'contact_phone',
      value: '+91-9876543210',
      description: 'Primary contact phone',
      category: 'contact',
      isPublic: true
    }
  ]

  for (const settingData of settings) {
    await prisma.setting.create({
      data: settingData
    })
  }

  console.log(`✅ Created ${settings.length} settings`)

  console.log('🎉 Database seeding completed successfully!')
  console.log(`
  📊 Summary:
  - Users: 2
  - Products: ${createdProducts.length}
  - Blog Posts: ${createdBlogPosts.length}
  - Inquiries: ${inquiries.length}
  - Custom Orders: ${customOrders.length}
  - Certifications: ${certifications.length}
  - Newsletter Subscriptions: ${newsletters.length}
  - Settings: ${settings.length}
  `)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })