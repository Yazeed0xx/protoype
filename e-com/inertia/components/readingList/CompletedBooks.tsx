import { Card, CardContent } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Link } from '@inertiajs/react'
import { Star, CheckCircle, Calendar, BookOpen } from 'lucide-react'

interface ReadingList {
  id: number
  status: string
  userRating: number | null
  completedAt: string | null
  book: {
    id: number
    title: string
    author: string
    cover: string
    rating: number
  }
}

interface CompletedBooksProps {
  readingLists: ReadingList[]
}

export default function CompletedBooks({ readingLists }: CompletedBooksProps) {
  if (readingLists.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No completed books yet</h3>
        <p className="text-muted-foreground mb-4">
          Keep reading to build your completed collection!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {readingLists.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="flex">
            <div className="w-24 h-36 flex-shrink-0 relative">
              <img
                src={item.book.cover}
                alt={item.book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Done
                </Badge>
              </div>
            </div>

            <CardContent className="flex-1 p-4">
              <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{item.book.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{item.book.author}</p>

              {item.userRating && (
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < item.userRating! ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">Your rating</span>
                </div>
              )}

              {item.completedAt && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>Completed {new Date(item.completedAt).toLocaleDateString()}</span>
                </div>
              )}

              <Button size="sm" variant="outline" asChild className="w-full">
                <Link href={`/books/${item.book.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}
