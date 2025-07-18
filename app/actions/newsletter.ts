"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const SubscriptionSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  source: z.string().optional(),
})

export type SubscriptionState = {
  message?: string | null
  errors?: {
    email?: string[]
    general?: string[]
  }
  success?: boolean
}

export async function subscribeToNewsletter(
  prevState: SubscriptionState,
  formData: FormData,
): Promise<SubscriptionState> {
  const validatedFields = SubscriptionSchema.safeParse({
    email: formData.get("email"),
    source: formData.get("source") || "unknown",
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid email address.",
      success: false,
    }
  }

  const { email, source } = validatedFields.data

  try {
    // Check if email already exists
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { email },
      select: { id: true, isSubscribed: true }
    })

    if (existingSubscription) {
      if (existingSubscription.isSubscribed) {
        return { message: "You are already subscribed to our newsletter.", success: true }
      } else {
        // Re-subscribe
        await prisma.newsletterSubscription.update({
          where: { id: existingSubscription.id },
          data: {
            isSubscribed: true,
            unsubscribedAt: null,
            source,
            updatedAt: new Date()
          }
        })

        revalidatePath("/") // Revalidate relevant paths
        return { message: "Successfully re-subscribed to our newsletter!", success: true }
      }
    } else {
      // New subscription
      await prisma.newsletterSubscription.create({
        data: {
          email,
          source,
          isSubscribed: true,
          subscribedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

      revalidatePath("/") // Revalidate relevant paths
      return { message: "Thank you for subscribing to our newsletter!", success: true }
    }
  } catch (error) {
    console.error("Unexpected error during subscription:", error)
    return { message: "An unexpected error occurred. Please try again.", success: false }
  }
}

// Placeholder for unsubscribe action if needed via a link (would require a token typically)
// For now, unsubscription might be handled via admin or a user profile page.
