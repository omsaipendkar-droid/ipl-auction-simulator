import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true,
    allowedHosts: true, // Allow any host (for tunnels and public sharing)
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})
