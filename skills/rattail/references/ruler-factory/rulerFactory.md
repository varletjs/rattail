---
category: Package
---

# rulerFactory

Creates a configurable `ruler()` function that returns a chainable `RulerContext`; you pass a `generator` that wraps each internal validator into your UI library rule shape.

## Documentation

- [English (README — integration & extend)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L25-L201)
- [Chinese README — integration & extend](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L25-L192)

## Usage

```ts
import { rulerFactory } from 'rattail/ruler-factory'

const r = rulerFactory((validator) => {
  return (value) => {
    const e = validator(value)
    return e ? e.message : true
  }
})

r().string('Not a string').required('Required').min(2, 'Too short').done()
```

## Source

[Full rulerFactory implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L79-L650)

```ts
export function rulerFactory<R, P = R, E extends Record<string, any> = {}>(
  generator: RulerFactoryGenerator<R, P>,
  extend?: (ctx: RulerContext<R, P, E>) => E,
)
```
