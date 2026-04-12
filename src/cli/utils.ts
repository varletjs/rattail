import fs from 'node:fs'
import { resolve } from 'path'

export function getCliVersion() {
  return JSON.parse(fs.readFileSync(resolve(__dirname, '../../package.json'), 'utf-8')).version
}
