import { describe, expect, expectTypeOf, it, vi } from 'vite-plus/test'
import { createMigration, MigrationError, promiseWithResolvers, type MigrationStep } from '../src'

describe('createMigration', () => {
  it('keeps current values untouched without executing any step', async () => {
    const step = vi.fn()
    const migration = createMigration({ currentVersion: 2, migrations: { 2: step } })
    const value = { title: 'unchanged' }
    const result = await migration.migrate({ version: 2, value })

    expect(result).toEqual({ version: 2, value })
    expect(result.value).toBe(value)
    expect(step).not.toHaveBeenCalled()
    expectTypeOf(result.value).toEqualTypeOf<unknown>()
  })

  it('supports an initial version with no migrations', async () => {
    const migration = createMigration({ currentVersion: 1, migrations: {} })

    expect(await migration.migrate({ version: 1, value: null })).toEqual({ version: 1, value: null })
  })

  it('orders steps by target version and passes each result to the next step', async () => {
    const events: number[] = []
    const migration = createMigration({
      currentVersion: 3,
      migrations: {
        3(value) {
          events.push(3)
          return { previous: value, version: 3 }
        },
        async 2(value) {
          events.push(2)
          await Promise.resolve()
          return { previous: value, version: 2 }
        },
      },
    })

    expect(await migration.migrate({ version: 1, value: 'original' })).toEqual({
      version: 3,
      value: { previous: { previous: 'original', version: 2 }, version: 3 },
    })
    expect(events).toEqual([2, 3])
  })

  it('waits for a pending step before executing the following step', async () => {
    const gate = promiseWithResolvers<unknown>()
    const next = vi.fn((value: unknown) => value)
    const migration = createMigration({ currentVersion: 3, migrations: { 2: () => gate.promise, 3: next } })
    const pending = migration.migrate({ version: 1, value: 'before' })

    expect(next).not.toHaveBeenCalled()
    gate.resolve('after')
    expect(await pending).toEqual({ version: 3, value: 'after' })
    expect(next).toHaveBeenCalledExactlyOnceWith('after')
  })

  it('only executes steps after the input version', async () => {
    const previous = vi.fn()
    const next = vi.fn(() => 3)
    const migration = createMigration({ currentVersion: 3, migrations: { 2: previous, 3: next } })

    expect(await migration.migrate({ version: 2, value: 2 })).toEqual({ version: 3, value: 3 })
    expect(previous).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledExactlyOnceWith(2)
  })

  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1])(
    'rejects invalid current version %s',
    (currentVersion) => {
      expect(() => createMigration({ currentVersion, migrations: {} })).toThrow(MigrationError)
    },
  )

  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1])(
    'rejects invalid input version %s',
    async (version) => {
      const migration = createMigration({ currentVersion: 1, migrations: {} })

      await expect(migration.migrate({ version, value: {} })).rejects.toMatchObject({
        reason: 'invalid-version',
        fromVersion: version,
        toVersion: 1,
      })
    },
  )

  it('rejects future versions without executing callbacks', async () => {
    const step = vi.fn()
    const migration = createMigration({ currentVersion: 2, migrations: { 2: step } })

    await expect(migration.migrate({ version: 3, value: {} })).rejects.toMatchObject({
      name: 'MigrationError',
      reason: 'unsupported-version',
      fromVersion: 3,
      toVersion: 2,
    })
    expect(step).not.toHaveBeenCalled()
  })

  it.each<Readonly<Record<number, MigrationStep>>>([{ 3: vi.fn() }, { 2: vi.fn() }, { 2: vi.fn(), 4: vi.fn() }])(
    'checks the entire path before executing any callback',
    async (migrations) => {
      const migration = createMigration({ currentVersion: 4, migrations })

      await expect(migration.migrate({ version: 1, value: {} })).rejects.toMatchObject({
        reason: 'missing-migration',
      })
      for (const step of Object.values(migrations)) {
        expect(step).not.toHaveBeenCalled()
      }
    },
  )

  it('detects an empty path without iterating through a huge version range', async () => {
    const migration = createMigration({ currentVersion: Number.MAX_SAFE_INTEGER, migrations: {} })

    await expect(migration.migrate({ version: 1, value: {} })).rejects.toMatchObject({
      reason: 'missing-migration',
      fromVersion: 1,
      toVersion: 2,
    })
  })

  it.each([1, 0, -1, 2.5, 4])('rejects invalid registered target %s', (version) => {
    expect(() => createMigration({ currentVersion: 3, migrations: { [version]: () => undefined } })).toThrow(
      MigrationError,
    )
  })

  it('rejects noncanonical numeric keys', () => {
    const migrations = Object.fromEntries([['02', () => undefined]])

    expect(() => createMigration({ currentVersion: 2, migrations })).toThrow(MigrationError)
  })

  it('rejects nonfunction steps supplied from JavaScript', () => {
    expect(() => Reflect.apply(createMigration, undefined, [{ currentVersion: 2, migrations: { 2: null } }])).toThrow(
      TypeError,
    )
  })

  it.each(['sync', 'async'])('reports %s failures with their original cause and stops', async (mode) => {
    const cause = new Error('validation failed')
    const next = vi.fn()
    const migration = createMigration({
      currentVersion: 3,
      migrations: {
        2() {
          if (mode === 'async') {
            return Promise.reject(cause)
          }

          throw cause
        },
        3: next,
      },
    })

    await expect(migration.migrate({ version: 1, value: {} })).rejects.toMatchObject({
      name: 'MigrationError',
      reason: 'migration-failed',
      fromVersion: 1,
      toVersion: 2,
      cause,
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('does not swallow non-Error failures', async () => {
    const migration = createMigration({
      currentVersion: 2,
      migrations: { 2: () => Promise.reject('invalid source') },
    })

    await expect(migration.migrate({ version: 1, value: {} })).rejects.toMatchObject({ cause: 'invalid source' })
  })

  it('snapshots registered callbacks and keeps separate runs independent', async () => {
    const migrations = { 2: vi.fn((value: unknown) => ({ previous: value })) }
    const migration = createMigration({ currentVersion: 2, migrations })
    const original = migrations[2]
    migrations[2] = vi.fn()

    const results = await Promise.all([
      migration.migrate({ version: 1, value: 'first' }),
      migration.migrate({ version: 1, value: 'second' }),
    ])

    expect(results).toEqual([
      { version: 2, value: { previous: 'first' } },
      { version: 2, value: { previous: 'second' } },
    ])
    expect(original).toHaveBeenCalledTimes(2)
    expect(migrations[2]).not.toHaveBeenCalled()
  })

  it('passes undefined results through without inventing defaults', async () => {
    const migration = createMigration({ currentVersion: 2, migrations: { 2: () => undefined } })

    expect(await migration.migrate({ version: 1, value: 'before' })).toEqual({ version: 2, value: undefined })
  })
})
