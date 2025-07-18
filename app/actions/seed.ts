"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function seedProducts() {
  try {
    // Sample product data
    const products = [
      {
        name: "PBAT Film Grade Resin",
        code: "PBAT-F23",
        category: "granules",
        description:
          "High-quality PBAT (Polybutylene Adipate Terephthalate) resin specifically formulated for film applications. Offers excellent biodegradability and mechanical properties.",
        features: {
          features: [
            "100% biodegradable",
            "Excellent film forming properties",
            "High tensile strength",
            "Compatible with existing processing equipment",
          ]
        },
        specifications: [
          { name: "Melt Flow Index", value: "2.5-3.5 g/10min" },
          { name: "Density", value: "1.25-1.27 g/cm³" },
          { name: "Tensile Strength", value: "≥ 20 MPa" },
          { name: "Elongation at Break", value: "≥ 500%" },
        ],
        price: "Contact for pricing",
        imageUrl: "/biodegradable-plastic-granules.png",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Eco Carry Bag - Small",
        code: "CB-ECO-S",
        category: "bags",
        description:
          "Biodegradable carry bags made from our proprietary blend of compostable materials. Perfect for retail stores looking to reduce their environmental footprint.",
        features: {
          features: [
            "100% compostable",
            "Meets IS/ISO 17088 standards",
            "High load capacity",
            "Customizable printing available",
          ]
        },
        specifications: [
          { name: "Size", value: '8" × 12"' },
          { name: "Thickness", value: "25 microns" },
          { name: "Load Capacity", value: "Up to 2 kg" },
          { name: "Biodegradation Time", value: "180 days in composting conditions" },
        ],
        price: "₹2.50 per piece",
        imageUrl: "/earth-friendly-shopping.png",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Food Container - Medium",
        code: "FP-CONT-M",
        category: "packaging",
        description:
          "Biodegradable food containers perfect for takeaway and food delivery services. Maintains food temperature while being environmentally responsible.",
        features: {
          features: ["Oil and water resistant", "Microwave safe", "Freezer safe", "No plastic or wax coating"]
        },
        specifications: [
          { name: "Size", value: '6" × 6" × 2.5"' },
          { name: "Capacity", value: "750 ml" },
          { name: "Temperature Range", value: "-20°C to 120°C" },
          { name: "Material", value: "PLA + natural fibers" },
        ],
        price: "₹4.75 per piece",
        imageUrl: "/earth-friendly-takeout.png",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Agricultural Film - 100 micron",
        code: "FILM-AG-100",
        category: "films",
        description:
          "Biodegradable agricultural mulch film that helps control weed growth and soil temperature while naturally decomposing after the growing season.",
        features: {
          features: [
            "UV stabilized",
            "Controlled biodegradation",
            "Excellent soil temperature regulation",
            "Reduces herbicide use",
          ]
        },
        specifications: [
          { name: "Width", value: "1.2 meters" },
          { name: "Thickness", value: "100 microns" },
          { name: "Roll Length", value: "500 meters" },
          { name: "Biodegradation Time", value: "6-8 months depending on soil conditions" },
        ],
        price: "₹120 per kg",
        imageUrl: "/clear-biodegradable-pellets.png",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "PLA General Purpose Resin",
        code: "PLA-G21",
        category: "granules",
        description:
          "Plant-based PLA (Polylactic Acid) resin derived from renewable resources. Ideal for various applications requiring a rigid, compostable material.",
        features: {
          features: ["Derived from plant starch", "High clarity", "Rigid material", "Industrially compostable"]
        },
        specifications: [
          { name: "Melt Flow Index", value: "6.0 g/10min" },
          { name: "Density", value: "1.24 g/cm³" },
          { name: "Tensile Strength", value: "50 MPa" },
          { name: "Glass Transition Temperature", value: "55-60°C" },
        ],
        price: "Contact for pricing",
        imageUrl: "/clear-eco-pellets.png",
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    // Insert products
    for (const product of products) {
      await prisma.product.create({ data: product })
    }

    revalidatePath("/admin/products")
    return { success: true, count: products.length }
  } catch (error) {
    console.error("Error seeding products:", error)
    throw new Error(`Failed to seed products: ${error}`)
  }
}