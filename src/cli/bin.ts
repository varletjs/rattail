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

program.parse()
