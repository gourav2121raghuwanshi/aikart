import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://aikart-mern.vercel.app',
        secure: false,
      },
      '/ai': {
        target: 'https://aikart-mern.vercel.app',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
