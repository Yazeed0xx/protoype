import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import { Plus, BookOpen, X, Search, Loader2 } from 'lucide-react'
import { router } from '@inertiajs/react'

// Simplified Zod validation schema - only book selection and reading list fields
const addBookSchema = z.object({
  bookId: z
    .string()
    .min(1, 'Please select a book'),
  status: z
    .enum(['want-to-read', 'currently-reading', 'completed']),
  notes: z
    .string()
    .max(1000, 'Notes must not exceed 1000 characters')
    .optional()
    .or(z.literal('')),
})

type AddBookFormData = z.infer<typeof addBookSchema>

interface Book {
  id: number
  title: string
  author: string
  cover?: string
  description?: string
  category?: {
    id: number
    name: string
  }
}

interface AddBookDialogProps {
  trigger?: React.ReactNode
  onSuccess?: (data: AddBookFormData) => void
}

export default function AddBookDialog({ trigger, onSuccess }: AddBookDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const form = useForm<AddBookFormData>({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      bookId: '',
      status: 'want-to-read',
      notes: '',
    },
    mode: 'onChange',
  })

  // Debounced search function
  const searchBooks = useCallback(
    async (query: string) => {
      if (!query || query.trim().length < 2) {
        setSearchResults([])
        return
      }

      setIsSearching(true)
      try {
        const response = await fetch(`/api/books/search?q=${encodeURIComponent(query)}&limit=10`)
        if (response.ok) {
          const books = await response.json()
          setSearchResults(books)
        } else {
          setSearchResults([])
        }
      } catch (error) {
        console.error('Error searching books:', error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    },
    []
  )

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchBooks(searchQuery)
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, searchBooks])

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book)
    form.setValue('bookId', book.id.toString())
    setSearchQuery('')
    setSearchResults([])
  }

  const handleSubmit = async (values: AddBookFormData) => {
    setIsSubmitting(true)
    router.post('/api/reading-lists', values, {
      onSuccess: () => {
        setIsSubmitting(false)
        setOpen(false)
        form.reset()
        setSelectedBook(null)
        setSearchQuery('')
        setSearchResults([])
        onSuccess?.(values)
      },
      onError: (errors) => {
        setIsSubmitting(false)
        console.error('Error adding book:', errors)
      }
    })
  }

  const handleDialogClose = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      form.reset()
      setSelectedBook(null)
      setSearchQuery('')
      setSearchResults([])
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Book
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="w-6 h-6 text-primary" />
            Add Book to Reading List
          </DialogTitle>
          <DialogDescription>
            Search for an existing book in the database to add to your reading list.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            {/* Selected Book Preview */}
            {selectedBook && (
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-16 bg-muted rounded border flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {selectedBook.cover ? (
                      <img
                        src={selectedBook.cover}
                        alt={selectedBook.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground line-clamp-1">{selectedBook.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{selectedBook.author}</p>
                    {selectedBook.category && (
                      <span className="inline-block mt-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {selectedBook.category.name}
                      </span>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={() => {
                      setSelectedBook(null)
                      form.setValue('bookId', '')
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Book Search */}
            {!selectedBook && (
              <div className="space-y-2">
                <FormLabel>Search for a Book</FormLabel>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                  {isSearching && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                  )}
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="border rounded-md max-h-[280px] overflow-y-auto bg-background">
                    <div className="divide-y">
                      {searchResults.map((book) => (
                        <button
                          key={book.id}
                          type="button"
                          onClick={() => handleBookSelect(book)}
                          className="w-full p-3 text-left hover:bg-muted transition-colors flex items-center gap-3"
                        >
                          <div className="w-12 h-16 bg-muted rounded border flex-shrink-0 flex items-center justify-center overflow-hidden">
                            {book.cover ? (
                              <img
                                src={book.cover}
                                alt={book.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none'
                                }}
                              />
                            ) : (
                              <BookOpen className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground line-clamp-1">{book.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
                            {book.category && (
                              <span className="inline-block mt-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                {book.category.name}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {searchQuery && searchQuery.length >= 2 && !isSearching && searchResults.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No books found. Try a different search term.
                  </p>
                )}
              </div>
            )}

            {/* Hidden field for bookId */}
            <FormField
              control={form.control}
              name="bookId"
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Reading Status <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="want-to-read">Want to Read</SelectItem>
                      <SelectItem value="currently-reading">Currently Reading</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any notes about this book..."
                      className="min-h-[100px] resize-none"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0} / 1000 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDialogClose(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !selectedBook}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Reading List
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
