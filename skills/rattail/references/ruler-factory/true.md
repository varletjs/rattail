---
category: Type guards
---

# true

Requires the value to be strictly `true` (after optional type guard).

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L205-L217)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L196-L208)

## Usage

```ts
r().true('Invalid').done()
```

## Source

[true implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L221-L235)

```ts
function _true(message?: RulerFactoryMessage, params?: P) {
  ctx.type = 'boolean'

  addRule((value) => {
    if (message == null) {
      return
    }

    if (value !== true) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
