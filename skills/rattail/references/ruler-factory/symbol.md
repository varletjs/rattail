---
category: Type guards
---

# symbol

Narrows validation to symbol values; when message is omitted, no type check is added.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L205-L217)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L196-L208)

## Usage

```ts
r().symbol('Must be symbol').required('Required').done()
```

## Source

[symbol implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L253-L267)

```ts
function symbol(message?: RulerFactoryMessage, params?: P) {
  ctx.type = 'symbol'

  addRule((value) => {
    if (message == null) {
      return
    }

    if (!isSymbol(value)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
