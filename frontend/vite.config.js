import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: ['http://localhost:3000','https://chit-chat-r32l.onrender.com' ]
        ws: true,
      },
    },
  },
})
