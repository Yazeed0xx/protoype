import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'
import tailwindcss from "@tailwindcss/vite"
export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: false } }),
    tailwindcss(),
    react(),
    adonisjs({ entrypoints: ['inertia/app/app.tsx'], reload: ['resources/views/**/*.edge'] }),
  ],
  server: {
    host: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'book-store-h2gr.onrender.com', // 👈 add your Render domain here
    ],
  },

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
    },
  },
})
