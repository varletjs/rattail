---
category: Type guards
---

# false

Requires the value to be strictly `false`.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L205-L217)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L196-L208)

## Usage

```ts
r().false('Invalid').done()
```

## Source

[false implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L237-L251)

```ts
function _false(message?: RulerFactoryMessage, params?: P) {
  ctx.type = 'boolean'

  addRule((value) => {
    if (message == null) {
      return
    }

    if (value !== false) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
