# debounce

创建一个防抖函数，该函数会从上一次被调用后，延迟 `delay` 毫秒后调用 `fn` 方法。

### 使用

```ts
import { debounce } from 'rattail'

const debouncedFn = debounce(() => {
  // do something
}, 1000)

window.addEventListener('resize', debouncedFn)
```

### 参数

| 参数    |    类型    | 默认值 |
| ------- | :--------: | -----: |
| `fn`    | `Function` |        |
| `delay` |  `number`  |    `0` |

### 返回值

|    类型    |
| :--------: |
| `Function` |
