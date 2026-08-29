import vue from '@vitejs/plugin-vue'
import { defineConfig } from '../src/vite-plus'

// Regression: this used to trigger TS2321 (excessive stack depth) because
// Rattail collapsed Vite+'s config overloads into a recursive union.
export default defineConfig({
  plugins: [vue()],
  rattail: {
    clean: ['dist'],
  },
})
