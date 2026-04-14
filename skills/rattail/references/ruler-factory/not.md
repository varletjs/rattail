---
category: Predicates
---

# not

Fails when the predicate returns truthy.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L265-L268)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L256-L259)

## Usage

```ts
r()
  .not((v) => v < 0, 'Cannot be negative')
  .done()
```

## Source

[not implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L589-L597)

```ts
function not(v: (value: any) => boolean, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (v(value)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
