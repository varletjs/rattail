---
category: Type guards
---

# string

Narrows validation to string values; when message is omitted, no type check is added.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L205-L217)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L196-L208)

## Usage

```ts
r().string('Must be string').required('Required').done()
```

## Source

[string implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L141-L155)

```ts
function string(message?: RulerFactoryMessage, params?: P) {
  ctx.type = 'string'

  addRule((value: any) => {
    if (message == null) {
      return
    }

    if (!isString(value)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
