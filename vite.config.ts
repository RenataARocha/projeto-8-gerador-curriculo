import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/projeto-8-gerador-curriculo/', 
  plugins: [react()],
})
