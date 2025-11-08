import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Initial books table creation. This migration sets up the core columns that
 * other migrations build on top of (foreign keys, nullable tweaks, etc).
 */
export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('author').notNullable()
      table.string('cover').nullable()
      table.text('description').nullable()
      table.text('keyideas').nullable()
      table.string('status').notNullable().defaultTo('planned')
      table.integer('progress').notNullable().defaultTo(0)
      table.integer('rating').nullable()
      table.integer('category_id').unsigned().nullable()
      table.string('language').nullable()
      table.date('published_date').nullable()
      table.integer('page_count').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

