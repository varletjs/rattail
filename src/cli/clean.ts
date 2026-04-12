import { rimraf } from 'rimraf'

export async function clean(patterns: string[]) {
  await rimraf(patterns, { glob: true })
}
