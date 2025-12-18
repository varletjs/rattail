export interface CreateCacheManagerOptions {
  ttl?: number
}

export function createCacheManager<T = any>(options: CreateCacheManagerOptions = {}) {
  const cacheManager = new Map<any, { expiredAt: number; value: T }>()
  const { ttl: defaultTtl = Infinity } = options

  function purgeStale() {
    cacheManager.forEach((value, key) => {
      if (performance.now() > value.expiredAt) {
        remove(key)
      }
    })
  }

  function has(key: any) {
    purgeStale()
    return cacheManager.has(key)
  }

  function get(key: any) {
    purgeStale()
    return cacheManager.get(key)?.value
  }

  function set(key: any, value: T, options?: { ttl: number }) {
    const ttl = options?.ttl ?? defaultTtl
    cacheManager.set(key, { expiredAt: performance.now() + ttl, value })
  }

  function remove(key: any) {
    return cacheManager.delete(key)
  }

  function clear() {
    cacheManager.clear()
  }

  return {
    has,
    get,
    set,
    remove,
    clear,
  }
}
