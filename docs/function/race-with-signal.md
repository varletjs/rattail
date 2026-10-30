# raceWithSignal

Waits for an asynchronous task to finish, or stops waiting when a cancellation signal is received.

### Usage

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

After about 100 milliseconds, waiting stops and the `catch` block runs. The original 3-second delay continues.

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `promise` | `PromiseLike<Value>` | The asynchronous operation to wait for |
| `options.signal` | `AbortSignal` | Signal that stops waiting |

### Return

`Promise<Awaited<Value>>`. Resolves with the original result or rejects with the original error. If aborted first, rejects with the exact `signal.reason`.

### Notes

- An already aborted signal rejects the wait immediately, even if the promise has already settled.
- Cancelling the wait does not stop the underlying operation. Pass the signal to that operation as well if it supports cancellation.
