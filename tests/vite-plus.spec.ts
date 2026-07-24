// @vitest-environment node

import { expect, it } from 'vite-plus/test'
import { fmt, lint, staged } from '../src/vite-plus'

it('creates the default lint config', () => {
  const config = lint()

  expect(config.plugins).toEqual(['eslint', 'oxc', 'unicorn', 'import', 'typescript', 'vue', 'vitest'])
  expect(config.categories).toEqual({ correctness: 'off' })
  expect(config.rules?.['vue/valid-define-props']).toBe('error')
  expect(config.ignorePatterns).toContain('**/node_modules')
  expect(config.overrides).toHaveLength(2)
})

it('customizes lint contributions', () => {
  const override = {
    files: ['**/*.custom.ts'],
    rules: { eqeqeq: 'off' as const },
  }
  const config = lint({
    ts: false,
    vue: { version: 2 },
    react: true,
    vitest: false,
    ignores: ['generated/**'],
    rules: { eqeqeq: 'warn' },
    overrides: [override],
  })

  expect(config.plugins).toEqual(['eslint', 'oxc', 'unicorn', 'import', 'vue', 'react'])
  expect(config.rules?.['vue/no-deprecated-destroyed-lifecycle']).toBe('off')
  expect(config.rules?.eqeqeq).toBe('warn')
  expect(config.ignorePatterns).toContain('generated/**')
  expect(config.overrides?.at(-1)).toEqual(override)
})

it('creates the format and staged configs', () => {
  expect(fmt({ ignores: ['fixtures/**'] })).toMatchObject({
    semi: false,
    printWidth: 120,
    singleQuote: true,
    sortImports: { newlinesBetween: false },
    sortTailwindcss: true,
    ignorePatterns: expect.arrayContaining(['**/dist', 'fixtures/**']),
  })

  expect(staged()).toEqual({
    '*.{js,jsx,ts,tsx}': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix --no-error-on-unmatched-pattern'],
    '*.{md,json,yaml,yml,html,css,scss,less}': 'vp fmt --no-error-on-unmatched-pattern',
    '*.vue': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix --no-error-on-unmatched-pattern'],
  })
})
