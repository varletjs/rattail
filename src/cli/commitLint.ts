import { commitLint as lintCommit, type CommitLintCommandOptions } from '@varlet/release'

export type CommitLintConfig = CommitLintCommandOptions

export function commitLint(options: CommitLintCommandOptions) {
  lintCommit(options)
}
