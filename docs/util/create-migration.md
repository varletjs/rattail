# createMigration

Creates a storage-independent chain of consecutive positive integer format versions.

### Usage

```ts
import { createMigration, isNumber, isObject } from 'rattail'

const migration = createMigration({
  currentVersion: 3,
  migrations: {
    2(value) {
      if (!isNumber(value)) {
        throw new TypeError('V1 must be a number')
      }
      return { count: value }
    },
    async 3(value) {
      if (!isObject(value) || !isNumber(value.count)) {
        throw new TypeError('V2 must contain a count')
      }
      return { count: value.count, enabled: true }
    },
  },
})

const result = await migration.migrate({ version: 1, value: 5 })
// { version: 3, value: { count: 5, enabled: true } }
```

### API

| Field | Description |
| --- | --- |
| `currentVersion` | Target format, a positive safe integer |
| `migrations` | Record keyed by target version; `2` means V1 → V2 |
| `migrate({ version, value })` | Returns `Promise<{ version: number; value: unknown }>` |

Targets must be canonical integer keys from `2` through `currentVersion`. Callbacks are snapshotted at creation and may return synchronously or asynchronously.

The entire required path is checked before any callback runs. Current-version inputs return their original value reference. Invocations have independent execution state. Missing paths do not cause iteration through an unbounded integer range.

### Errors

`MigrationError` extends `Error` with `reason`, `fromVersion`, `toVersion` and `cause`.

| Reason | Meaning |
| --- | --- |
| `invalid-version` | Invalid current, input or registered target version |
| `unsupported-version` | Input exceeds the current version |
| `missing-migration` | Required consecutive step missing |
| `migration-failed` | Callback threw or rejected; `cause` retains the failure |

A nonfunction callback supplied from JavaScript throws `TypeError` during creation. A failed step stops the chain.

### Responsibilities

Callbacks own source validation, conversion and target validation, including domain checksums and relationships. Results remain `unknown` until the caller validates them.

The executor does not infer or change `value.formatVersion`, clone values, roll back callback mutations, persist files, acquire locks or create backups. Keep callbacks deterministic; callers control durable commits and retries.
