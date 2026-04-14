import { release as releaseAll, type ReleaseCommandOptions } from '@varlet/release'
import { getConfig } from './config'

export type ReleaseConfig = ReleaseCommandOptions

export async function release(config?: ReleaseConfig) {
  const resolvedConfig = config ?? (await getConfig()).release ?? {}
  await releaseAll(resolvedConfig)
}
