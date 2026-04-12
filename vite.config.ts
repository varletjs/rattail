import { lint, fmt, staged } from '@configurajs/vite-plus'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    entry: [
      'src/index.ts',
      'src/vite-plus/index.ts',
      'src/axle/index.ts',
      'src/axle/use.ts',
      'src/axle/api.ts',
      'src/ruler-factory/index.ts',
      'src/cli/bin.ts',
      'src/cli/index.ts',
    ],
    dts: true,
    shims: true,
  },

  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.ts'],
      exclude: ['src/function/NOOP.ts', 'src/general/getGlobalThis.ts'],
    },
  },

  staged: staged(),

  lint: lint(),

  fmt: fmt(),
})
