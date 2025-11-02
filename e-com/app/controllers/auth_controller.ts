import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().maxLength(254),
    password: vine.string().minLength(6).maxLength(180),
    remember: vine.boolean().optional(),
  })
)

const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(2).maxLength(50),
    email: vine.string().email().maxLength(254),
    password: vine.string().minLength(6).maxLength(180),
  })
)

export default class AuthController {
  async store({ request, auth, response }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)

    // Create user with validated data
    const user = await User.create({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    })

    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }

  async login({ request, auth, response }: HttpContext) {
    const data = await request.validateUsing(loginUserValidator)

    const user = await User.verifyCredentials(data.email, data.password)

    await auth.use('web').login(user, data.remember || false)

    return response.redirect().toRoute('home')
  }
}
