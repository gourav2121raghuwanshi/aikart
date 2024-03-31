import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'aikart-mern.vercel.app',
        secure: false,
      },
      '/ai': {
        target: 'aikart-mern.vercel.app',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
