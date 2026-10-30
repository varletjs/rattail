# raceWithSignal

等待 Promise 或 thenable，同时响应 `AbortSignal` 取消信号。

### 使用

```ts
import { raceWithSignal } from 'rattail'

const controller = new AbortController()
const operation = fetch('/api/items', { signal: controller.signal })
const result = await raceWithSignal(operation, { signal: controller.signal })
```

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
