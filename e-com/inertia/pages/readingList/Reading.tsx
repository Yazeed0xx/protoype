import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Separator } from '~/components/ui/separator'
import { BookOpen, Library, Plus, TrendingUp } from 'lucide-react'
import { Link } from '@inertiajs/react'

// Import section components
import StatsOverview from '~/components/readingList/StatsOverview'
import ReadingGoals from '~/components/readingList/ReadingGoals'
import CurrentlyReading from '~/components/readingList/CurrentlyReading'
import WantToRead from '~/components/readingList/WantToRead'
import CompletedBooks from '~/components/readingList/CompletedBooks'
import AddBookDialog from '~/components/AddBookDialog'

interface ReadingList {
  id: number
  userId: number
  bookId: number
  status: 'want-to-read' | 'currently-reading' | 'completed'
  progress: number
  currentPage: number
  notes: string | null
  userRating: number | null
  startedAt: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
  book: {
    id: number
    title: string
    author: string
    cover: string
    description: string
    rating: number
    pageCount: number
    category?: {
      id: number
      name: string
    }
  }
}

interface ReadingListPageProps {
  readingLists: ReadingList[]
}

export default function ReadingListPage({ readingLists }: ReadingListPageProps) {
  // Filter reading lists by status
  const currentlyReading = readingLists.filter((item) => item.status === 'currently-reading')
  const wantToRead = readingLists.filter((item) => item.status === 'want-to-read')
  const completed = readingLists.filter((item) => item.status === 'completed')
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">
                  <Library className="w-3 h-3 mr-1" />
                  My Library
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                My Reading List
              </h1>
              <p className="text-lg text-muted-foreground">
                Track your reading journey and discover new books
              </p>
            </div>
            <div className="flex gap-2">
              <AddBookDialog
                trigger={
                  <Button size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Book
                  </Button>
                }
                onSuccess={(book) => {
                  console.log('Book added:', book)
                  // You can add toast notification here
                }}
              />
              <Button size="lg" variant="outline" asChild>
                <Link href="/books">
                  <Library className="w-5 h-5 mr-2" />
                  Browse
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <StatsOverview />
        </div>
      </section>

      {/* Reading Goals Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ReadingGoals />
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="reading" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="reading" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Currently Reading</span>
                <span className="sm:hidden">Reading</span>
              </TabsTrigger>
              <TabsTrigger value="want" className="gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Want to Read</span>
                <span className="sm:hidden">Want</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <Library className="w-4 h-4" />
                <span className="hidden sm:inline">Completed</span>
                <span className="sm:hidden">Done</span>
              </TabsTrigger>
            </TabsList>

            {/* Currently Reading Tab */}
            <TabsContent value="reading" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Currently Reading</h2>
                  <p className="text-muted-foreground">Books you're actively reading</p>
                </div>
              </div>
              <Separator />
              <CurrentlyReading readingLists={currentlyReading} />
            </TabsContent>

            {/* Want to Read Tab */}
            <TabsContent value="want" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Want to Read</h2>
                  <p className="text-muted-foreground">Books on your reading wishlist</p>
                </div>
                <AddBookDialog
                  trigger={
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add More
                    </Button>
                  }
                  onSuccess={(book) => {
                    console.log('Book added to want-to-read:', book)
                  }}
                />
              </div>
              <Separator />
              <WantToRead readingLists={wantToRead} />
            </TabsContent>

            {/* Completed Tab */}
            <TabsContent value="completed" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Completed Books</h2>
                  <p className="text-muted-foreground">Books you've finished reading</p>
                </div>
              </div>
              <Separator />
              <CompletedBooks readingLists={completed} />

              <div className="text-center py-8">
                <Button variant="outline" size="lg">
                  Load More Books
                  <TrendingUp className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <BookOpen className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Keep Your Reading Streak Going!</h2>
            <p className="text-xl text-white/90 mb-8">
              Discover more amazing books to add to your collection
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/books">
                <Library className="w-5 h-5 mr-2" />
                Explore Books
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
