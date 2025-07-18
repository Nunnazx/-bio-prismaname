"use client"

import { useState, useEffect } from 'react'
import { Star, ThumbsUp, MessageSquare, User, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'

interface Review {
  id: string
  name: string
  email: string
  company?: string
  title: string
  content: string
  rating: number
  isVerified: boolean
  isFeatured: boolean
  helpfulCount: number
  images: string[]
  createdAt: string
  updatedAt: string
}

interface ReviewStats {
  averageRating: number
  totalReviews: number
  ratingDistribution: { [key: number]: number }
}

interface ProductReviewsProps {
  productId: string
  productName: string
}

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('reviews')
  const { toast } = useToast()

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    company: '',
    title: '',
    content: '',
    rating: 5
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      const mockReviews: Review[] = [
        {
          id: '1',
          name: 'Rajesh Kumar',
          email: 'rajesh@greentech.com',
          company: 'GreenTech Solutions',
          title: 'Excellent Quality Product',
          content: 'We have been using this PBAT resin for our packaging operations for 6 months now. The quality is consistently excellent and the biodegradation properties are exactly as promised. Our customers love the eco-friendly aspect.',
          rating: 5,
          isVerified: true,
          isFeatured: true,
          helpfulCount: 12,
          images: [],
          createdAt: new Date('2024-01-15').toISOString(),
          updatedAt: new Date('2024-01-15').toISOString()
        },
        {
          id: '2',
          name: 'Priya Sharma',
          email: 'priya@ecopack.in',
          company: 'EcoPack India',
          title: 'Great for Retail Applications',
          content: 'These compostable bags are perfect for our retail chain. They are strong, reliable, and our customers appreciate the environmental benefits. Processing was smooth and delivery was on time.',
          rating: 4,
          isVerified: true,
          isFeatured: false,
          helpfulCount: 8,
          images: [],
          createdAt: new Date('2024-02-01').toISOString(),
          updatedAt: new Date('2024-02-01').toISOString()
        },
        {
          id: '3',
          name: 'Mohammed Ali',
          email: 'ali@freshfoods.com',
          company: 'Fresh Foods Ltd',
          title: 'Perfect for Food Packaging',
          content: 'Using these biodegradable films for our fresh produce packaging. They maintain product freshness while being completely safe and environmentally friendly. Highly recommended!',
          rating: 5,
          isVerified: true,
          isFeatured: false,
          helpfulCount: 6,
          images: [],
          createdAt: new Date('2024-02-15').toISOString(),
          updatedAt: new Date('2024-02-15').toISOString()
        }
      ]

      setReviews(mockReviews)
      
      // Calculate stats
      const totalReviews = mockReviews.length
      const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      const ratingDistribution = mockReviews.reduce((dist, review) => {
        dist[review.rating] = (dist[review.rating] || 0) + 1
        return dist
      }, {} as { [key: number]: number })

      setStats({
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, ...ratingDistribution }
      })
      
      setError(null)
    } catch (err) {
      setError('Failed to load reviews. Please try again.')
      console.error('Error fetching reviews:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reviewForm.name || !reviewForm.email || !reviewForm.title || !reviewForm.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    setSubmitting(true)
    
    try {
      // Mock submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Review Submitted",
        description: "Thank you for your review! It will be published after moderation.",
      })
      
      // Reset form
      setReviewForm({
        name: '',
        email: '',
        company: '',
        title: '',
        content: '',
        rating: 5
      })
      
      // Switch back to reviews tab
      setActiveTab('reviews')
      
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your review. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    }
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg">
        <p className="text-red-600">{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          {renderStars(Math.round(stats.averageRating), 'lg')}
          <span className="text-lg font-semibold">{stats.averageRating}</span>
          <span className="text-gray-500">({stats.totalReviews} reviews)</span>
        </div>
      </div>

      {/* Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm">{rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <Progress 
                  value={(stats.ratingDistribution[rating] / stats.totalReviews) * 100} 
                  className="flex-1 h-2"
                />
                <span className="text-sm text-gray-500 w-8">
                  {stats.ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reviews">Reviews ({stats.totalReviews})</TabsTrigger>
          <TabsTrigger value="write">Write a Review</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center p-8">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Reviews Yet</h3>
              <p className="text-gray-500 mb-4">Be the first to review this product</p>
              <Button onClick={() => setActiveTab('write')}>Write a Review</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className={review.isFeatured ? 'border-green-200 bg-green-50' : ''}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{review.name}</h4>
                            {review.isVerified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                            {review.isFeatured && (
                              <Badge variant="default" className="text-xs bg-green-600">
                                Featured
                              </Badge>
                            )}
                          </div>
                          {review.company && (
                            <p className="text-sm text-gray-600">{review.company}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(review.rating, 'sm')}
                            <span className="text-xs text-gray-500">
                              <Calendar className="h-3 w-3 inline mr-1" />
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h5 className="font-medium mb-2">{review.title}</h5>
                    <p className="text-gray-700 mb-4">{review.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.helpfulCount})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="write">
          <Card>
            <CardHeader>
              <CardTitle>Write a Review for {productName}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    value={reviewForm.company}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Rating *</Label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= reviewForm.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Review Title *</Label>
                  <Input
                    id="title"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Summarize your experience"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content">Your Review *</Label>
                  <Textarea
                    id="content"
                    value={reviewForm.content}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Share your experience with this product..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}