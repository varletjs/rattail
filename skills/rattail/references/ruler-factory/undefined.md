---
category: Type guards
---

# undefined

Requires the value to be `undefined`.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L205-L217)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L196-L208)

## Usage

```ts
r().undefined('Invalid').done()
```

## Source

[undefined implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L285-L299)

```ts
function _undefined(message?: RulerFactoryMessage, params?: P) {
  ctx.type = 'undefined'

  addRule((value) => {
    if (message == null) {
      return
    }

    if (value !== undefined) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
