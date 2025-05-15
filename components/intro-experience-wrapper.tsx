"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MultiSlideIntro } from "./multi-slide-intro"

export function IntroExperienceWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Check if user has seen the intro before
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasSeenIntro")

    // Set initial states after checking localStorage
    setShowIntro(hasVisited !== "true")
    setHasSeenIntro(hasVisited === "true")
    setIsLoaded(true)
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    // Save that user has seen the intro
    localStorage.setItem("hasSeenIntro", "true")
    setHasSeenIntro(true)
  }

  // For development purposes - reset the intro experience
  const resetIntroExperience = () => {
    localStorage.removeItem("hasSeenIntro")
    window.location.reload()
  }

  if (!isLoaded) {
    // Show a loading state while checking localStorage
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <>
      {showIntro && <MultiSlideIntro onComplete={handleIntroComplete} />}

      <div className={hasSeenIntro ? "animate-fadeIn" : ""}>
        {children}

        {/* Development helper button - remove in production */}
        {process.env.NODE_ENV === "development" && (
          <button
            onClick={resetIntroExperience}
            className="fixed bottom-4 right-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-50 hover:opacity-100"
          >
            Reset Intro
          </button>
        )}
      </div>
    </>
  )
}
