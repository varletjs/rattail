#!/usr/bin/env node
import { Command } from 'commander'
import { api } from './api'
import { changelog } from './changelog'
import { clean } from './clean'
import { commitLint } from './commitLint'
import { getConfig } from './config'
import { hook } from './hook'
import { lockfileCheck } from './lockfileCheck'
import { publish } from './publish'
import { release } from './release'
import { getCliVersion } from './utils'

const program = new Command()

program.version(getCliVersion())

program
  .command('clean')
  .description('Remove files and directories')
  .argument('[patterns...]')
  .action((patterns: string[]) => {
    return clean(patterns.length ? patterns : undefined)
  })

program
  .command('api')
  .description('Generate API modules from OpenAPI/Swagger schema')
  .action(() => {
    return api()
  })

program
  .command('hook')
  .description('Install git hooks from config')
  .action(() => {
    return hook()
  })

program
  .command('release')
  .description('Release all packages and generate changelogs')
  .option('-t, --npmTag <tag>', 'npm dist-tag (e.g. beta, next)')
  .option('-r, --remote <remote>', 'Git remote name for pushing')
  .option('--skip-npm-publish', 'Skip npm publish')
  .option('--skip-changelog', 'Skip changelog generation')
  .option('--skip-git-tag', 'Skip git tag')
  .option('-c, --check-remote-version', 'Skip publish if the current version already exists on npm')
  .action(
    async (options: {
      npmTag?: string
      remote?: string
      skipNpmPublish?: boolean
      skipChangelog?: boolean
      skipGitTag?: boolean
      checkRemoteVersion?: boolean
    }) => {
      const config = (await getConfig()).release ?? {}

      return release({
        ...config,
        ...(options.npmTag != null ? { npmTag: options.npmTag } : {}),
        ...(options.remote != null ? { remote: options.remote } : {}),
        ...(options.skipNpmPublish ? { skipNpmPublish: true } : {}),
        ...(options.skipChangelog ? { skipChangelog: true } : {}),
        ...(options.skipGitTag ? { skipGitTag: true } : {}),
        ...(options.checkRemoteVersion ? { checkRemoteVersion: true } : {}),
      })
    },
  )

program
  .command('publish')
  .description('Publish workspace packages to npm (pnpm recursive publish)')
  .option('-c, --checkRemoteVersion', 'Skip publish if the current version already exists on npm')
  .option('-t, --npmTag <tag>', 'npm dist-tag (e.g. beta, next); ignored when --pre-release is set')
  .option('--pre-release', 'Publish with alpha dist-tag')
  .action(async (options: { checkRemoteVersion?: boolean; npmTag?: string; preRelease?: boolean }) => {
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
  .action(() => {
    return changelog()
  })

program
  .command('commit-lint')
  .description('Lint commit message')
  .argument('<commitMessagePath>', 'Git commit message path')
  .action((commitMessagePath: string) => {
    return commitLint({ commitMessagePath })
  })

program
  .command('lockfile-check')
  .description('Check if lockfile has been updated and auto-install dependencies')
  .option('-m, --packageManager <manager>', 'Package manager (npm, yarn, pnpm)')
  .option('-s, --skipInstall', 'Skip install dependencies when lockfile changed')
  .action((options: Record<string, unknown>) => {
    return lockfileCheck(options as any)
  })

program.parse()
