import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export function getCliVersion() {
  return JSON.parse(fs.readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '../../package.json'), 'utf-8'))
    .version
}
