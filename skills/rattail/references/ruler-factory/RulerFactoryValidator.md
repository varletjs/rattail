---
category: Types
---

# RulerFactoryValidator

Internal validator: receives the (possibly transformed) value; return `undefined` if OK, or an `Error` if invalid.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L274-L276)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L265-L267)

## Type declarations

```ts
export type RulerFactoryValidator = (value: any) => undefined | Error
```
