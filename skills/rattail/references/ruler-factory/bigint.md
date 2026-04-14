---
category: Type guards
---

# bigint

Narrows validation to bigint values; when message is omitted, no type check is added.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L205-L217)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L196-L208)

## Usage

```ts
r().bigint('Must be bigint').required('Required').done()
```

## Source

[bigint implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L301-L315)

```ts
function bigint(message?: RulerFactoryMessage, params?: P) {
  ctx.type = 'bigint'

  addRule((value) => {
    if (message == null) {
      return
    }

    if (typeof value !== 'bigint') {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
