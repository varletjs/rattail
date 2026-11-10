# createMigration

创建不依赖存储的迁移链，按连续的正整数格式版本逐级升级。

### 使用

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

| 字段 | 说明 |
| --- | --- |
| `currentVersion` | 目标格式版本，必须为正安全整数 |
| `migrations` | 以目标版本为 key，`2` 表示 V1 → V2 |
| `migrate({ version, value })` | 返回 `Promise<{ version: number; value: unknown }>` |

迁移 key 必须是 `2` 到当前版本之间的规范整数。创建时保存回调快照，支持同步或异步返回。

执行回调前先检查整段所需路径。输入已是当前版本时保留原始值引用。多次调用不共享执行状态；路径缺失时不会遍历无界整数区间。

### 错误

`MigrationError` 继承 `Error`，包含 `reason`、`fromVersion`、`toVersion`、`cause`。

| reason | 含义 |
| --- | --- |
| `invalid-version` | 当前、输入或注册的目标版本不合法 |
| `unsupported-version` | 输入高于当前版本 |
| `missing-migration` | 缺少所需的连续迁移步骤 |
| `migration-failed` | 回调抛错或拒绝，`cause` 保留原始原因 |

JavaScript 传入非函数回调时，创建阶段抛出 `TypeError`。步骤失败后立即停止。

### 职责边界

迁移函数负责旧数据校验、转换、新数据校验，包括业务指纹与关联关系。返回值保持 `unknown`，由调用方校验后使用。

执行器不推测或修改 `value.formatVersion`，不复制数据、回滚回调修改、写文件、加锁或备份。迁移函数应保持确定性，持久化提交与重试由调用方负责。
