"use client"

import { useEffect, useState } from "react"
import { Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

type Slide = {
  id: number
  title: string
  subtitle?: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Thank you for loving nature 🌿",
    subtitle: "Together we reduce plastic pollution",
  },
  {
    id: 2,
    title: "From Nature → To Nature",
    subtitle: "Biodegradable & Compostable solutions",
  },
  {
    id: 3,
    title: "Welcome to AICMT International",
    subtitle: "CPCB-certified manufacturer",
  },
]

/**
 * Multi-step splash shown only on the first visit.
 * Call `onComplete` to let the rest of the app render.
 */
export function MultiSlideIntro({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // advance automatically every 2.5 s
    const timer = setTimeout(() => {
      if (index < slides.length - 1) {
        setIndex(index + 1)
      } else {
        onComplete()
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [index, onComplete])

  const slide = slides[index]

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-50 p-6 text-center">
      <Leaf className="h-14 w-14 text-green-700 animate-bounce" />
      <h1 className="mt-6 text-3xl font-extrabold text-green-800">{slide.title}</h1>
      {slide.subtitle && <p className="mt-2 text-lg text-green-700">{slide.subtitle}</p>}

      {/* Allow impatient users to skip */}
      <Button variant="ghost" size="sm" className="mt-8" onClick={onComplete}>
        Skip
      </Button>
    </div>
  )
}

export default MultiSlideIntro
