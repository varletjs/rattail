# raceWithSignal

Waits for a promise or thenable while responding to an `AbortSignal`.

### Usage

```ts
import { raceWithSignal } from 'rattail'

const controller = new AbortController()
const operation = fetch('/api/items', { signal: controller.signal })
const result = await raceWithSignal(operation, { signal: controller.signal })
```

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
