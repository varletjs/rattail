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
  .command('publish')
  .description('Publish workspace packages to npm (pnpm recursive publish)')
  .option('-c, --checkRemoteVersion', 'Skip publish if the current version already exists on npm')
  .option('-t, --npmTag <tag>', 'npm dist-tag (e.g. beta, next); ignored when --pre-release is set')
  .option('--pre-release', 'Publish with alpha dist-tag')
  .action(async (options: { checkRemoteVersion?: boolean; npmTag?: string; preRelease?: boolean }) => {
    const { getConfig } = await import('./config')
    const { publish } = await import('./publish')
    const config = (await getConfig()).publish ?? {}

    return publish({
      ...config,
      ...(options.checkRemoteVersion ? { checkRemoteVersion: true } : {}),
      ...(options.npmTag != null ? { npmTag: options.npmTag } : {}),
      ...(options.preRelease ? { preRelease: true } : {}),
    })
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
