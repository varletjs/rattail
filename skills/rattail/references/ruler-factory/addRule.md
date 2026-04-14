---
category: Custom
---

# addRule

Low-level: push a custom RulerFactoryValidator; it runs after transformer and receives the transformed value.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L274-L276)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L265-L267)

## Usage

```ts
ctx.addRule((value) => (value === 'ok' ? undefined : new Error('no')), params)
```

## Source

[addRule implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L628-L638)

```ts
function addRule(validator: RulerFactoryValidator, params?: P) {
  rules.push(
    generator((value) => {
      value = ctx.transformer(value)

      return validator(value)
    }, params),
  )

  return ctx
}
```
