# createCacheManager

创建一个带有可选 TTL（过期时间，毫秒）的简单内存缓存管理器。

### 使用

```ts
import { createCacheManager } from 'rattail'

const cache = createCacheManager({ ttl: 1000 }) // 默认 TTL: 1000ms

cache.set('foo', 123)
cache.get('foo') // 123

setTimeout(() => {
  cache.get('foo') // undefined（已过期）
}, 1500)

cache.set('bar', 456, { ttl: 5000 }) // 单独设置条目的 TTL
cache.has('bar') // true
cache.remove('bar')
cache.has('bar') // false
cache.clear() // 清空所有缓存
```

### 参数

| 参数          | 类型     | 说明                       | 默认值     |
| ------------- | -------- | -------------------------- | ---------- |
| `options`     | `object` | 缓存管理器配置             | `{}`       |
| `options.ttl` | `number` | 所有条目的默认 TTL（毫秒） | `Infinity` |

### 方法

| 方法                        | 说明                              |
| --------------------------- | --------------------------------- |
| `set(key, value, options?)` | 设置值，可单独指定 TTL            |
| `get(key)`                  | 通过 key 获取值（自动清理过期项） |
| `has(key)`                  | 检查 key 是否存在且未过期         |
| `remove(key)`               | 移除指定 key 的值                 |
| `clear()`                   | 清空所有缓存条目                  |

### 返回值

返回包含上述方法的缓存管理器对象。

### 注意事项

- 访问时会自动清理过期条目。
- TTL 单位为毫秒。不设置则永不过期。
- 每个条目可通过 `set` 方法单独指定 TTL。
