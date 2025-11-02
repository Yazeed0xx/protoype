import { Link } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent } from '~/components/ui/card'
import { Progress } from '~/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import {
  BookOpen,
  Star,
  Heart,
  Share2,
  Calendar,
  Globe,
  BookMarked,
  User,
  ArrowLeft,
  Award,
} from 'lucide-react'

interface Category {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

interface Book {
  id: number
  title: string
  author: string
  cover?: string
  progress: number
  description?: string
  rating: number
  keyideas?: string
  status: string
  categoryId: number
  language?: string
  publishedDate?: string
  pageCount?: number
  createdAt: string
  updatedAt: string
  category?: Category
}

interface BookInfoProps {
  book: Book
  relatedBooks: Book[]
}


const reviews = [
  {
    id: 1,
    user: 'Sarah Johnson',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Life-changing book! The practical strategies are easy to implement and actually work. Highly recommend to anyone looking to improve their daily habits.',
  },
  {
    id: 2,
    user: 'Michael Chen',
    rating: 4,
    date: '1 month ago',
    comment: 'Great insights on habit formation. Some concepts are repetitive but overall excellent read.',
  },
  {
    id: 3,
    user: 'Emma Davis',
    rating: 5,
    date: '2 months ago',
    comment: 'Best book on habits I\'ve ever read. Clear writing and actionable advice throughout.',
  },
]

export default function BookInfo({ book, relatedBooks}: BookInfoProps) {
  // Parse key ideas from string to array
  const keyIdeas = book.keyideas ? book.keyideas.split('|').filter(Boolean) : []
  
  // Extract year from publishedDate if available
  const publishedYear = book.publishedDate ? new Date(book.publishedDate).getFullYear() : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section with Book Cover */}
      <div className="relative bg-gradient-to-b from-primary/5 to-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/books">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Books
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 lg:gap-12 items-start max-w-7xl">
            {/* Book Cover */}
            <div className="relative group mx-auto lg:mx-0">
              <div className="relative w-64 h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-background ring-2 ring-primary/20 transition-transform group-hover:scale-105">
                <img
                  src={book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop'}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <Badge className="absolute -top-2 -right-2 shadow-lg bg-primary text-primary-foreground px-3 py-1.5">
                <Star className="w-4 h-4 fill-current mr-1" />
                {book.rating.toFixed(1)}
              </Badge>
            </div>

            {/* Book Info */}
            <div className="space-y-6 flex-1">
              <div>
                <Badge variant="secondary" className="mb-3 text-sm px-3 py-1">
                  {book.category?.name || 'Uncategorized'}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight">
                  {book.title}
                </h1>
                <div className="flex items-center gap-2 text-xl text-muted-foreground mb-6">
                  <User className="w-5 h-5" />
                  <span>by <span className="font-semibold text-foreground">{book.author}</span></span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(book.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{book.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-muted-foreground">5.0</span>
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {book.description || 'No description available for this book.'}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {book.pageCount && (
                    <div className="bg-muted/50 rounded-xl p-4 text-center hover:bg-muted transition-colors">
                      <BookOpen className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{book.pageCount}</div>
                      <div className="text-xs text-muted-foreground">Pages</div>
                    </div>
                  )}
                  {publishedYear && (
                    <div className="bg-muted/50 rounded-xl p-4 text-center hover:bg-muted transition-colors">
                      <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{publishedYear}</div>
                      <div className="text-xs text-muted-foreground">Published</div>
                    </div>
                  )}
                  {book.language && (
                    <div className="bg-muted/50 rounded-xl p-4 text-center hover:bg-muted transition-colors">
                      <Globe className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="text-lg font-bold text-foreground">{book.language}</div>
                      <div className="text-xs text-muted-foreground">Language</div>
                    </div>
                  )}
                  <div className="bg-muted/50 rounded-xl p-4 text-center hover:bg-muted transition-colors">
                    <Award className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-lg font-bold text-foreground capitalize">{book.status}</div>
                    <div className="text-xs text-muted-foreground">Status</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="flex-1 min-w-[200px]">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start Reading
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <BookMarked className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Reading Progress */}
              {book.progress > 0 && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-foreground">Your Reading Progress</span>
                      <span className="text-2xl font-bold text-primary">{book.progress}%</span>
                    </div>
                    <Progress value={book.progress} className="h-3 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      You're {book.progress}% through this book. Keep reading!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Tabs Content */}
        <Tabs defaultValue="about" className="w-full max-w-5xl">
          <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="about" className="px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              About
            </TabsTrigger>
            <TabsTrigger value="reviews" className="px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="details" className="px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Details
            </TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="mt-8 space-y-6">
            {keyIdeas.length > 0 && (
              <Card className="border-2">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    Key Takeaways
                  </h3>
                  <ul className="space-y-4">
                    {keyIdeas.map((idea, index) => (
                      <li key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <span className="text-foreground text-base leading-relaxed">{idea}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {keyIdeas.length === 0 && (
              <Card className="border-2 border-dashed">
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No key ideas available for this book yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6 space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{review.user}</h4>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="w-full">
              Load More Reviews
            </Button>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailRow label="Title" value={book.title} />
                  <DetailRow label="Author" value={book.author} />
                  <DetailRow label="Category" value={book.category?.name || 'Uncategorized'} />
                  <DetailRow label="Status" value={book.status} />
                  {book.pageCount && <DetailRow label="Pages" value={book.pageCount.toString()} />}
                  {publishedYear && <DetailRow label="Published" value={publishedYear.toString()} />}
                  {book.language && <DetailRow label="Language" value={book.language} />}
                  <DetailRow label="Rating" value={`${book.rating.toFixed(1)} / 5.0`} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Books */}
      <div className="relative bg-gradient-to-b from-background to-muted/20 py-16 mt-12 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">You May Also Like</h2>
              <p className="text-muted-foreground">Discover similar books</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/books">
                View All
                <BookOpen className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedBooks.map((relatedBook) => (
              <Link key={relatedBook.id} href={`/books/${relatedBook.id}`}>
                <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                    <img
                      src={relatedBook.cover || ''}
                      alt={relatedBook.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-primary-foreground shadow-lg">
                        <Star className="w-3 h-3 fill-current mr-1" />
                        {relatedBook.rating.toFixed(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {relatedBook.category?.name || 'Uncategorized'}
                    </Badge>
                    <h3 className="font-bold text-base text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                      {relatedBook.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{relatedBook.author}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Component
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div className="text-base font-semibold text-foreground">{value}</div>
    </div>
  )
}
