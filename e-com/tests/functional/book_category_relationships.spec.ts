import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import Category from '#models/category'
import Book from '#models/book'

test.group('Book Category Relationships', (group) => {
  // Clean up after each test
  group.each.teardown(async () => {
    await Book.query().delete()
    await Category.query().delete()
  })

  test('can create a category and book with relationship', async ({ assert }) => {
    // Create a category
    const category = await Category.create({
      name: 'Fiction',
      description: 'Fictional stories',
    })

    // Create a book with the category
    const book = await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      cover: 'test-cover.jpg',
      description: 'A test book',
      keyideas: 'Testing, relationships',
      categoryId: category.id,
      language: 'English',
      publishedDate: DateTime.fromJSDate(new Date('2023-01-01')),
      pageCount: 200,
      status: 'planned',
      rating: 0,
    })

    // Load the relationship
    await book.load('category')

    assert.equal(book.category.name, 'Fiction')
    assert.equal(book.categoryId, category.id)
  })

  test('can get books from a category', async ({ assert }) => {
    // Create a category
    const category = await Category.create({
      name: 'Self-Help',
      description: 'Personal development books',
    })

    // Create multiple books
    await Book.createMany([
      {
        title: 'Book 1',
        author: 'Author 1',
        cover: 'cover1.jpg',
        description: 'First book',
        keyideas: 'Ideas 1',
        categoryId: category.id,
        language: 'English',
        publishedDate: DateTime.fromJSDate(new Date('2023-01-01')),
        pageCount: 150,
        status: 'planned',
        rating: 0,
      },
      {
        title: 'Book 2',
        author: 'Author 2',
        cover: 'cover2.jpg',
        description: 'Second book',
        keyideas: 'Ideas 2',
        categoryId: category.id,
        language: 'English',
        publishedDate: DateTime.fromJSDate(new Date('2023-02-01')),
        pageCount: 200,
        status: 'reading',
        rating: 4,
      },
    ])

    // Load the books from the category
    await category.load('books')

    assert.equal(category.books.length, 2)
    assert.equal(category.books[0].title, 'Book 1')
    assert.equal(category.books[1].title, 'Book 2')
  })

  test('can query books with categories preloaded', async ({ assert }) => {
    // Create a category
    const category = await Category.create({
      name: 'Non-Fiction',
      description: 'Educational books',
    })

    // Create a book
    await Book.create({
      title: 'Educational Book',
      author: 'Smart Author',
      cover: 'edu-cover.jpg',
      description: 'An educational book',
      keyideas: 'Learning, education',
      categoryId: category.id,
      language: 'English',
      publishedDate: DateTime.fromJSDate(new Date('2023-03-01')),
      pageCount: 300,
      status: 'completed',
      rating: 5,
    })

    // Query books with category preloaded
    const books = await Book.query().preload('category')

    assert.equal(books.length, 1)
    assert.equal(books[0].category.name, 'Non-Fiction')
    assert.equal(books[0].title, 'Educational Book')
  })
})
