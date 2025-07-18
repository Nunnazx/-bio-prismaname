import { PrismaClient, UserRole, ProductCategory, ProductStatus, StockStatus, BlogStatus, InquiryType, InquiryStatus, InquiryPriority } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')
  
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aicmt.com' },
    update: {},
    create: {
      email: 'admin@aicmt.com',
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      phone: '+919876543210',
      company: 'AICMT International',
      position: 'Administrator',
      bio: 'System administrator for AICMT International',
      avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
    },
  })
  
  console.log('👤 Created admin user:', admin.email)
  
  // Create editor user
  const editor = await prisma.user.upsert({
    where: { email: 'editor@aicmt.com' },
    update: {},
    create: {
      email: 'editor@aicmt.com',
      firstName: 'Editor',
      lastName: 'User',
      role: UserRole.EDITOR,
      phone: '+919876543211',
      company: 'AICMT International',
      position: 'Content Editor',
      bio: 'Content editor for AICMT International',
      avatarUrl: 'https://ui-avatars.com/api/?name=Editor+User&background=2E8B57&color=fff',
    },
  })
  
  console.log('👤 Created editor user:', editor.email)
  
  // Create sample products
  const products = [
    {
      name: 'Compostable Filler Master Batch',
      slug: 'compostable-filler-master-batch',
      code: 'ABP-FMB',
      description: 'High-quality compostable filler master batch for biodegradable plastic production.',
      category: ProductCategory.GRANULES,
      features: [
        'Excellent mechanical properties',
        'High strength',
        'Easy to process',
        'Very good sealing properties',
        'Cost competitive'
      ],
      specifications: {
        material: 'Biodegradable polymer',
        meltFlowIndex: '25-30 g/10min',
        density: '1.25-1.30 g/cm³',
        tensileStrength: '25-30 MPa',
        elongationAtBreak: '300-350%',
        certifications: ['CPCB', 'IS 17088:2021']
      },
      price: 250.00,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: true,
      stockStatus: StockStatus.IN_STOCK,
    },
    {
      name: 'Biodegradable Carry Bags',
      slug: 'biodegradable-carry-bags',
      code: 'ABP-CB',
      description: 'Eco-friendly biodegradable carry bags for retail and commercial use.',
      category: ProductCategory.BAGS,
      features: [
        '100% compostable',
        'High tensile strength',
        'Water resistant',
        'Customizable sizes',
        'Printable surface'
      ],
      specifications: {
        material: 'Compostable polymer',
        thickness: '25-40 microns',
        sizes: ['Small (8x12 inch)', 'Medium (10x14 inch)', 'Large (12x16 inch)'],
        loadCapacity: '2-5 kg',
        certifications: ['CPCB', 'IS 17088:2021']
      },
      price: 120.00,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: true,
      stockStatus: StockStatus.IN_STOCK,
    },
    {
      name: 'Compostable Food Packaging Containers',
      slug: 'compostable-food-packaging',
      code: 'ABP-FP',
      description: 'Food-grade compostable containers for takeaway and food delivery services.',
      category: ProductCategory.PACKAGING,
      features: [
        'Food-safe material',
        'Heat resistant up to 85°C',
        'Leak-proof design',
        'Microwave safe',
        'Oil and water resistant'
      ],
      specifications: {
        material: 'Compostable biopolymer',
        capacity: '250ml to 1000ml',
        temperature: '-20°C to 85°C',
        shapes: ['Round', 'Square', 'Rectangular'],
        certifications: ['CPCB', 'FDA', 'IS 17088:2021']
      },
      price: 180.00,
      status: ProductStatus.PUBLISHED,
      isActive: true,
      isFeatured: false,
      stockStatus: StockStatus.IN_STOCK,
    }
  ]
  
  for (const product of products) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
    
    // Create product images
    await prisma.productImage.create({
      data: {
        productId: createdProduct.id,
        url: `https://placehold.co/600x400?text=${encodeURIComponent(product.name)}`,
        altText: product.name,
        isPrimary: true,
        displayOrder: 0,
      }
    })
    
    console.log('📦 Created product:', createdProduct.name)
  }
  
  // Create sample blog posts
  const blogPosts = [
    {
      title: 'The Future of Biodegradable Plastics in India',
      slug: 'future-biodegradable-plastics-india',
      content: 'Biodegradable plastics are revolutionizing the packaging industry in India...',
      excerpt: 'How biodegradable plastics are changing the packaging landscape in India',
      authorId: admin.id,
      category: 'Industry Trends',
      tags: ['biodegradable', 'sustainability', 'india', 'packaging'],
      featuredImage: 'https://placehold.co/800x450?text=Biodegradable+Plastics',
      status: BlogStatus.PUBLISHED,
      isPublished: true,
      publishedAt: new Date(),
      views: 1245,
    },
    {
      title: 'Understanding Compostable vs Biodegradable Materials',
      slug: 'compostable-vs-biodegradable',
      content: 'Many people confuse compostable and biodegradable materials...',
      excerpt: 'Learn the key differences between compostable and biodegradable materials',
      authorId: editor.id,
      category: 'Education',
      tags: ['compostable', 'biodegradable', 'materials', 'education'],
      featuredImage: 'https://placehold.co/800x450?text=Compostable+vs+Biodegradable',
      status: BlogStatus.PUBLISHED,
      isPublished: true,
      publishedAt: new Date(),
      views: 876,
    },
    {
      title: 'CPCB Certification: What You Need to Know',
      slug: 'cpcb-certification-guide',
      content: 'The Central Pollution Control Board (CPCB) certification is essential...',
      excerpt: 'A comprehensive guide to obtaining CPCB certification for biodegradable products',
      authorId: admin.id,
      category: 'Certification',
      tags: ['cpcb', 'certification', 'compliance', 'regulations'],
      featuredImage: 'https://placehold.co/800x450?text=CPCB+Certification',
      status: BlogStatus.PUBLISHED,
      isPublished: true,
      publishedAt: new Date(),
      views: 543,
    }
  ]
  
  for (const post of blogPosts) {
    const createdPost = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
    
    console.log('📝 Created blog post:', createdPost.title)
  }
  
  // Create sample inquiries
  const inquiries = [
    {
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+919876543212',
      company: 'Green Retail Solutions',
      message: 'I am interested in your biodegradable carry bags for our retail chain. Could you please send me a quotation for 10,000 bags?',
      inquiryType: InquiryType.QUOTE_REQUEST,
      productInterest: 'Biodegradable Carry Bags',
      status: InquiryStatus.NEW,
      priority: InquiryPriority.HIGH,
      source: 'website',
    },
    {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+919876543213',
      company: 'Eco Foods',
      message: 'We are looking for food packaging containers for our takeaway restaurant. Can you send samples of your compostable food containers?',
      inquiryType: InquiryType.SAMPLE_REQUEST,
      productInterest: 'Compostable Food Packaging',
      status: InquiryStatus.IN_PROGRESS,
      priority: InquiryPriority.MEDIUM,
      assignedToId: admin.id,
      source: 'website',
    },
    {
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+919876543214',
      company: 'Green Manufacturing Ltd',
      message: 'We are interested in becoming a distributor for your products in Gujarat. Please share partnership details.',
      inquiryType: InquiryType.PARTNERSHIP,
      status: InquiryStatus.NEW,
      priority: InquiryPriority.HIGH,
      source: 'website',
    }
  ]
  
  for (const inquiry of inquiries) {
    const createdInquiry = await prisma.inquiry.create({
      data: inquiry,
    })
    
    console.log('📩 Created inquiry from:', createdInquiry.name)
  }
  
  // Create system settings
  const settings = [
    {
      key: 'site_info',
      value: {
        siteName: 'AICMT International',
        tagline: 'Biodegradable Solutions for a Sustainable Future',
        contactEmail: 'info@aicmt.com',
        contactPhone: '+91 70755 00878',
        address: 'Bharath\'s 63 Noth, Plot #63 & 64, Ground floor, 3rd-Lane, Adithya Gardens, Near Sai Nagar Main Road, Bachupally, Telangana, 500090'
      },
      description: 'Basic site information',
      category: 'general',
      isPublic: true,
    },
    {
      key: 'social_media',
      value: {
        facebook: 'https://facebook.com/aicmt',
        twitter: 'https://twitter.com/aicmt',
        instagram: 'https://instagram.com/aicmt',
        linkedin: 'https://linkedin.com/company/aicmt'
      },
      description: 'Social media links',
      category: 'general',
      isPublic: true,
    },
    {
      key: 'seo_defaults',
      value: {
        titleSuffix: ' | AICMT International',
        defaultDescription: 'AICMT International provides biodegradable plastic solutions for a sustainable future.',
        defaultKeywords: ['biodegradable', 'compostable', 'sustainable', 'eco-friendly', 'plastic alternatives']
      },
      description: 'Default SEO settings',
      category: 'seo',
      isPublic: true,
    }
  ]
  
  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
    
    console.log('⚙️ Created setting:', setting.key)
  }
  
  console.log('✅ Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })