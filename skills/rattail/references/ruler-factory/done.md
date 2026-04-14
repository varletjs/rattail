---
category: Finish
---

# done

Returns the accumulated rule array R[] for your form component.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L270-L272)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L261-L263)

## Usage

```ts
const rules = r().string().required('Required').done()
```

## Source

[done implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L640-L642)

```ts
function done() {
  return rules
}
```
