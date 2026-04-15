import { publish as publishPackages, type PublishCommandOptions } from '@varlet/release'
import { getConfig } from './config'

export type PublishConfig = PublishCommandOptions

export async function publish(config?: PublishConfig) {
  const resolvedConfig = config ?? (await getConfig()).publish ?? {}
  await publishPackages(resolvedConfig)
}
