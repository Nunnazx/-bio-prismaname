"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { NatureIntroScreen } from "./nature-intro-screen"
import { Leaf } from "lucide-react"

export function IntroExperienceWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasSeenIntro")
    setShowIntro(hasVisited !== "true")
    setHasSeenIntro(hasVisited === "true")
    setIsLoaded(true)
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    localStorage.setItem("hasSeenIntro", "true")
    setHasSeenIntro(true)
  }

  const resetIntroExperience = () => {
    localStorage.removeItem("hasSeenIntro")
    window.location.reload()
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="animate-pulse flex flex-col items-center">
          <Leaf className="h-16 w-16 text-green-600 animate-bounce" />
          <h1 className="mt-4 text-2xl font-bold text-green-800">AICMT International</h1>
          <p className="mt-2 text-green-600">Loading Experience...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {showIntro && <NatureIntroScreen onComplete={handleIntroComplete} />}
      <div className={hasSeenIntro ? "animate-fadeIn" : ""}>
        {children}
        {process.env.NODE_ENV === "development" && (
          <button
            onClick={resetIntroExperience}
            className="fixed bottom-4 right-4 bg-gray-800 text-white text-xs px-2 py-1 rounded z-50 opacity-50 hover:opacity-100"
          >
            Reset Intro
          </button>
        )}
      </div>
    </>
  )
}
