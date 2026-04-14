---
category: Type guards
---

# object

Narrows validation to object values; when message is omitted, no type check is added.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L205-L217)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L196-L208)

## Usage

```ts
r().object('Must be object').required('Required').done()
```

## Source

[object implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L173-L187)

```ts
function object(message?: RulerFactoryMessage, params?: P) {
  ctx.type = 'object'

  addRule((value) => {
    if (message == null) {
      return
    }

    if (!isPlainObject(value)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
