"use client"

import { useState, useEffect } from "react"
import { OptimizedImage } from "@/components/optimized-image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"

// Sample gallery categories and images
const galleryCategories = [
  {
    id: "facility",
    name: "Our Facility",
    images: [
      {
        src: "/line.jpg",
        alt: "Modern production facility",
        caption: "State-of-the-art production line",
      },
      {
        src: "/quality.jpg",
        alt: "Quality control lab",
        caption: "Quality testing laboratory",
      },
      {
        src: "/ware.JPG",
        alt: "Warehouse storage",
        caption: "Organized warehouse facility",
      },
      {
        src: "/facility-1.png",
        alt: "Office space",
        caption: "Modern office environment",
      },
      {
        src: "/exter.jpg",
        alt: "Factory exterior",
        caption: "Sustainable factory exterior",
      },
      {
        src: "/modern.jpg",
        alt: "Research lab",
        caption: "Research and development laboratory",
      },
    ],
  },
  {
    id: "products",
    name: "Products",
    images: [
      {
        src: "/product-1.jpg",
        alt: "Biodegradable bags",
        caption: "Eco-friendly shopping bags",
      },
      {
        src: "/product-2.jpg",
        alt: "Food packaging",
        caption: "Compostable food containers",
      },
      {
        src: "/product-3.jpg",
        alt: "Biodegradable films",
        caption: "Transparent biodegradable films",
      },
      {
        src: "/biodegradable-plastic-granules.png",
        alt: "Plastic granules",
        caption: "Biodegradable plastic granules",
      },
      {
        src: "/product-4.jpg",
        alt: "Custom packaging",
        caption: "Custom printed packaging solutions",
      },
      {
        src: "/product-5.jpg",
        alt: "Eco-friendly cutlery",
        caption: "Biodegradable cutlery set",
      },
    ],
  },
  {
    id: "events",
    name: "Events & Exhibitions",
    images: [
      {
        src: "/facility-1.png",
        alt: "Trade show booth",
        caption: "Our booth at EcoPlastics Expo 2023",
      },
      {
        src: "/facility-1.png",
        alt: "Product demonstration",
        caption: "Live product demonstration",
      },
      {
        src: "/facility-1.png",
        alt: "Award ceremony",
        caption: "Receiving sustainability award",
      },
      {
        src: "/facility-1.png",
        alt: "Team photo",
        caption: "Our team at industry conference",
      },
      {
        src: "/celebrating-success.png",
        alt: "Celebration event",
        caption: "Celebrating company milestones",
      },
      {
        src: "/facility-1.png",
        alt: "Customer workshop",
        caption: "Educational workshop for clients",
      },
    ],
  },
]

export function ImageGallery() {
  const [activeCategory, setActiveCategory] = useState("facility")
  const [modalOpen, setModalOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const currentCategory = galleryCategories.find((cat) => cat.id === activeCategory)

  const openModal = (index: number) => {
    setActiveImageIndex(index)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const nextImage = () => {
    if (currentCategory) {
      setActiveImageIndex((prevIndex) => (prevIndex === currentCategory.images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const prevImage = () => {
    if (currentCategory) {
      setActiveImageIndex((prevIndex) => (prevIndex === 0 ? currentCategory.images.length - 1 : prevIndex - 1))
    }
  }

  useEffect(() => {
    if (modalOpen) {
      // Save the previously focused element
      const previouslyFocused = document.activeElement

      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal()
      }

      document.addEventListener("keydown", handleEscape)

      return () => {
        document.removeEventListener("keydown", handleEscape)
        // Restore focus when modal closes
        if (previouslyFocused) {
          ;(previouslyFocused as HTMLElement).focus()
        }
      }
    }
  }, [modalOpen])

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Explore our facilities, products, and events through our image gallery
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          {galleryCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {galleryCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {category.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative rounded-md overflow-hidden group cursor-pointer"
                  onClick={() => openModal(index)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => e.key === "Enter" && openModal(index)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View larger image: ${image.caption}`}
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Fallback for image loading error */}
                  {/* If you want a fallback, you should handle it inside OptimizedImage or with onError */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="h-5 w-5 text-gray-700" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-sm">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Modal for full-size image view */}
      {modalOpen && currentCategory && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={(e) => {
                e.stopPropagation()
                closeModal()
              }}
              aria-label="Close image viewer"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="max-h-[80vh] flex items-center justify-center">
              <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <OptimizedImage
                  src={currentCategory.images[activeImageIndex].src}
                  alt={currentCategory.images[activeImageIndex].alt}
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto object-contain"
                />
              </div>
            </div>

            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 p-2">
              <p>{currentCategory.images[activeImageIndex].caption}</p>
              <p className="text-sm text-gray-300 mt-1">
                {activeImageIndex + 1} / {currentCategory.images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
