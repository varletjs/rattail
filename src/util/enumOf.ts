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
