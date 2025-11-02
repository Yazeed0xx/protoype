import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Book from '#models/book'
import Category from '#models/category'
import { BookFactory } from '#database/factories/book_factory'
import { CategoryFactory } from '#database/factories/category_factory'
import User from '#models/user'
import ReadingList from '#models/reading_list'
import { UserFactory } from '#database/factories/user_factory'
import { ReadingListFactory } from '#database/factories/reading_list_factory'

export default class extends BaseSeeder {
  async run() {
    // Clear existing data
    await ReadingList.query().delete()
    await Book.query().delete()
    await Category.query().delete()
    await User.query().delete()

    // Create categories (reduced to avoid exhausting unique words)
    await CategoryFactory.createMany(20)

    // Create users
    const users = await UserFactory.createMany(10)
    
    // Create books
    const books = await BookFactory.createMany(50)

    // Create reading lists without duplicates
    for (let i = 0; i < 50; i++) {
      const user = users[Math.floor(Math.random() * users.length)]
      const book = books[Math.floor(Math.random() * books.length)]
      
      // Check if this combination already exists
      const exists = await ReadingList.query()
        .where('userId', user.id)
        .where('bookId', book.id)
        .first()
      
      if (!exists) {
        await ReadingListFactory.merge({
          userId: user.id,
          bookId: book.id,
        }).create()
      }
    }
  }
}
