import { rimraf } from 'rimraf'
import { getConfig } from './config'

export async function clean(patterns?: string[]) {
  const resolvedPatterns = patterns ?? (await getConfig()).clean?.patterns ?? []
  await rimraf(resolvedPatterns, { glob: true })
}
