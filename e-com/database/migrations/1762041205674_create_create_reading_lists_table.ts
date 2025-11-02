import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reading_lists'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Foreign keys
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      
      table
        .integer('book_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('books')
        .onDelete('CASCADE')

      // Reading list specific fields
      table.string('status').notNullable().defaultTo('want-to-read') // want-to-read, currently-reading, completed
      table.integer('progress').defaultTo(0) // Reading progress percentage (0-100)
      table.integer('current_page').defaultTo(0) // Current page the user is on
      table.text('notes').nullable() // User's personal notes about the book
      table.integer('user_rating').nullable() // User's personal rating (1-5)
      table.date('started_at').nullable() // When user started reading
      table.date('completed_at').nullable() // When user completed reading

      table.timestamp('created_at')
      table.timestamp('updated_at')

      // Ensure a user can only have a book once in their reading list
      table.unique(['user_id', 'book_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}