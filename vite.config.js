import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Deployed to https://sandhukaran.github.io/shortcutz/ — a project page,
  // so every built asset URL needs the repo name in front of it. Without
  // this the bundle is requested from the user root and the page is blank.
  base: '/shortcutz/',
  plugins: [react(), tailwindcss()],
})
