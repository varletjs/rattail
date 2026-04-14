import { lockfileCheck as checkLockfile, type LockfileCheckOptions } from '@varlet/release'

export type LockfileCheckConfig = LockfileCheckOptions

export async function lockfileCheck(options?: LockfileCheckOptions) {
  await checkLockfile(options)
}
