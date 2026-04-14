---
category: Validators
---

# lt

Strictly less than v.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L236-L256)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L227-L247)

## Usage

```ts
r().number().lt(0, 'Bad').done()
```

## Source

[lt implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L495-L509)

```ts
function lt(v: number | bigint, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'number' || ctx.type === 'bigint') {
      if (!isNumber(value) && typeof value !== 'bigint') {
        return new Error(getMessage(message))
      }

      if (value >= v) {
        return new Error(getMessage(message))
      }
    }
  }, params)

  return ctx
}
```
