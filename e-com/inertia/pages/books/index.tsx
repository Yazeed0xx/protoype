import { Link } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import {
  Search,
  BookOpen,
  Star,
  Heart,
  TrendingUp,
  Sparkles,
  Library,
  Plus,
  CloudCog,
} from 'lucide-react'
import AddBookDialog from '~/components/AddBookDialog'

export interface Category {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface Book {
  id: number
  title: string
  author: string
  cover?: string
  description?: string
  keyideas?: string
  categoryId: number
  language?: string
  publishedDate?: string
  pageCount?: number
  createdAt: string
  updatedAt: string
  category?: Category
}

interface BooksIndexPageProps {
  books: Book[]
  categories: Category[]
}

// Mock data for UI demonstration
// const mockBooks = [
//   {
//     id: 1,
//     title: 'The Great Gatsby',
//     author: 'F. Scott Fitzgerald',
//     cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
//     description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
//     rating: 4.5,
//     category: 'Classic Literature',
//     pageCount: 180,
//     language: 'English',
//   },
//   {
//     id: 2,
//     title: 'To Kill a Mockingbird',
//     author: 'Harper Lee',
//     cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
//     description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
//     rating: 4.8,
//     category: 'Classic Literature',
//     pageCount: 324,
//     language: 'English',
//   },
//   {
//     id: 3,
//     title: '1984',
//     author: 'George Orwell',
//     cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
//     description: 'A dystopian social science fiction novel and cautionary tale about totalitarianism.',
//     rating: 4.7,
//     category: 'Science Fiction',
//     pageCount: 328,
//     language: 'English',
//   },
//   {
//     id: 4,
//     title: 'Pride and Prejudice',
//     author: 'Jane Austen',
//     cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
//     description: 'A romantic novel of manners that critiques the British landed gentry at the end of the 18th century.',
//     rating: 4.6,
//     category: 'Romance',
//     pageCount: 432,
//     language: 'English',
//   },
//   {
//     id: 5,
//     title: 'The Hobbit',
//     author: 'J.R.R. Tolkien',
//     cover: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=600&fit=crop',
//     description: 'A fantasy adventure novel about the quest of Bilbo Baggins, a hobbit who enjoys a comfortable life.',
//     rating: 4.9,
//     category: 'Fantasy',
//     pageCount: 310,
//     language: 'English',
//   },
//   {
//     id: 6,
//     title: 'The Catcher in the Rye',
//     author: 'J.D. Salinger',
//     cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
//     description: 'A story about teenage rebellion and alienation, following Holden Caulfield in New York City.',
//     rating: 4.3,
//     category: 'Coming of Age',
//     pageCount: 277,
//     language: 'English',
//   },
//   {
//     id: 7,
//     title: 'Harry Potter and the Philosopher\'s Stone',
//     author: 'J.K. Rowling',
//     cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop',
//     description: 'A young wizard discovers his magical heritage on his eleventh birthday.',
//     rating: 4.8,
//     category: 'Fantasy',
//     pageCount: 223,
//     language: 'English',
//   },
//   {
//     id: 8,
//     title: 'The Lord of the Rings',
//     author: 'J.R.R. Tolkien',
//     cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
//     description: 'An epic high-fantasy novel following the quest to destroy the One Ring.',
//     rating: 4.9,
//     category: 'Fantasy',
//     pageCount: 1178,
//     language: 'English',
//   },
// ]

const mockCategories = [
  { name: 'Classic Literature', count: 125, icon: Library },
  { name: 'Science Fiction', count: 89, icon: Sparkles },
  { name: 'Fantasy', count: 156, icon: TrendingUp },
  { name: 'Romance', count: 78, icon: Heart },
]

export default function BooksIndexPage({ books = [] }: BooksIndexPageProps) {
  console.log(books)
  // Use real books data if available, otherwise fall back to mock data
  const displayBooks = books.length > 0 ? books  : []
  
  // For categories, we'll use mock data for UI display since we need icons
  // In a real app, you'd map the categories from the backend to include icons
  const displayCategories = mockCategories
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 animate-bounce-slow">
              <BookOpen className="w-3 h-3 mr-1" />
              10,000+ Books Available
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in-up">
              Discover Your Next
              <span className="text-primary block mt-2"> Great Read</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-in-left">
              Explore our curated collection of books across various genres and topics
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto animate-slide-in-right">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by title, author, or description..."
                className="pl-12 h-14 text-lg bg-background border-2 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-12 bg-muted/30 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-background rounded-lg border hover:shadow-lg transition-shadow">
              <Library className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">10,000+</div>
              <div className="text-sm text-muted-foreground">Total Books</div>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border hover:shadow-lg transition-shadow">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">50,000+</div>
              <div className="text-sm text-muted-foreground">Active Readers</div>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border hover:shadow-lg transition-shadow">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border hover:shadow-lg transition-shadow">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">1M+</div>
              <div className="text-sm text-muted-foreground">Books Read</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Popular Categories */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">Popular Categories</h2>
            <p className="text-muted-foreground">Browse books by your favorite genres</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {displayCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                >
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.count} books</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Books</h2>
              <p className="text-muted-foreground">Hand-picked selections just for you</p>
            </div>
            <div className="flex gap-2">
              <AddBookDialog
                trigger={
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Book
                  </Button>
                }
                onSuccess={(book) => {
                  console.log('Book added from browse page:', book)
                }}
              />
              <Button variant="outline">
                View All
                <BookOpen className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayBooks.map((book) => (
              <Card
                key={book.id}
                className="overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                  <img
                    src={book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop'}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-9 w-9 rounded-full shadow-lg"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  {(book as any).rating && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/70 text-white backdrop-blur-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {(book as any).rating.toFixed(1)}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <Badge variant="secondary" className="w-fit mb-2">
                    {typeof book.category === 'object' && book.category ? book.category.name : (book as any).category || 'Uncategorized'}
                  </Badge>
                  <h3 className="font-bold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </CardHeader>

                <CardContent className="pb-3 flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {book.description || 'No description available'}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    {book.pageCount && (
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{book.pageCount}p</span>
                      </div>
                    )}
                    {book.language && (
                      <div className="flex items-center gap-1">
                        <span>{book.language}</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-3 border-t flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/books/${book.id}`}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Details
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-10">
            <Button size="lg" variant="outline">
              Load More Books
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Sparkles className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Reading?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of readers and discover your next favorite book today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse All Books
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
