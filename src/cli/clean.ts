import { rimraf } from 'rimraf'
import { isArray, isString } from '../general'
import type { CleanConfig } from './config'
import { getConfig } from './config'

function resolveCleanPatterns(clean?: CleanConfig): string[] {
  if (!clean) {
    return []
  }

  if (isString(clean)) {
    return [clean]
  }

  if (isArray(clean)) {
    return clean
  }

  return clean.patterns ?? []
}

export async function clean(patterns?: string[]) {
  const resolvedPatterns = patterns ?? resolveCleanPatterns((await getConfig()).clean)
  await rimraf(resolvedPatterns, { glob: true })
}
