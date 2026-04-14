---
category: Util
---

# enumOf

Enum utility with TS-friendly types. Built-in fields: `value`, `label`, `description`. Supports extending with custom fields.

## Documentation

- [English](https://rattail.varletjs.org/util/enum-of)
- [Chinese docs](https://rattail.varletjs.org/zh/util/enum-of)

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

## Type declarations

```ts
import { callOrReturn } from '../function'
import { isPlainObject } from '../general'

type ValueOf<T> = T[keyof T]

export type EnumOfValue = string | number | boolean

export type EnumOfStringOrGetter = string | (() => string)

export type EnumOfValueObject = {
  value: EnumOfValue
  label?: EnumOfStringOrGetter
  description?: EnumOfStringOrGetter
}

export type EnumOfConfigValue = EnumOfValue | (EnumOfValueObject & Record<string, unknown>)

export type EnumOfNormalizeToOption<V> = V extends { value: unknown }
  ? V
  : { value: V; label?: EnumOfStringOrGetter; description?: EnumOfStringOrGetter }

export type EnumOfResolvedField<V> = V extends (...args: any[]) => infer R ? R : V

export type EnumOfResolvedOption<O> = O extends unknown ? { [K in keyof O]: EnumOfResolvedField<O[K]> } : never

export type EnumOfExtractOptionShape<T extends Record<string, EnumOfConfigValue>> = EnumOfResolvedOption<
  EnumOfNormalizeToOption<ValueOf<T>>
>

export type EnumOfExtractValues<T extends object> = {
  [P in keyof T]: T[P] extends { value: infer V } ? V : T[P]
}

export type EnumOfKeyForValue<T extends object, V> = {
  [K in keyof T]: EnumOfExtractValues<T>[K] extends V ? (V extends EnumOfExtractValues<T>[K] ? K : never) : never
}[keyof T]

export type EnumOfOptionForValue<T extends Record<string, EnumOfConfigValue>, Value> = Value extends infer V
  ? EnumOfKeyForValue<T, V> extends keyof T
    ? EnumOfResolvedOption<EnumOfNormalizeToOption<T[EnumOfKeyForValue<T, V>]>>
    : EnumOfExtractOptionShape<T>
  : never

export type EnumOfResultMethods<V, T extends Record<string, EnumOfConfigValue>> = {
  values(): V[]
  label(v: V): string
  labels(): string[]
  description(v: V): string
  descriptions(): string[]
  option<Value extends V>(v: Value): EnumOfOptionForValue<T, Value>
  options(): EnumOfExtractOptionShape<T>[]
}

export type EnumOfResult<T extends Record<string, EnumOfConfigValue>> = EnumOfExtractValues<T> &
  EnumOfResultMethods<ValueOf<EnumOfExtractValues<T>>, T>

export function enumOf<const T extends Record<string, EnumOfConfigValue>>(config: T): EnumOfResult<T> {
  const extractValues = Object.entries(config).reduce((result, [key, value]) => {
    result[key as keyof typeof result] = (isPlainObject(value) ? value.value : value) as any
    return result
  }, {} as EnumOfExtractValues<T>)

  const configValues = Object.values(config)

  function label(v: ValueOf<EnumOfExtractValues<T>>) {
    const valueObject = getValueObject(v)
    return valueObject?.label ? callOrReturn(valueObject.label) : ''
  }

  function description(v: ValueOf<EnumOfExtractValues<T>>) {
    const valueObject = getValueObject(v)
    return valueObject?.description ? callOrReturn(valueObject.description) : ''
  }

  function values() {
    return configValues.map((option) => (isPlainObject(option) ? option.value : option)) as ValueOf<
      EnumOfExtractValues<T>
    >[]
  }

  function labels() {
    return configValues.map((option) => {
      if (isPlainObject(option)) {
        return option.label ? callOrReturn(option.label) : ''
      }

      return ''
    })
  }

  function descriptions() {
    return configValues.map((option) => {
      if (isPlainObject(option)) {
        return option.description ? callOrReturn(option.description) : ''
      }

      return ''
    })
  }

  function resolveOption(option: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {}

    for (const key of Object.keys(option)) {
      result[key] = callOrReturn(option[key])
    }

    return result
  }

  function option(v: ValueOf<EnumOfExtractValues<T>>) {
    const valueObject = getValueObject(v)

    if (valueObject) {
      return resolveOption(valueObject as Record<string, unknown>) as EnumOfExtractOptionShape<T>
    }

    return {
      value: v,
      label: '',
      description: '',
    } as EnumOfExtractOptionShape<T>
  }

  function options(): EnumOfExtractOptionShape<T>[] {
    return configValues.map((option) => {
      if (isPlainObject(option)) {
        return resolveOption(option as Record<string, unknown>) as EnumOfExtractOptionShape<T>
      }

      return {
        value: option,
        label: '',
        description: '',
      } as EnumOfExtractOptionShape<T>
    })
  }

  function getValueObject(v: ValueOf<EnumOfExtractValues<T>>) {
    return configValues.find((option) => isPlainObject(option) && option.value === v) as EnumOfValueObject | undefined
  }

  return {
    ...extractValues,
    values,
    label,
    description,
    labels,
    descriptions,
    option,
    options,
  } as EnumOfResult<T>
}

export type EnumOf<T extends { values: () => any[] }> = ReturnType<T['values']>[number]
```
