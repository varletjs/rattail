# raceWithSignal

等待异步任务完成，收到取消信号时提前结束等待。

### 使用

```ts
import { delay, raceWithSignal } from 'rattail'

const controller = new AbortController()
const operation = delay(3000)

setTimeout(() => {
  controller.abort(new Error('Cancelled'))
}, 100)

try {
  await raceWithSignal(operation, { signal: controller.signal })
} catch (error) {
  console.log(error)
  // Error: Cancelled
}
```

约 100 毫秒后停止等待并进入 `catch`，原本的 3 秒延迟仍会继续。

### 参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `promise` | `PromiseLike<Value>` | 要等待的异步操作 |
| `options.signal` | `AbortSignal` | 用于终止等待的信号 |

### 返回值

`Promise<Awaited<Value>>`。返回原始结果或抛出原始异常；若先发生取消，则以原始 `signal.reason` 拒绝。

### 说明

- 信号已经取消时，会立即拒绝等待，即使 Promise 已经完成。
- 取消等待不会终止底层操作；底层操作支持取消时，还需将信号传给它。
