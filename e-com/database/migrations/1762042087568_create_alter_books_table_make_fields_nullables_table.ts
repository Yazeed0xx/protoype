import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Ensure optional book fields are nullable to match the current application
 * expectations.
 */
export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('cover').nullable().alter()
      table.text('description').nullable().alter()
      table.text('keyideas').nullable().alter()
      table.integer('rating').nullable().alter()
      table.integer('page_count').nullable().alter()
      table.date('published_date').nullable().alter()
      table.string('language').nullable().alter()
      table.integer('category_id').unsigned().nullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('cover').notNullable().alter()
      table.text('description').notNullable().alter()
      table.text('keyideas').notNullable().alter()
      table.integer('rating').notNullable().defaultTo(0).alter()
      table.integer('page_count').notNullable().alter()
      table.date('published_date').notNullable().alter()
      table.string('language').notNullable().alter()
      table.integer('category_id').unsigned().notNullable().alter()
    })
  }
}