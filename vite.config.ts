import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  base: '/WreckedBrowserGame/',  // ← YOUR REPO NAME HERE

  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },

  server: {
    port: 5173,
    open: true,
  },
})
