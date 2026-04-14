---
category: Predicates
---

# is

Passes when the predicate returns truthy.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L265-L268)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L256-L259)

## Usage

```ts
r()
  .is((v) => v === 1, 'Must be 1')
  .done()
```

## Source

[is implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L579-L587)

```ts
function is(v: (value: any) => boolean, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (!v(value)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
