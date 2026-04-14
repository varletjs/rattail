---
category: Integrated
---

# mitt

Event emitter / pubsub. Integrated with [mitt](https://github.com/developit/mitt).

## Documentation

- [English](https://rattail.varletjs.org/integrated/mitt)
- [Chinese docs](https://rattail.varletjs.org/zh/integrated/mitt)

### Usage

```ts
import { mitt } from 'rattail'

const emitter = mitt()

// listen to an event
emitter.on('foo', (e) => {
  console.log('foo', e)
})

// listen to all events
emitter.on('*', (type, e) => {
  console.log(type, e)
})

// fire an event
emitter.emit('foo', { a: 'b' })

// clearing all events
emitter.all.clear()

// working with handler references:
emitter.on('foo', onFoo)
emitter.off('foo', onFoo)

function onFoo() {}
```

### API

[Reference](https://github.com/developit/mitt)

## Type declarations

```ts
export * from 'mitt'
export { default as mitt } from 'mitt'
```
