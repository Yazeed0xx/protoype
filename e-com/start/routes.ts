/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import BooksController from '#controllers/books_controller'
import CategoriesController from '#controllers/categories_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import ReadingListsController from '#controllers/reading_lists_controller'

router.on('auth/login').renderInertia('auth/Login').as('login')
router.on('auth/register').renderInertia('auth/Register').as('register')

// Add basic pages for header navigation
router
  .group(() => {
    router.on('/profile').renderInertia('user/profile').as('profile')
    router.on('/orders').renderInertia('user/orders').as('orders')
    router.on('/settings').renderInertia('user/settings').as('settings')
    router.get('/my-reading', [ReadingListsController, 'getUserReadingList']).as('my-reading')
  })
  .use(middleware.auth())

router.group(() => {
  router.on('/').renderInertia('home').as('home')
  router.on('/contact').renderInertia('contact').as('contact')
  router.get('/books', [BooksController, 'index']).as('books')
  router.get('/books/:id', [BooksController, 'show']).as('books.show')
  router.on('/cart').renderInertia('cart/index').as('cart')
  router.on('/about').renderInertia('about').as('about')
})

// Auth routes
router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'store'])
router.post('/logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  return response.redirect().toRoute('home')
})

// API routes for testing relationships
router
  .group(() => {
    // Categories routes
    router.get('/categories', [CategoriesController, 'index'])
    router.get('/categories/:id', [CategoriesController, 'show'])
    router.post('/categories', [CategoriesController, 'store'])
    router.put('/categories/:id', [CategoriesController, 'update'])
    router.delete('/categories/:id', [CategoriesController, 'destroy'])

    // Books routes
    router.get('/books', [BooksController, 'index'])
    router.get('/books/search', [BooksController, 'search'])
    router.get('/books/:id', [BooksController, 'show'])
    router.post('/books', [BooksController, 'store'])
    router.get('/categories/:categoryId/books', [BooksController, 'getByCategory'])

    // Reading lists routes
    router.get('/reading-lists', [ReadingListsController, 'index'])
    router.get('/reading-lists/:id', [ReadingListsController, 'show'])
    router.post('/reading-lists', [ReadingListsController, 'store'])
    router.put('/reading-lists/:id', [ReadingListsController, 'update'])
    router.delete('/reading-lists/:id', [ReadingListsController, 'destroy'])
  })
  .prefix('/api')
