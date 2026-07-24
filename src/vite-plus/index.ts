import type { OxfmtConfig } from 'oxfmt'
import type { DummyRule, OxlintConfig, OxlintOverride } from 'oxlint'
import { defineConfig as defineVitePlusConfig, type ConfigEnv, type UserConfig } from 'vite-plus'
import type { HookConfig, RattailConfig } from '../cli/config'

export type { DummyRule, OxlintConfig, OxlintOverride }
export type { RattailConfig }

type LintConfigContribution = Pick<
  OxlintConfig,
  'plugins' | 'categories' | 'rules' | 'overrides' | 'globals' | 'env' | 'settings'
>

export interface CreateVueConfigOptions {
  version?: 2 | 3
}

export type LintOptionsVue = Partial<Pick<CreateVueConfigOptions, 'version'>>

export type StagedConfig = Record<string, string | string[]>

export interface FmtOptions {
  /**
   * Ignore file patterns
   */
  ignores?: string[]
}

export interface LintOptions {
  /**
   * Enable TypeScript support
   * @default true
   */
  ts?: boolean
  /**
   * Enable Vue support, version 3 by default
   * @default true
   */
  vue?: boolean | LintOptionsVue
  /**
   * Enable React support
   * @default false
   */
  react?: boolean
  /**
   * Enable Vitest support
   * @default true
   */
  vitest?: boolean
  /**
   * Custom rules
   */
  rules?: Record<string, DummyRule>
  /**
   * Ignore file patterns
   */
  ignores?: string[]
  /**
   * Additional overrides
   */
  overrides?: OxlintOverride[]
}

const DEFAULT_IGNORES = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',
  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.svelte-kit',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.vscode',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/.yarn',
  '**/vite.config.*.timestamp-*',
  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
  '**/.vite-hooks/**',
]

function createIgnoresConfig(ignores: string[] = []): string[] {
  return [...DEFAULT_IGNORES, ...ignores]
}

function createJsConfig(): LintConfigContribution {
  return {
    plugins: ['eslint', 'oxc', 'unicorn', 'import'],
    categories: { correctness: 'off' },
    env: {
      browser: true,
      node: true,
      es2024: true,
    },
    rules: {
      'constructor-super': 'error',
      'for-direction': 'error',
      'no-async-promise-executor': 'error',
      'no-caller': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-constant-binary-expression': 'error',
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-empty-static-block': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-import-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-iterator': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-obj-calls': 'error',
      'no-self-assign': 'error',
      'no-setter-return': 'error',
      'no-sparse-arrays': 'error',
      'no-this-before-super': 'error',
      'no-unassigned-vars': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        },
      ],
      'no-unused-labels': 'error',
      'no-unused-private-class-members': 'error',
      'no-unused-vars': [
        'error',
        {
          args: 'none',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          vars: 'all',
        },
      ],
      'no-useless-backreference': 'error',
      'no-useless-catch': 'error',
      'no-useless-escape': 'error',
      'no-useless-rename': 'error',
      'no-with': 'error',
      'require-yield': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: 'error',
      yoda: 'error',
      'default-param-last': 'error',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'require-await': 'error',
      'symbol-description': 'error',

      'oxc/bad-array-method-on-arguments': 'error',
      'oxc/bad-char-at-comparison': 'error',
      'oxc/bad-comparison-sequence': 'error',
      'oxc/bad-min-max-func': 'error',
      'oxc/bad-object-literal-comparison': 'error',
      'oxc/bad-replace-all-arg': 'error',
      'oxc/const-comparisons': 'error',
      'oxc/double-comparisons': 'error',
      'oxc/erasing-op': 'error',
      'oxc/missing-throw': 'error',
      'oxc/number-arg-out-of-range': 'error',
      'oxc/only-used-in-recursion': 'error',
      'oxc/uninvoked-array-callback': 'error',

      'unicorn/no-await-in-promise-methods': 'error',
      'unicorn/no-empty-file': 'error',
      'unicorn/no-invalid-fetch-options': 'error',
      'unicorn/no-invalid-remove-event-listener': 'error',
      'unicorn/no-new-array': 'error',
      'unicorn/no-single-promise-in-promise-methods': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/no-useless-fallback-in-spread': 'error',
      'unicorn/no-useless-length-check': 'error',
      'unicorn/no-useless-spread': 'error',
      'unicorn/prefer-set-size': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',

      'import/default': 'error',
      'import/namespace': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-self-import': 'error',
    },
  }
}

