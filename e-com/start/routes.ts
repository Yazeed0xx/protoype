/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/login').renderInertia('auth/Login')
router.on('/register').renderInertia('auth/Register')

// Add basic pages for header navigation
router.group(()=>{
    router.on('/').renderInertia('home').as('home')
router.on('/products').renderInertia('products/index')
router.on('/cart').renderInertia('cart/index')
router.on('/about').renderInertia('about')
router.on('/contact').renderInertia('contact')
router.on('/profile').renderInertia('user/profile')
router.on('/orders').renderInertia('user/orders')
router.on('/settings').renderInertia('user/settings')
}).use(middleware.auth())


// Auth routes
router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'store'])
