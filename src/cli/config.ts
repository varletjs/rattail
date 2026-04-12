import { GenerateOptions } from 'api-farmer'
import { loadConfig } from 'unconfig'
import { callOrReturn } from '../function'

export type GitHook =
  | 'applypatch-msg'
  | 'pre-applypatch'
  | 'post-applypatch'
  | 'pre-commit'
  | 'pre-merge-commit'
  | 'prepare-commit-msg'
  | 'commit-msg'
  | 'post-commit'
  | 'pre-rebase'
  | 'post-checkout'
  | 'post-merge'
  | 'pre-push'
  | 'pre-auto-gc'
  | 'post-rewrite'

export type HookConfig = Partial<Record<GitHook, string[]>>

export type RattailConfig = {
  clean?: {
    patterns?: string[]
  }

  hook?: HookConfig

  api?: GenerateOptions
}

export async function getConfig() {
  const { config } = await loadConfig<RattailConfig>({
    sources: [
      {
        files: 'vite.config',
        async rewrite(config) {
          const resolved = (await callOrReturn(config)) as any

          return resolved?.rattail
        },
      },
    ],
  })

  return config ?? {}
}
