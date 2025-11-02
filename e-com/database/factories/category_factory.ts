import factory from '@adonisjs/lucid/factories'
import Category from '#models/category'

export const CategoryFactory = factory
  .define(Category, async ({ faker }) => {
    return {
      name: `${faker.word.noun()} ${faker.string.alphanumeric(4)}`,
      description: faker.lorem.sentence(),
    }
  })
  .build()