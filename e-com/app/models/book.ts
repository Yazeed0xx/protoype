import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import ReadingList from './reading_list.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare author: string

  @column()
  declare cover: string

  @column()
  declare progress: number

  @column()
  declare description: string

  @column()
  declare rating: number

  @column()
  declare keyideas: string

  @column()
  declare status: string

  @column()
  declare categoryId: number

  @column()
  declare language: string

  @column.date()
  declare publishedDate: DateTime

  @column()
  declare pageCount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(() => ReadingList)
  declare readingLists: HasMany<typeof ReadingList>
}
