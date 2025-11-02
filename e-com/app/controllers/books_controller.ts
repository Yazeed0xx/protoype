import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import Category from '#models/category'

export default class BooksController {
  /**
   * Display a list of books with their categories
   */
  async index({ inertia }: HttpContext) {
    const books = await Book.query().preload('category')
    const categories = await Category.all()

    return inertia.render('books/index', { 
      books: books.map(book => book.serialize()),
      categories: categories.map(category => category.serialize())
    })
  }

  /**
   * Show a specific book with its category
   */
  async show({ params, inertia }: HttpContext) {
    const book = await Book.query().where('id', params.id).preload('category').firstOrFail()
    
    // Get related books (exclude current book, same category preferred)
    const relatedBooks = await Book.query()
      .where('id', '!=', book.id)
      .where('categoryId', book.categoryId)
      .preload('category')
      .limit(4)

    return inertia.render('detailes/BookInfo', {
      book: book.serialize(),
      relatedBooks: relatedBooks.map(book => book.serialize()),
    })
  }

  /**
   * Create a new book with a category
   */
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'title',
      'author',
      'cover',
      'description',
      'keyideas',
      'categoryId',
      'language',
      'publishedDate',
      'pageCount',
    ])

    const book = await Book.create(data)
    await book.load('category')

    return response.status(201).json(book)
  }

  /**
   * Get books by category
   */
  async getByCategory({ params, response }: HttpContext) {
    const category = await Category.query()
      .where('id', params.categoryId)
      .preload('books')
      .firstOrFail()

    return response.json(category)
  }

  /**
   * Search for existing books
   */
  async search({ request, response }: HttpContext) {
    const query = request.input('q', '')
    const limit = request.input('limit', 20)

    if (!query || query.trim().length === 0) {
      return response.json([])
    }

    const books = await Book.query()
      .where((builder) => {
        builder
          .where('title', 'like', `%${query}%`)
          .orWhere('author', 'like', `%${query}%`)
      })
      .preload('category')
      .limit(limit)

    return response.json(books.map(book => book.serialize()))
  }
}
