import type { UserConfig, ConfigEnv } from '@voidzero-dev/vite-plus-core'
import { defineConfig as defineVitePlusConfig } from 'vite-plus'
import type { RattailConfig } from '../cli/config'

export type {
  LintOptions,
  LintOptionsVue,
  FmtOptions,
  StagedConfig,
  CreateVueConfigOptions,
  OxlintConfig,
  OxlintOverride,
  DummyRule,
} from '@configurajs/vite-plus'

export type { RattailConfig }

export type RattailUserConfig = UserConfig & { rattail?: RattailConfig }

export type RattailUserConfigFn = (env: ConfigEnv) => RattailUserConfig | Promise<RattailUserConfig>

export type RattailUserConfigExport = RattailUserConfig | Promise<RattailUserConfig> | RattailUserConfigFn

export { lint, fmt, staged } from '@configurajs/vite-plus'

export function defineConfig(config: RattailUserConfigExport) {
  return defineVitePlusConfig(config as any)
}

export function clean({ patterns }: { patterns?: string[] } = {}) {
  return {
    patterns: ['**/node_modules', '**/dist', '**/coverage', ...(patterns ?? [])],
  }
}
