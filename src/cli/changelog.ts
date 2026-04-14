import { changelog as generateChangelog, type ChangelogOptions } from '@varlet/release'
import { getConfig } from './config'

export type ChangelogConfig = ChangelogOptions

export async function changelog(config?: ChangelogConfig) {
  const resolvedConfig = config ?? (await getConfig()).changelog ?? {}
  await generateChangelog(resolvedConfig)
}
