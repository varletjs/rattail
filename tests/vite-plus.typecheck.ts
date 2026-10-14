import vue from '@vitejs/plugin-vue'
import { defineConfig, type RattailUserConfig } from '../src/vite-plus'

// Regression: this used to trigger TS2321 (excessive stack depth) because
// Rattail collapsed Vite+'s config overloads into a recursive union.
const config: RattailUserConfig = defineConfig({
  plugins: [vue()],
  rattail: {
    clean: ['dist'],
  },
})

export default config
