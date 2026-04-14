---
category: Validators
---

# uniqBy

Array uniqueness by comparator (a, b) => any; uses hasDuplicatesBy.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L258-L263)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L249-L254)

## Usage

```ts
r()
  .array()
  .uniqBy((a, b) => a.id === b.id, 'Duplicate id')
  .done()
```

## Source

[uniqBy implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L569-L577)

```ts
function uniqBy(v: (a: any, b: any) => any, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'array' && hasDuplicatesBy(value, v)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
