---
category: Validators
---

# gt

Numeric/bigint strictly greater than v.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L236-L256)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L227-L247)

## Usage

```ts
r().number().gt(0, 'Bad').done()
```

## Source

[gt implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L463-L477)

```ts
function gt(v: number | bigint, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'number' || ctx.type === 'bigint') {
      if (!isNumber(value) && typeof value !== 'bigint') {
        return new Error(getMessage(message))
      }

      if (value <= v) {
        return new Error(getMessage(message))
      }
    }
  }, params)

  return ctx
}
```
