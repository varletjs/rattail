# createKeyedTaskQueue

创建内存任务队列。同一个 key 的任务按提交顺序串行执行，不同 key 的任务可以并行执行。

### 使用

```ts
import { createKeyedTaskQueue } from 'rattail'

const queue = createKeyedTaskQueue<string>()

const first = queue.run('conversation-a', async () => 'first result')
const second = queue.run('conversation-a', async () => 'second result')
const independent = queue.run('conversation-b', () => 42)

queue.isBusy('conversation-a') // true
await Promise.all([first, second, independent])
queue.isBusy('conversation-a') // false
```

### 方法

| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| `run(key, task)` | `Promise<Awaited<Result>>` | 提交同步或异步任务，返回该任务的结果 |
| `isBusy(key)` | `boolean` | 该 key 是否有正在执行或排队的任务 |

### 说明

- key 类型默认是 `string`，对象 key 按引用比较。
- 任务失败时只拒绝该任务的 Promise，不会阻止后续任务执行。
- 异步任务必须返回覆盖整个操作的 Promise。
- 需要协调的任务应复用同一个队列实例。任务内部不能等待该队列中同一个 key 的另一个任务，否则会产生死锁。
