import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target:  target: process.env.NODE_ENV === 'production' ? 'https://chit-chat-r32l.onrender.com' : 'http://localhost:3000', , 
        ws: true,
      },
    },
  },
})
