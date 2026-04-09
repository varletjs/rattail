import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    entry: ['src/index.ts', 'src/vite-plus/index.ts', 'src/axle/index.ts', 'src/axle/use.ts', 'src/axle/api.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.ts'],
      exclude: ['src/function/NOOP.ts', 'src/general/getGlobalThis.ts'],
    },
  },
})
