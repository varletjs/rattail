# mitt

事件调度器，集成了 [mitt](https://github.com/developit/mitt)。

### 用法

```ts
import { mitt } from 'rattail'

const emitter = mitt()

// 监听特定事件
emitter.on('foo', (e) => {
  console.log('foo', e)
})

// 监听所有的事件
emitter.on('*', (type, e) => {
  console.log(type, e)
})

// 触发事件
emitter.emit('foo', { a: 'b' })

// 清理所有的事件处理器
emitter.all.clear()

// 监听事件 / 卸载事件
emitter.on('foo', onFoo)
emitter.off('foo', onFoo)

function onFoo() {}
```

### API

[Reference](https://github.com/developit/mitt)