function createTsConfig(exts: string[] = []): LintConfigContribution {
  const files = ['**/*.?([cm])ts', '**/*.?([cm])tsx', ...exts.map((ext) => `**/*.${ext}`)]

  return {
    plugins: ['typescript'],
    overrides: [
      {
        files,
        rules: {
          'no-unused-expressions': 'off',
          'no-unused-vars': 'off',
          'no-redeclare': 'off',
          'no-undef': 'off',

          'no-var': 'error',
          'prefer-const': 'error',
          'prefer-rest-params': 'error',
          'prefer-spread': 'error',

          'typescript/await-thenable': 'error',
          'typescript/no-array-constructor': 'error',
          'typescript/no-array-delete': 'error',
          'typescript/no-base-to-string': 'error',
          'typescript/no-duplicate-enum-values': 'error',
          'typescript/no-duplicate-type-constituents': 'error',
          'typescript/no-extra-non-null-assertion': 'error',
          'typescript/no-floating-promises': 'error',
          'typescript/no-for-in-array': 'error',
          'typescript/no-implied-eval': 'error',
          'typescript/no-meaningless-void-operator': 'error',
          'typescript/no-misused-new': 'error',
          'typescript/no-namespace': 'error',
          'typescript/no-non-null-asserted-optional-chain': 'error',
          'typescript/no-redundant-type-constituents': 'error',
          'typescript/no-require-imports': 'error',
          'typescript/no-this-alias': 'error',
          'typescript/no-unnecessary-parameter-property-assignment': 'error',
          'typescript/no-unnecessary-type-constraint': 'error',
          'typescript/no-unsafe-declaration-merging': 'error',
          'typescript/no-unsafe-function-type': 'error',
          'typescript/no-unsafe-unary-minus': 'error',
          'typescript/no-useless-empty-export': 'error',
          'typescript/no-wrapper-object-types': 'error',
          'typescript/prefer-as-const': 'error',
          'typescript/prefer-namespace-keyword': 'error',
          'typescript/prefer-string-starts-ends-with': 'error',
          'typescript/restrict-template-expressions': 'error',
          'typescript/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
          'typescript/no-non-null-asserted-nullish-coalescing': 'error',
          'typescript/no-useless-constructor': 'error',
          'typescript/prefer-literal-enum-member': 'error',
          'typescript/unified-signatures': 'error',
          'typescript/no-unused-expressions': [
            'error',
            {
              allowShortCircuit: true,
              allowTaggedTemplates: true,
              allowTernary: true,
            },
          ],
          'typescript/no-unused-vars': [
            'error',
            {
              args: 'none',
              caughtErrors: 'none',
              ignoreRestSiblings: true,
              vars: 'all',
            },
          ],
        },
      },
    ],
  }
}

function createVueConfig(options: CreateVueConfigOptions = {}): LintConfigContribution {
  const { version = 3 } = options

  return {
    plugins: ['vue'],
    rules: {
      'vue/no-arrow-functions-in-watch': 'error',
      'vue/no-deprecated-destroyed-lifecycle': version === 2 ? 'off' : 'error',
      'vue/no-export-in-script-setup': 'error',
      'vue/no-lifecycle-after-await': 'error',
      'vue/no-multiple-slot-args': 'warn',
      'vue/no-this-in-before-route-enter': 'error',
      'vue/prefer-import-from-vue': 'error',
      'vue/valid-define-emits': 'error',
      'vue/valid-define-props': 'error',
    },
    globals: {
      computed: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      defineProps: 'readonly',
      onMounted: 'readonly',
      onUnmounted: 'readonly',
      reactive: 'readonly',
      ref: 'readonly',
      shallowReactive: 'readonly',
      shallowRef: 'readonly',
      toRef: 'readonly',
      toRefs: 'readonly',
      watch: 'readonly',
      watchEffect: 'readonly',
    },
  }
}

function createReactConfig(): LintConfigContribution {
  return {
    plugins: ['react'],
    overrides: [
      {
        files: ['**/*.?([cm])[jt]s?(x)'],
        rules: {
          'react/exhaustive-deps': 'warn',
          'react/forward-ref-uses-ref': 'error',
          'react/jsx-key': 'error',
          'react/jsx-no-duplicate-props': 'warn',
          'react/jsx-no-undef': 'error',
          'react/jsx-props-no-spread-multi': 'error',
          'react/jsx-uses-vars': 'warn',
          'react/jsx-no-comment-textnodes': 'warn',
          'react/jsx-no-target-blank': 'warn',
          'react/jsx-no-script-url': 'warn',
          'react/jsx-boolean-value': 'warn',
          'react/jsx-no-useless-fragment': 'warn',
          'react/no-access-state-in-setstate': 'error',
          'react/no-array-index-key': 'warn',
          'react/no-children-prop': 'error',
          'react/no-danger': 'warn',
          'react/no-danger-with-children': 'error',
          'react/no-deprecated': 'error',
          'react/no-did-mount-set-state': 'error',
          'react/no-direct-mutation-state': 'error',
          'react/no-find-dom-node': 'error',
          'react/no-is-mounted': 'error',
          'react/no-render-return-value': 'error',
          'react/no-string-refs': 'error',
          'react/no-this-in-sfc': 'error',
          'react/no-unsafe': 'error',
          'react/no-unstable-nested-components': 'error',
          'react/no-will-update-set-state': 'error',
          'react/void-dom-elements-no-children': 'warn',
          'react/button-has-type': 'warn',
          'react/iframe-missing-sandbox': 'warn',
          'react/rules-of-hooks': 'error',
        },
      },
    ],
  }
}

