import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Attach the books table to categories once both tables exist.
 */
export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .foreign('category_id')
        .references('id')
        .inTable('categories')
        .onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('category_id')
    })
  }
}

