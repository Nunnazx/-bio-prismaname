"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia(query)

    // Set initial value
    setMatches(mediaQuery.matches)

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add event listener
    mediaQuery.addEventListener("change", handler)

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handler)
    }
  }, [query])

  // Return false during SSR to prevent hydration mismatch
  if (!mounted) {
    return false
  }

  return matches
}
