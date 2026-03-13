# enumOf

枚举工具， ts 类型友好。内置 `value`, `label`, `description` 三个主要字段，支持字段扩展。

### 使用

```ts
import { enumOf } from 'rattail'

const Status = enumOf({
  Idle: 0,
  Pending: 1,
  Done: 2,
})

Status.Idle // 0
Status.Pending // 1
Status.Done // 2
Status.values() // [0, 1, 2]
```

### 主要字段

`label` 和 `description` 是枚举内置的两个主要字段，如果要支持 `i18n`，可以用字符串 `getter` 的配置形式。

```ts
const Status = enumOf({
  Success: { value: 1, label: 'Success', description: 'Success description' },
  Warning: { value: 2, label: () => 'Warning', description: () => 'Warning Description' },
})

Status.label(Status.Success) // 'Success'
Status.label(Status.Warning) // 'Warning'
Status.description(Status.Success) // 'Success description'
Status.description(Status.Warning) // 'Warning Description'
Status.options()
/*
[
  { value: 1, label: 'Success', description: 'Success description' },
  { value: 2, label: 'Warning', description: 'Warning Description' },
]
*/
```

### 扩展字段

除内置的 `value`, `label`, `description` 以外也支持配置其他任何字段，如 `color`, 但需要通过 `.option(1).color` 获取值。

```ts
const Status = enumOf({
  Success: { value: 1, label: 'Success', color: 'green' },
  Warning: { value: 2, label: 'Warning', color: 'orange' },
})

Status.option(Status.Success).color // 'green'
```

### 参数

| 参数     | 类型     | 说明                                                                                                           |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `config` | `object` | 键为枚举键；值为 `string`, `number`, `boolean` 类型的原始值或对象配置 `{ value, label?, description?, ... }`。 |

### 方法

| 方法             | 说明                             |
| ---------------- | -------------------------------- |
| `values()`       | 获取所有枚举值。                 |
| `label(v)`       | 获取枚举值的 label。             |
| `labels()`       | 获取所有枚举值对应的 label       |
| `description(v)` | 获取枚举值的 description。       |
| `descriptions()` | 获取所有枚举值对应的 description |
| `option(v)`      | 获取枚举值的 option              |
| `options()`      | 获取所有的枚举值对应的 option    |

### 类型工具

```ts
import { enumOf, type EnumOf } from 'rattail'

const Status = enumOf({ Idle: 0, Done: 1 })

type Status = EnumOf<typeof Status> // 0 | 1
```
