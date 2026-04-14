#!/usr/bin/env node
import { Command } from 'commander'
import { getCliVersion } from './utils'

const program = new Command()

program.version(getCliVersion())

program
  .command('clean')
  .description('Remove files and directories')
  .argument('[patterns...]')
  .action(async (patterns: string[]) => {
    const { clean } = await import('./clean')

    return clean(patterns.length ? patterns : undefined)
  })

program
  .command('api')
  .description('Generate API modules from OpenAPI/Swagger schema')
  .action(async () => {
    const { api } = await import('./api')

    return api()
  })

program
  .command('hook')
  .description('Install git hooks from config')
  .action(async () => {
    const { hook } = await import('./hook')

    return hook()
  })

program
  .command('release')
  .description('Release all packages and generate changelogs')
  .action(async () => {
    const { release } = await import('./release')

    return release()
  })

program
  .command('changelog')
  .description('Generate changelog')
  .action(async () => {
    const { changelog } = await import('./changelog')

    return changelog()
  })

program
  .command('commit-lint')
  .description('Lint commit message')
  .argument('<commitMessagePath>', 'Git commit message path')
  .action(async (commitMessagePath: string) => {
    const { commitLint } = await import('./commitLint')

    return commitLint({ commitMessagePath })
  })

program
  .command('lockfile-check')
  .description('Check if lockfile has been updated and auto-install dependencies')
  .option('-m, --packageManager <manager>', 'Package manager (npm, yarn, pnpm)')
  .option('-s, --skipInstall', 'Skip install dependencies when lockfile changed')
  .action(async (options: Record<string, unknown>) => {
    const { lockfileCheck } = await import('./lockfileCheck')

    return lockfileCheck(options as any)
  })

program.parse()
