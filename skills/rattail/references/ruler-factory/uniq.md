---
category: Validators
---

# uniq

For arrays, fails if rattail `hasDuplicates` is true. README API list may omit it; see source.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L258-L263)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L249-L254)

## Usage

```ts
r().array().uniq('Duplicate values').done()
```

## Source

[uniq implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L559-L567)

```ts
function uniq(message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'array' && hasDuplicates(value)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
