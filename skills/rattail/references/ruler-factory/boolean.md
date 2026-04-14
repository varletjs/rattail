---
category: Type guards
---

# boolean

Narrows validation to boolean values; when message is omitted, no type check is added.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L205-L217)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L196-L208)

## Usage

```ts
r().boolean('Must be boolean').required('Required').done()
```

## Source

[boolean implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L205-L219)

```ts
function boolean(message?: RulerFactoryMessage, params?: P) {
  ctx.type = 'boolean'

  addRule((value) => {
    if (message == null) {
      return
    }

    if (!isBoolean(value)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
