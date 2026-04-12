import { generate, type GenerateOptions } from 'api-farmer'
import { getConfig } from './config'

export type ApiConfig = GenerateOptions

export async function api(config?: ApiConfig) {
  const resolvedConfig = config ?? (await getConfig()).api ?? {}

  await generate(resolvedConfig)
}
