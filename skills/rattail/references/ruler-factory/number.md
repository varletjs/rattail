---
category: Type guards
---

# number

Narrows validation to number values; when message is omitted, no type check is added.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L205-L217)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L196-L208)

## Usage

```ts
r().number('Must be number').required('Required').done()
```

## Source

[number implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L157-L171)

```ts
function number(message?: RulerFactoryMessage, params?: P) {
  ctx.type = 'number'

  addRule((value) => {
    if (message == null) {
      return
    }

    if (!isNumber(value)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
