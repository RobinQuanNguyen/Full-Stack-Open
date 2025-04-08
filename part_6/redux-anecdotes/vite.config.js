// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx', // This will ensure JSX is handled in .js files
    // This line ensures that all .js files within the src folder are treated as JSX files
    include: [/src\/.*\.js/]
  }
})
