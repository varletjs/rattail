# createMigration

按连续版本逐级升级数据。

### 使用

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

### 配置

| 配置项 | 说明 |
| --- | --- |
| `currentVersion` | 目标版本，必须是正安全整数 |
| `migrations` | 以目标版本为键的同步或异步迁移函数。键 `2` 表示从 V1 升级到 V2。 |
| `getVersion` | 可选的同步函数，可读取自定义版本字段或按数据结构判断版本。无法识别时返回 `undefined`。 |

### 方法

`migrate({ version, value })` 返回包含 `{ version: number; value: unknown }` 的 Promise。配置 `getVersion` 后，可以调用 `migrate({ value })` 识别起始版本。显式传入的 `version` 优先。单独声明配置时，可以用 `satisfies MigrationOptions` 保留 `getVersion` 已配置的类型信息。

通过 `createMigration<Current>(options)` 指定返回的 `value` 类型。调用方负责确保数据符合 `Current`。

### 注意事项

- 数据已经是当前版本时直接返回原值。版本无效或缺少迁移步骤时，会在执行任何步骤前报错。
- 每一步负责校验并转换输入。需要持久化的版本字段由迁移函数写入返回值。
- 迁移失败时抛出 `MigrationError`，包含 `reason` 和相关版本。回调抛错或拒绝时，可通过 `cause` 获取原始错误。
