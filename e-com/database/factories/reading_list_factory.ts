import factory from '@adonisjs/lucid/factories'
import ReadingList from '#models/reading_list'
import { DateTime } from 'luxon'

export const ReadingListFactory = factory
  .define(ReadingList, async ({ faker }) => {
    return {
      userId: faker.number.int({ min: 1, max: 10 }),
      bookId: faker.number.int({ min: 1, max: 10 }),
      status: faker.helpers.arrayElement(['want-to-read', 'currently-reading', 'completed']),
      progress: faker.number.int({ min: 0, max: 100 }),
      currentPage: faker.number.int({ min: 0, max: 100 }),
      notes: faker.helpers.arrayElement([null, faker.lorem.sentence()]),
      userRating: faker.helpers.arrayElement([null, faker.number.int({ min: 1, max: 5 })]),
      startedAt: faker.helpers.arrayElement([null, DateTime.fromJSDate(faker.date.recent())]),
      completedAt: faker.helpers.arrayElement([null, DateTime.fromJSDate(faker.date.recent())]),
    }
  })
  .build()