import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),  
    

  ],
  server: {
    port: 8100,
  },



  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
           mui: ['@mui/material', '@mui/icons-material']
        },
      },
    },
  },

})
