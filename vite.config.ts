// @ts-expect-error vp fmt not allowed for example 'from ./src/vite-plus'
import { lint, fmt, staged, clean, defineConfig } from './src/vite-plus/index.ts'

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

  rattail: {
    clean: clean(),

    hook: {
      'commit-msg': ['pnpm exec vr commit-lint -p $1'],
    },
  },
})
