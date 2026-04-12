import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import type { HookConfig } from './config'
import { getConfig } from './config'

export function getHooksDir() {
  try {
    const hooksPath = execSync('git config core.hooksPath', { encoding: 'utf-8' }).trim()
    return resolve(process.cwd(), dirname(hooksPath))
  } catch {
    throw new Error('core.hooksPath is not set. Run "vp config --hooks-dir <dir>" first.')
  }
}

export function writeHooks(hookConfig: HookConfig, hooksDir?: string) {
  const resolvedDir = hooksDir ?? getHooksDir()

  for (const [hookName, commands] of Object.entries(hookConfig)) {
    const hookFile = resolve(resolvedDir, hookName)
    fs.writeFileSync(hookFile, commands.join('\n') + '\n')
  }
}

export async function hook() {
  const config = await getConfig()
  writeHooks(config.hook ?? {})
}
