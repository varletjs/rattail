---
category: Validators
---

# required

Fails when the value is empty per `rattail` `isEmpty` (e.g. undefined, null, empty string, empty array/plain object, empty Map/Set).

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L219-L221)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L210-L212)

## Usage

```ts
r().string().required('Required').done()
```

## Source

[required implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L317-L325)

```ts
function required(message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (isEmpty(value)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
