---
category: Validators
---

# email

When type is string, checks a built-in email pattern.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L223-L234)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L214-L225)

## Usage

```ts
r().string().email('Invalid email').done()
```

## Source

[email implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L327-L335)

```ts
function email(message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'string' && (!isString(value) || !EMAIL_REGEX.test(value))) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
