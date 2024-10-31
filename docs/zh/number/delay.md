# delay

创建一个在指定的毫秒数后完成的 `promise`。

### 使用

```ts
import { delay } from 'rattail'

console.log('Start')
await delay(1000)
console.log('End after 1 second')
```

### 参数列表

| 参数        |   类型   | 默认值 |
| ----------- | :------: | -----: |
| `time (ms)` | `number` |        |

### 返回值

|      类型       |
| :-------------: |
| `Promise<void>` |
