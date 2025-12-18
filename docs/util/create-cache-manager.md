# createCacheManager

Creates a simple in-memory cache manager with optional TTL (time-to-live) support for each entry.

### Usage

```ts
import { createCacheManager } from 'rattail'

const cache = createCacheManager({ ttl: 1000 }) // default TTL: 1000ms

cache.set('foo', 123)
cache.get('foo') // 123

setTimeout(() => {
  cache.get('foo') // undefined (expired)
}, 1500)

cache.set('bar', 456, { ttl: 5000 }) // custom TTL for this entry
cache.has('bar') // true
cache.remove('bar')
cache.has('bar') // false
cache.clear() // clear all
```

### Arguments

| Arg           | Type     | Description                       | Default    |
| ------------- | -------- | --------------------------------- | ---------- |
| `options`     | `object` | Cache manager options             | `{}`       |
| `options.ttl` | `number` | Default TTL in ms for all entries | `Infinity` |

### Methods

| Method                      | Description                              |
| --------------------------- | ---------------------------------------- |
| `set(key, value, options?)` | Set a value with optional TTL override   |
| `get(key)`                  | Get a value by key (auto-purges expired) |
| `has(key)`                  | Check if a key exists and is not expired |
| `remove(key)`               | Remove a value by key                    |
| `clear()`                   | Clear all cache entries                  |

### Return

Returns a cache manager object with the above methods.

### Notes

- Expired entries are automatically purged on access.
- TTL is in milliseconds. If not set, entries never expire.
- Each entry can override the default TTL via `set` method.
