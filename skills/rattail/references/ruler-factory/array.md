---
category: Type guards
---

# array

Narrows validation to array values; when message is omitted, no type check is added.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L205-L217)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L196-L208)

## Usage

```ts
r().array('Must be array').required('Required').done()
```

## Source

[array implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L189-L203)

```ts
function array(message?: RulerFactoryMessage, params?: P) {
  ctx.type = 'array'

  addRule((value) => {
    if (message == null) {
      return
    }

    if (!isArray(value)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
