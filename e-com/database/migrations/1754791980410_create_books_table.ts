import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Legacy placeholder. The books table is created in an earlier migration
 * (`1754789487954_create_books_table`). This migration is kept to preserve
 * sequence integrity for environments that have already run it, but it no
 * longer performs any schema changes.
 */
export default class extends BaseSchema {
  async up() {}

  async down() {}
}
