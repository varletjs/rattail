---
category: Util
---

# createKeyedTaskQueue

## Documentation

- [English](https://rattail.varletjs.org/util/create-keyed-task-queue)
- [Chinese docs](https://rattail.varletjs.org/zh/util/create-keyed-task-queue)

Creates an in-memory queue that runs tasks with the same key serially in submission order. Tasks with different keys can run concurrently.

### Usage

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

### Methods

| Method           | Return                     | Description                                                      |
| ---------------- | -------------------------- | ---------------------------------------------------------------- |
| `run(key, task)` | `Promise<Awaited<Result>>` | Enqueue a synchronous or asynchronous task and return its result |
| `isBusy(key)`    | `boolean`                  | Whether the key has a running or queued task                     |

### Notes

- The key type defaults to `string`; object keys compare by reference.
- A failed task rejects its own promise without blocking later tasks.
- Asynchronous tasks must return a promise covering their entire operation.
- Reuse the same queue instance for tasks that need coordination. Within a task, do not await another task with the same key on that queue: it will deadlock.

## Type declarations

```ts
import { NOOP } from '../function/NOOP'

export function createKeyedTaskQueue<Key = string>() {
  const tails = new Map<Key, Promise<unknown>>()

  return { run, isBusy }

  async function run<Result>(key: Key, task: () => Result | PromiseLike<Result>): Promise<Awaited<Result>> {
    const previous = tails.get(key) ?? Promise.resolve()
    const current = previous.catch(NOOP).then(task)

    tails.set(key, current)

    try {
      return await current
    } finally {
      if (tails.get(key) === current) {
        tails.delete(key)
      }
    }
  }

  function isBusy(key: Key) {
    return tails.has(key)
  }
}
```
