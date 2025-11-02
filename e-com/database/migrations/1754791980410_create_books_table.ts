import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('title').notNullable()
      table.string('author').notNullable()
      table.string('cover').notNullable()
      table.integer('progress').defaultTo(0)
      table.string('description', 1000).notNullable()
      table.integer('rating').defaultTo(0)
      table.string('keyideas', 1000).notNullable()
      table.string('status').notNullable().defaultTo('planned') // planned, reading, completed, dropped
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
      table.string('language').notNullable() // e.g., English, Spanish, etc.
      table.date('published_date').notNullable() // Date when the book was published
      table.integer('page_count').notNullable() // Total number of pages in the book
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
