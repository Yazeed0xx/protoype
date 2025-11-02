import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { DateTime } from 'luxon'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: DateTime.fromJSDate(faker.date.recent()),
      updatedAt: DateTime.fromJSDate(faker.date.recent()),
    }
  })
  .build()