import { Suspense } from "react"
import { getAllReviews } from "@/app/actions/reviews"
import { ReviewsTable } from "@/components/admin/reviews-table"

export const metadata = {
  title: "Manage Reviews | AICMT Admin",
  description: "Manage customer reviews for AICMT products",
}

async function ReviewsContent() {
  const { reviews, error } = await getAllReviews()

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return <ReviewsTable reviews={reviews || []} />
}

export default function ReviewsPage() {
  return (
    <div className="container p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Reviews</h1>
      </div>

      <Suspense fallback={<div>Loading reviews...</div>}>
        <ReviewsContent />
      </Suspense>
    </div>
  )
}
