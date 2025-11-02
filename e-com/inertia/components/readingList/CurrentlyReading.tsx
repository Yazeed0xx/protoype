import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Progress } from '~/components/ui/progress'
import { Link } from '@inertiajs/react'
import { BookOpen, Clock } from 'lucide-react'

interface ReadingList {
  id: number
  status: string
  progress: number
  currentPage: number
  notes: string | null
  userRating: number | null
  book: {
    id: number
    title: string
    author: string
    cover: string
    pageCount: number
  }
}

interface CurrentlyReadingProps {
  readingLists: ReadingList[]
}

export default function CurrentlyReading({ readingLists }: CurrentlyReadingProps) {
  if (readingLists.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No books currently reading</h3>
        <p className="text-muted-foreground mb-4">
          Start reading a book from your want-to-read list!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {readingLists.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-32 h-48 sm:h-auto flex-shrink-0">
              <img
                src={item.book.cover}
                alt={item.book.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.book.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.book.author}</p>
                </div>
                <Badge variant="secondary">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.progress}%
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      {item.currentPage} of {item.book.pageCount} pages
                    </span>
                    <span className="font-semibold text-primary">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>

                <div className="flex gap-2">
                  <Button size="sm" asChild className="flex-1 sm:flex-initial">
                    <Link href={`/books/${item.book.id}`}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Continue Reading
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline">
                    Mark as Done
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
