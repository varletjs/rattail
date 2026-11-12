import { isFunction } from '../general/isFunction'

export type MigrationStep = (value: unknown) => unknown

export interface MigrationOptions {
  currentVersion: number
  migrations: Readonly<Record<number, MigrationStep>>
  getVersion?: (this: void, value: unknown) => number | undefined
}

type MigrationInput = { value: unknown; version?: number }
type MigrationResult<Current> = { value: Current; version: number }

export type MigrationErrorReason = 'invalid-version' | 'unsupported-version' | 'missing-migration' | 'migration-failed'

export class MigrationError extends Error {
  constructor(
    public readonly reason: MigrationErrorReason,
    options: { fromVersion?: number; toVersion: number; cause?: unknown },
  ) {
    super(
      `Migration ${reason}${options.fromVersion === undefined ? '' : ` from version ${options.fromVersion}`} to version ${options.toVersion}.`,
      { cause: options.cause },
    )
    this.name = 'MigrationError'
    this.fromVersion = options.fromVersion
    this.toVersion = options.toVersion
  }

  readonly fromVersion: number | undefined
  readonly toVersion: number
}

export function createMigration<Current = unknown>(
  options: MigrationOptions & { getVersion: NonNullable<MigrationOptions['getVersion']> },
): {
  migrate(input: MigrationInput): Promise<MigrationResult<Current>>
}
export function createMigration<Current = unknown>(
  options: MigrationOptions,
): {
  migrate(input: MigrationInput & { version: number }): Promise<MigrationResult<Current>>
}
export function createMigration({ currentVersion, migrations, getVersion }: MigrationOptions) {
  if (!Number.isSafeInteger(currentVersion) || currentVersion < 1) {
    throw new MigrationError('invalid-version', { toVersion: currentVersion })
  }

  if (getVersion !== undefined && !isFunction(getVersion)) {
    throw new TypeError('Migration version resolver must be a function.')
  }

  const steps = Object.entries(migrations)
    .map(([key, migrate]) => {
      const version = Number(key)
      if (!Number.isSafeInteger(version) || version < 2 || version > currentVersion || String(version) !== key) {
        throw new MigrationError('invalid-version', { toVersion: version })
      }

      if (!isFunction(migrate)) {
        throw new TypeError('Migration step must be a function.')
      }

      return { version, migrate }
    })
    .sort((first, second) => first.version - second.version)

  return { migrate }

  async function migrate({ version, value }: MigrationInput) {
    if (version === undefined && getVersion) {
      try {
        version = getVersion(value)
      } catch (cause) {
        throw new MigrationError('invalid-version', { toVersion: currentVersion, cause })
      }
    }

    if (version === undefined || !Number.isSafeInteger(version) || version < 1) {
      throw new MigrationError('invalid-version', { fromVersion: version, toVersion: currentVersion })
    }

    if (version > currentVersion) {
      throw new MigrationError('unsupported-version', { fromVersion: version, toVersion: currentVersion })
    }

    const pending = steps.filter((step) => step.version > version)
    let expectedVersion = version + 1

    for (const step of pending) {
      if (step.version !== expectedVersion) {
        throw new MigrationError('missing-migration', { fromVersion: expectedVersion - 1, toVersion: expectedVersion })
      }

      expectedVersion += 1
    }

    if (expectedVersion !== currentVersion + 1) {
      throw new MigrationError('missing-migration', { fromVersion: expectedVersion - 1, toVersion: expectedVersion })
    }

    let result = value

    for (const step of pending) {
      try {
        result = await step.migrate(result)
      } catch (cause) {
        throw new MigrationError('migration-failed', {
          fromVersion: step.version - 1,
          toVersion: step.version,
          cause,
        })
      }
    }

    return { version: currentVersion, value: result }
  }
}
