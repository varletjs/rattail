import { loadConfig } from 'unconfig'
import { callOrReturn } from '../function'

export type RattailConfig = {
  clean: {
    patterns: string[]
  }
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
