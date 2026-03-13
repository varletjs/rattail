# enumOf

Enum utility with TS-friendly types. Built-in fields: `value`, `label`, `description`. Supports extending with custom fields.

### Usage

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

### Built-in Fields

`label` and `description` are built-in. For i18n, you can use string getters in the config.

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

### Extended Fields

Besides `value`, `label`, and `description`, you can add any other fields (e.g. `color`). Access them via `.option(1).color`.

```ts
const Status = enumOf({
  Success: { value: 1, label: 'Success', color: 'green' },
  Warning: { value: 2, label: 'Warning', color: 'orange' },
})

Status.option(Status.Success).color // 'green'
```

### Arguments

| Arg      | Type     | Description                                                                                                          |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `config` | `object` | Keys are enum keys; values are primitives (`string`, `number`, `boolean`) or `{ value, label?, description?, ... }`. |

### Methods

| Method           | Description                         |
| ---------------- | ----------------------------------- |
| `values()`       | All enum values.                    |
| `label(v)`       | Label for value `v`.                |
| `labels()`       | Labels for all enum values.         |
| `description(v)` | Description for value `v`.          |
| `descriptions()` | Descriptions for all enum values.   |
| `option(v)`      | Option object for value `v`.        |
| `options()`      | Option objects for all enum values. |

### Type Utility

```ts
import { enumOf, type EnumOf } from 'rattail'

const Status = enumOf({ Idle: 0, Done: 1 })

type Status = EnumOf<typeof Status> // 0 | 1
```
