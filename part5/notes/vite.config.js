import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    target: 'http://localhost:3003',
    changeOrigin: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js',
    reporters: 'default',
    coverage: {
      enabled: true,
      reporter: ['text', 'html'],
      provider: 'v8',
      include: ['src/**/*.{js,jsx}', 'src/tests/*.{js,jsx}'],
    },
  },
})
