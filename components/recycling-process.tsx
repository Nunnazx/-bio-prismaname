"use client"

import { useState } from "react"
import { OptimizedImage } from "@/components/optimized-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Recycle, ArrowRight, Info } from "lucide-react"

// Sample recycling process steps
const recyclingSteps = [
  {
    id: 1,
    title: "Collection & Sorting",
    description: "Used biodegradable plastics are collected and sorted by type and quality.",
    image: "/recycling/collection.jpg",
    icon: "🗑️",
  },
  {
    id: 2,
    title: "Cleaning & Washing",
    description: "Materials are thoroughly cleaned to remove contaminants and prepare for processing.",
    image: "/recycling/cleaning.jpg",
    icon: "💧",
  },
  {
    id: 3,
    title: "Shredding",
    description: "Clean materials are shredded into small flakes to prepare for melting.",
    image: "/recycling/shredding.jpg",
    icon: "✂️",
  },
  {
    id: 4,
    title: "Melting & Extrusion",
    description: "Shredded material is melted and extruded into new plastic strands.",
    image: "/recycling/melting.jpg",
    icon: "🔥",
  },
  {
    id: 5,
    title: "Pelletizing",
    description: "Extruded strands are cooled and cut into uniform pellets ready for reuse.",
    image: "/recycling/pelletizing.jpg",
    icon: "⚪",
  },
  {
    id: 6,
    title: "Quality Testing",
    description: "Recycled granules undergo rigorous testing to ensure they meet quality standards.",
    image: "/recycling/testing.jpg",
    icon: "🔍",
  },
]

export function RecyclingProcess() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Recycle className="h-6 w-6 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-900">From Waste to Granules</h2>
        </div>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Our closed-loop recycling process transforms used biodegradable plastics into new raw materials
        </p>
      </div>

      <div className="relative mb-8">
        <div className="hidden md:flex items-center justify-between mb-4">
          {recyclingSteps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center cursor-pointer transition-all ${
                activeStep === step.id ? "scale-110" : "opacity-70"
              }`}
              onClick={() => setActiveStep(step.id)}
              onKeyDown={(e) => e.key === "Enter" && setActiveStep(step.id)}
              tabIndex={0}
              role="button"
              aria-pressed={activeStep === step.id}
              aria-label={`Step ${step.id}: ${step.title}`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${
                  activeStep === step.id ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.icon}
              </div>
              <span className={`text-xs font-medium ${activeStep === step.id ? "text-green-600" : "text-gray-600"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden md:block h-1 bg-gray-200 absolute top-6 left-0 right-0 -z-10">
          <div className="h-1 bg-green-600 transition-all" style={{ width: `${(activeStep - 1) * 20}%` }}></div>
        </div>

        <div className="md:hidden flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
          {recyclingSteps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center cursor-pointer min-w-[90px] transition-all ${
                activeStep === step.id ? "scale-110" : "opacity-70"
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-xl mb-2 ${
                  activeStep === step.id ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-xs font-medium text-center ${
                  activeStep === step.id ? "text-green-600" : "text-gray-600"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {recyclingSteps.map((step) => (
            <div key={step.id} className={`grid md:grid-cols-2 gap-8 ${activeStep === step.id ? "block" : "hidden"}`}>
              <div className="rounded-lg overflow-hidden bg-gray-100">
                <OptimizedImage
                  src={step.image}
                  alt={`Recycling process step ${step.id}: ${step.title} - ${step.description}`}
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                  fallback={
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <Recycle className="h-12 w-12 text-gray-400" />
                    </div>
                  }
                />
              </div>

              <div className="space-y-4 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold">
                    {step.id}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                </div>

                <p className="text-gray-600">{step.description}</p>

                <div className="flex gap-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                    disabled={activeStep === 1}
                  >
                    Previous Step
                  </Button>

                  <Button
                    onClick={() => setActiveStep(Math.min(recyclingSteps.length, activeStep + 1))}
                    disabled={activeStep === recyclingSteps.length}
                    className="gap-2"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-12 bg-green-50 p-6 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-2 rounded-full mt-1">
            <Info className="h-5 w-5 text-green-600" />
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Environmental Impact</h3>
            <p className="text-gray-600">
              Our recycling process reduces waste, conserves resources, and minimizes environmental impact. By recycling
              biodegradable plastics into new granules, we're creating a circular economy that extends the lifecycle of
              materials and reduces the need for virgin raw materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
