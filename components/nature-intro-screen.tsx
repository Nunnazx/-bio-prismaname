"use client"
import { MultiSlideIntro } from "./multi-slide-intro"

/**
 * Thin wrapper so IntroExperienceWrapper can stay decoupled.
 * Re-exports MultiSlideIntro for now, but lets us swap in a
 * completely different intro later without touching callers.
 */
export function NatureIntroScreen({ onComplete }: { onComplete: () => void }) {
  return <MultiSlideIntro onComplete={onComplete} />
}
