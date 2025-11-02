import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Link } from '@inertiajs/react'
import { BookOpen, Star, Plus } from 'lucide-react'

interface ReadingList {
  id: number
  status: string
  progress: number
  currentPage: number
  book: {
    id: number
    title: string
    author: string
    cover: string
    rating: number
    pageCount: number
  }
}

interface WantToReadProps {
  readingLists: ReadingList[]
}

export default function WantToRead({ readingLists }: WantToReadProps) {
  if (readingLists.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No books in your wishlist</h3>
        <p className="text-muted-foreground mb-4">Add books you want to read!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {readingLists.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative aspect-[2/3] overflow-hidden bg-muted">
            <img
              src={item.book.cover}
              alt={item.book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-black/70 text-white backdrop-blur-sm">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                {item.book.rating}
              </Badge>
            </div>
          </div>

          <CardContent className="p-3">
            <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {item.book.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-2">{item.book.author}</p>
            <p className="text-xs text-muted-foreground">
              <BookOpen className="w-3 h-3 inline mr-1" />
              {item.book.pageCount} pages
            </p>
          </CardContent>

          <CardFooter className="p-3 pt-0 flex gap-2">
            <Button size="sm" className="flex-1" variant="outline">
              <Plus className="w-3 h-3 mr-1" />
              Start
            </Button>
            <Button size="sm" asChild className="flex-1">
              <Link href={`/books/${item.book.id}`}>View</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
