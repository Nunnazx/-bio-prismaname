"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { OptimizedImage } from "@/components/optimized-image"

// Fallback testimonial data
const fallbackTestimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Procurement Manager",
    company: "GreenRetail Solutions",
    image: "/confident-professional.png",
    quote:
      "Switching to AICMT's compostable bags has been a game-changer for our retail chain. Our customers appreciate our commitment to sustainability, and the quality of the bags is exceptional.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Operations Director",
    company: "EcoMart India",
    image: "/confident-professional.png",
    quote:
      "The biodegradable packaging from AICMT has helped us reduce our environmental footprint significantly. The products are reliable and cost-effective.",
  },
  {
    id: 3,
    name: "Amit Patel",
    position: "Sustainability Manager",
    company: "Green Foods Ltd",
    image: "/confident-professional.png",
    quote:
      "AICMT's compostable food containers have been perfect for our takeaway business. They maintain food quality while being environmentally responsible.",
  },
]

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [testimonials, setTestimonials] = useState(fallbackTestimonials)
  const [loading, setLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  // Handle next/previous navigation
  const goToNext = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1))
  }

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1))
  }

  // Set up autoplay
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, activeIndex, testimonials.length])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          <p className="text-gray-500 mt-2">Hear from businesses that have made the switch to compostable plastics</p>
        </div>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">What Our Customers Say</h2>
        <p className="text-gray-500 mt-2">Hear from businesses that have made the switch to compostable plastics</p>
      </div>

      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <Card className="bg-green-50 border-green-100">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden">
                          <OptimizedImage
                            src={testimonial.image || "/placeholder.svg?height=80&width=80&query=person"}
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <Quote className="h-8 w-8 text-green-200 mb-2" />
                        <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-md border-gray-200 z-10"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-md border-gray-200 z-10"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>

        {/* Indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? "w-6 bg-green-600" : "w-2 bg-gray-300"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}