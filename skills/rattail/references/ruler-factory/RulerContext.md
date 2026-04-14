---
category: Types
---

# RulerContext

Full chainable context type produced by `ruler()`; use generics `R` (rule type), `P` (params), and `E` (extended methods from `extend`).

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L203-L283)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L194-L274)

## Type declarations

```ts
export type RulerContext<R, P, E> = Omit<
  {
    // helpers
    rules: R[]
    addRule: (validator: RulerFactoryValidator, params?: P) => RulerContext<R, P, E>
    generator: RulerFactoryGenerator<R, P>
    getMessage: (message: RulerFactoryMessage) => string
    // type
    type: string
    string: (message?: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    number: (message?: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    array: (message?: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    boolean: (message?: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    object: (message?: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    symbol: (message?: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    bigint: (message?: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    null: (message?: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    undefined: (message?: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    true: (message?: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    false: (message?: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    // validation
    length: (v: number, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    min: (v: number | bigint, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    max: (v: number | bigint, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    regex: (v: RegExp, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    required: (message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    startsWith: (v: string, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    endsWith: (v: string, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    includes: (v: string, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    uppercase: (message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    lowercase: (message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    email: (message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    gt: (v: number | bigint, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    gte: (v: number | bigint, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    lt: (v: number | bigint, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    lte: (v: number | bigint, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    positive: (message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    negative: (message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    uniq: (message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    uniqBy: (v: (a: any, b: any) => any, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    is: (v: (value: any) => boolean, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    not: (v: (value: any) => boolean, message: RulerFactoryMessage, params?: P) => RulerContext<R, P, E>
    done: () => R[]
    // transform
    transformer: (value: any) => any
    transform: (v: (value: any) => any) => void
    trim: () => RulerContext<R, P, E>
    shouldTrim: boolean
    toLowerCase: () => RulerContext<R, P, E>
    shouldToLowerCase: boolean
    toUpperCase: () => RulerContext<R, P, E>
    shouldToUpperCase: boolean
  },
  keyof E
> &
  E
```
