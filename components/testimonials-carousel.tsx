"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { OptimizedImage } from "@/components/optimized-image"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Procurement Manager",
    company: "GreenRetail Solutions",
    image: "/confident-professional.png",
    quote:
      "Switching to AICMT's compostable bags has been a game-changer for our retail chain. Our customers appreciate our commitment to sustainability, and the quality of the bags is exceptional. The transition was smooth, and the team at AICMT provided excellent support throughout the process.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Sustainability Director",
    company: "EcoFood Packaging",
    image: "/confident-professional.png",
    quote:
      "As a company focused on sustainable food packaging, finding the right supplier was crucial for us. AICMT's compostable films meet all our requirements for food safety, durability, and environmental impact. Their technical expertise and responsive customer service make them an ideal partner.",
  },
  {
    id: 3,
    name: "Amit Patel",
    position: "CEO",
    company: "GreenEarth Organics",
    image: "/confident-leader.png",
    quote:
      "We've been using AICMT's compostable packaging for our organic produce for over a year now. The quality is consistent, and the environmental benefits align perfectly with our brand values. Our customers have responded positively to the change, and we've seen an increase in repeat business.",
  },
  {
    id: 4,
    name: "Sunita Reddy",
    position: "Operations Manager",
    company: "EcoFriendly Hotels",
    image: "/confident-indian-professional.png",
    quote:
      "Implementing AICMT's compostable garbage bags across our hotel chain has significantly reduced our plastic footprint. The bags are strong, leak-proof, and completely break down in our composting facility. AICMT's team worked closely with us to find the right solution for our specific needs.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    position: "Founder",
    company: "GreenDelivery",
    image: "/coding-commute.png",
    quote:
      "As a food delivery service committed to sustainability, finding the right packaging was a challenge until we discovered AICMT. Their compostable food containers maintain food quality while aligning with our eco-friendly mission. The positive feedback from our customers has been overwhelming.",
  },
]

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

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
  }, [autoplay, activeIndex])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

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
