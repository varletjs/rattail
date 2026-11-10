export type MigrationStep = (value: unknown) => unknown

export interface MigrationOptions {
  currentVersion: number
  migrations: Readonly<Record<number, MigrationStep>>
}

export type MigrationErrorReason = 'invalid-version' | 'unsupported-version' | 'missing-migration' | 'migration-failed'

export class MigrationError extends Error {
  constructor(
    public readonly reason: MigrationErrorReason,
    options: { fromVersion?: number; toVersion: number; cause?: unknown },
  ) {
    super(
      'Migration ' +
        reason +
        (options.fromVersion === undefined ? '' : ' from version ' + options.fromVersion) +
        ' to version ' +
        options.toVersion +
        '.',
      { cause: options.cause },
    )
    this.name = 'MigrationError'
    this.fromVersion = options.fromVersion
    this.toVersion = options.toVersion
  }

  readonly fromVersion: number | undefined
  readonly toVersion: number
}

export function createMigration({ currentVersion, migrations }: MigrationOptions) {
  if (!Number.isSafeInteger(currentVersion) || currentVersion < 1) {
    throw new MigrationError('invalid-version', { toVersion: currentVersion })
  }

  const steps = Object.entries(migrations)
    .map(([key, migrate]) => {
      const version = Number(key)
      if (!Number.isSafeInteger(version) || version < 2 || version > currentVersion || String(version) !== key) {
        throw new MigrationError('invalid-version', { toVersion: version })
      }

      if (typeof migrate !== 'function') {
        throw new TypeError('Migration step must be a function.')
      }

      return { version, migrate }
    })
    .sort((first, second) => first.version - second.version)

  return { migrate }

  async function migrate({ version, value }: { version: number; value: unknown }) {
    if (!Number.isSafeInteger(version) || version < 1) {
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
