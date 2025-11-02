import type { HttpContext } from '@adonisjs/core/http'
import ReadingList from '#models/reading_list'
import Book from '#models/book'
import Category from '#models/category'
import { DateTime } from 'luxon'

export default class ReadingListsController {
  async index({ inertia }: HttpContext) {
    const readingLists = await ReadingList.query().preload('book').preload('user')
    return inertia.render('reading_lists/index', { readingLists })
  }
  async show({ params, inertia }: HttpContext) {
    const readingList = await ReadingList.query()
      .where('id', params.id)
      .preload('book')
      .preload('user')
      .firstOrFail()
    return inertia.render('reading_lists/show', { readingList })
  }
  async store({ auth, request, response, session }: HttpContext) {
    const data = request.only([
      'bookId',
      'title',
      'author',
      'cover',
      'category',
      'description',
      'status',
      'pages',
      'rating',
      'notes',
    ])

    let book: Book

    // If bookId is provided, use existing book
    if (data.bookId) {
      book = await Book.findOrFail(data.bookId)
    } else {
      // Fallback: create new book (for backward compatibility)
      // Find or create category by name
      let category = await Category.findBy('name', data.category)
      if (!category) {
        category = await Category.create({ name: data.category, description: '' })
      }

      // Create the book
      book = await Book.create({
        title: data.title || '',
        author: data.author,
        cover:
          data.cover ||
          'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
        description: data.description || '',
        keyideas: '',
        status: 'planned',
        categoryId: category.id,
        language: 'English',
        publishedDate: DateTime.now(),
        pageCount: data.pages ? parseInt(data.pages) : 100,
      })
    }

    // Check if book already exists in user's reading list
    const existingReadingList = await ReadingList.query()
      .where('userId', auth.user!.id)
      .where('bookId', book.id)
      .first()

    if (existingReadingList) {
      session.flash('error', 'This book is already in your reading list')
      return response.redirect().back()
    }

    // Create the reading list entry
    const status = data.status || 'want-to-read'
    await ReadingList.create({
      userId: auth.user!.id,
      bookId: book.id,
      status: status,
      progress: 0,
      currentPage: 0,
      notes: data.notes || null,
      userRating: data.rating ? parseFloat(data.rating) : null,
      startedAt: status === 'currently-reading' ? DateTime.now() : null,
      completedAt: status === 'completed' ? DateTime.now() : null,
    })

    // Generate success message based on status
    let successMessage = ''
    switch (status) {
      case 'want-to-read':
        successMessage = `"${book.title}" has been added to your Want to Read list!`
        break
      case 'currently-reading':
        successMessage = `Started reading "${book.title}"! Happy reading!`
        break
      case 'completed':
        successMessage = `Congratulations! "${book.title}" has been marked as completed!`
        break
      default:
        successMessage = 'Book successfully added to your reading list!'
    }

    // Redirect to reading list page after successful addition
    session.flash('success', successMessage)
    return response.redirect().toRoute('my-reading')
  }

  async getUserReadingList({ auth, inertia }: HttpContext) {
    const readingLists = await ReadingList.query()
      .where('userId', auth.user!.id)
      .preload('book', (bookQuery) => {
        bookQuery.preload('category')
      })
    return inertia.render('readingList/Reading', { readingLists })
  }
  async update({ params, request, response }: HttpContext) {
    const readingList = await ReadingList.query()
      .where('id', params.id)
      .preload('book')
      .preload('user')
      .firstOrFail()
    readingList.merge(request.all())
    await readingList.save()
    return response.redirect().toRoute('readingLists.show', { id: readingList.id })
  }
  async destroy({ params, response }: HttpContext) {
    const readingList = await ReadingList.query()
      .where('id', params.id)
      .preload('book')
      .preload('user')
      .firstOrFail()
    await readingList.delete()
    return response.redirect().toRoute('readingLists.index')
  }
}
