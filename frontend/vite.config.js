import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

  ],

  server : {
     proxy : {
     "/api": {
        target: "https://api.medisco.in",
        changeOrigin: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
      }
      
    }
  }
})
