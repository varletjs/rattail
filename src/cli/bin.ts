#!/usr/bin/env node
import { Command } from 'commander'
import { clean } from './clean'
import { getCliVersion } from './utils'

const program = new Command()

program.version(getCliVersion())

program.command('clean').description('Remove files and directories').argument('<patterns...>').action(clean)

program.parse()
