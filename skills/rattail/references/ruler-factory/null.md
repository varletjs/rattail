---
category: Type guards
---

# null

Requires the value to be `null`.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L205-L217)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L196-L208)

## Usage

```ts
r().null('Invalid').done()
```

## Source

[null implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L269-L283)

```ts
function _null(message?: RulerFactoryMessage, params?: P) {
  ctx.type = 'null'

  addRule((value) => {
    if (message == null) {
      return
    }

    if (value !== null) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
