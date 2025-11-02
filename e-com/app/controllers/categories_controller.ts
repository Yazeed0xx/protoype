import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'

export default class CategoriesController {
  /**
   * Display a list of categories with their books count
   */
  async index({ response }: HttpContext) {
    const categories = await Category.query().withCount('books')
    return response.json(categories)
  }

  /**
   * Show a specific category with its books
   */
  async show({ params, response }: HttpContext) {
    const category = await Category.query().where('id', params.id).preload('books').firstOrFail()

    return response.json(category)
  }

  /**
   * Create a new category
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'description'])
    const category = await Category.create(data)

    return response.status(201).json(category)
  }

  /**
   * Update an existing category
   */
  async update({ params, request, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    const data = request.only(['name', 'description'])

    category.merge(data)
    await category.save()

    return response.json(category)
  }

  /**
   * Delete a category
   */
  async destroy({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()

    return response.status(204).send('')
  }
}