function createVitestConfig(): LintConfigContribution {
  return {
    plugins: ['vitest'],
    overrides: [
      {
        files: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
        rules: {
          'vitest/consistent-each-for': 'error',
          'vitest/hoisted-apis-on-top': 'error',
          'vitest/no-commented-out-tests': 'warn',
          'vitest/no-conditional-tests': 'error',
          'vitest/no-identical-title': 'error',
          'vitest/no-import-node-test': 'warn',
          'vitest/require-awaited-expect-poll': 'error',
          'vitest/require-local-test-context-for-concurrent-snapshots': 'warn',
          'vitest/require-mock-type-parameters': 'error',
          'vitest/valid-describe-callback': 'error',
          'vitest/valid-expect': 'error',
          'vitest/valid-title': 'error',
          'vitest/warn-todo': 'error',
        },
      },
    ],
  }
}

function mergeContributions(...contributions: LintConfigContribution[]): OxlintConfig {
  const categories: OxlintConfig['categories'] = {}
  const rules: Record<string, DummyRule> = {}
  const overrides: OxlintConfig['overrides'] = []
  const globals: OxlintConfig['globals'] = {}
  const env: Record<string, boolean> = {}
  const settings: Record<string, unknown> = {}
  const plugins: Array<OxlintConfig['plugins'] extends (infer T)[] | undefined ? T : never> = []

  contributions.forEach((contribution) => {
    contribution.plugins?.forEach((plugin) => plugins.push(plugin))

    Object.assign(categories, contribution.categories)
    Object.assign(rules, contribution.rules)
    Object.assign(globals, contribution.globals)
    Object.assign(env, contribution.env)
    Object.assign(settings, contribution.settings)

    if (contribution.overrides) {
      overrides.push(...contribution.overrides)
    }
  })

  return {
    plugins,
    categories,
    rules,
    overrides,
    globals,
    env,
    settings,
  }
}

export function lint(options: LintOptions = {}): OxlintConfig {
  const { ts = true, vue = true, react = false, vitest = true, ignores = [], rules = {}, overrides = [] } = options

  const contributions: LintConfigContribution[] = [createJsConfig()]

  if (ts) {
    contributions.push(createTsConfig(vue ? ['vue'] : []))
  }

  if (vue) {
    contributions.push(createVueConfig({ version: vue === true ? 3 : (vue.version ?? 3) }))
  }

  if (react) {
    contributions.push(createReactConfig())
  }

  if (vitest) {
    contributions.push(createVitestConfig())
  }

  contributions.push({ rules })

  const config = mergeContributions(...contributions)

  config.ignorePatterns = createIgnoresConfig(ignores)
  config.overrides = [...(config.overrides ?? []), ...overrides]

  return config
}

export function staged(): StagedConfig {
  return {
    '*.{js,jsx,ts,tsx}': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix --no-error-on-unmatched-pattern'],
    '*.{md,json,yaml,yml,html,css,scss,less}': 'vp fmt --no-error-on-unmatched-pattern',
    '*.vue': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix --no-error-on-unmatched-pattern'],
  }
}

export function fmt(options: FmtOptions = {}): OxfmtConfig {
  const { ignores = [] } = options

  return {
    semi: false,
    printWidth: 120,
    singleQuote: true,
    sortImports: {
      newlinesBetween: false,
    },
    sortTailwindcss: true,
    ignorePatterns: createIgnoresConfig(ignores),
  }
}

export type RattailUserConfig = UserConfig & { rattail?: RattailConfig }

export type RattailUserConfigFn = (env: ConfigEnv) => RattailUserConfig | Promise<RattailUserConfig>

export type RattailUserConfigExport = RattailUserConfig | Promise<RattailUserConfig> | RattailUserConfigFn

export function defineConfig(config: RattailUserConfigExport): RattailUserConfig {
  return defineVitePlusConfig(config as any)
}

export function clean({ patterns }: { patterns?: string[] } = {}) {
  return {
    patterns: ['**/node_modules', '**/dist', '**/coverage', ...(patterns ?? [])],
  }
}

export type { HookConfig }

export function hook({
  commitLint = true,
  lockfileCheck = true,
}: {
  commitLint?: boolean
  lockfileCheck?: boolean
} = {}): HookConfig {
  const config: HookConfig = {}

  if (commitLint) {
    config['commit-msg'] = ['rt commit-lint $1']
  }

  if (lockfileCheck) {
    config['post-merge'] = ['rt lockfile-check']
  }

  return config
}
