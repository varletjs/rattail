# createMigration

Upgrades a value through consecutive format versions.

### Usage

```ts
import { createMigration, isNumber, isObject, isString } from 'rattail'

const migration = createMigration({
  currentVersion: 2,
  getVersion(value) {
    if (isString(value)) {
      return 1
    }

    if (isObject(value) && isNumber(value.schemaVersion)) {
      return value.schemaVersion
    }
  },
  migrations: {
    2(value) {
      if (!isString(value)) {
        throw new TypeError('V1 must be a string')
      }

      return { schemaVersion: 2, name: value }
    },
  },
})

await migration.migrate({ value: 'Ada' })
// { version: 2, value: { schemaVersion: 2, name: 'Ada' } }
```

### Options

| Option | Description |
| --- | --- |
| `currentVersion` | Target version as a positive safe integer |
| `migrations` | Sync or async steps keyed by target version. Key `2` upgrades V1 to V2. |
| `getVersion` | Optional synchronous function that reads a version from a custom field or infers it from the value's shape. Return `undefined` for an unrecognized value. |

### Method

`migrate({ version, value })` returns a promise for `{ version: number; value: unknown }`. With `getVersion` configured, call `migrate({ value })` to detect the starting version. An explicit `version` takes precedence.

Use `createMigration<Current>(options)` to declare the type of the returned `value`. The caller is responsible for ensuring the data matches `Current`.

### Notes

- A current-version value is returned as supplied. Invalid versions and missing steps reject before any migration step runs.
- Each step validates and transforms its input. Include any version field you want to persist in the returned value.
- Failures reject with `MigrationError`, which includes a `reason` and version information. If a callback throws or rejects, `cause` contains its error.
