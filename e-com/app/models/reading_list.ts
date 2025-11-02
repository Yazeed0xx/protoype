import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Book from './book.js'

export default class ReadingList extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare bookId: number

  @column()
  declare status: string // 'want-to-read' | 'currently-reading' | 'completed'

  @column()
  declare progress: number // 0-100

  @column()
  declare currentPage: number

  @column()
  declare notes: string | null

  @column()
  declare userRating: number | null

  @column.date()
  declare startedAt: DateTime | null

  @column.date()
  declare completedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>
}