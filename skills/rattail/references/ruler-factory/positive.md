---
category: Validators
---

# positive

Value must be greater than 0.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L236-L256)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L227-L247)

## Usage

```ts
r().number().positive('Bad').done()
```

## Source

[positive implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L527-L541)

```ts
function positive(message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'number' || ctx.type === 'bigint') {
      if (!isNumber(value) && typeof value !== 'bigint') {
        return new Error(getMessage(message))
      }

      if (value <= 0) {
        return new Error(getMessage(message))
      }
    }
  }, params)

  return ctx
}
```
