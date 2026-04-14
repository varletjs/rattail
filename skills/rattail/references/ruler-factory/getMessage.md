---
category: Custom
---

# getMessage

Resolves RulerFactoryMessage (string or function) to a string; useful inside extend callbacks.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L171-L201)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L162-L192)

## Usage

```ts
return new Error(ctx.getMessage(message))
```

## Source

[getMessage implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L644-L646)

```ts
function getMessage(message: RulerFactoryMessage) {
  return isFunction(message) ? message() : message
}
```
