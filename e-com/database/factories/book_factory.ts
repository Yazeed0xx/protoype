import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'
import { DateTime } from 'luxon'
import { CategoryFactory } from './category_factory.js'

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    const category = await CategoryFactory.create()

    return {
      title: faker.lorem.sentence(),
      author: faker.name.fullName(),
      cover: faker.image.url(),
      progress: faker.number.int({ min: 0, max: 100 }),
      description: faker.lorem.paragraph(),
      rating: faker.number.float({ min: 0, max: 5, fractionDigits: 1 }),
      keyideas: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(['reading', 'completed', 'want-to-read']),
      categoryId: category.id,
      language: faker.helpers.arrayElement(['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean']),
      publishedDate: DateTime.fromJSDate(faker.date.past()),
      pageCount: faker.number.int({ min: 100, max: 1000 }),
    }
  })
  .build()