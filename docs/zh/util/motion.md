# motion

用于实现基础的过渡动画（基于 `requestAnimationFrame`）。

### 使用

```ts
import { motion } from 'rattail'

const { start, pause, reset } = motion({
  from: 0,
  to: 100,
  frame({ value, done }) {
    if (done) {
      // 过渡结束
      console.log(value)
      // value 为 100
    } else {
      console.log(value)
      // frame 会在每一帧执行，value 在 0 -> 100 过渡
    }
  },
})

start() // 开始过渡, frame 回调会在下一帧开始不停的调用
pause() // 暂停过渡
reset() // 重置过渡状态
```

### 更多选项

```ts
import { motion } from 'rattail'

const { start, pause, reset } = motion({
  from: 0,
  to: 100,
  // 过渡时间，单位 ms
  duration: 1000,
  // 动画曲线函数
  timingFunction: (v) => 1 - Math.pow(1 - v, 3),
  // 过渡状态变化回调
  onStateChange(state) {},
  frame() {},
})
```

### 参数

| 参数      | 类型            | 默认值 |
| --------- | --------------- | ------ |
| `options` | `MotionOptions` |        |

### 返回值

| 类型     |
| -------- |
| `Motion` |

### 类型

```ts
export interface MotionOptions {
  from: number
  to: number
  // 默认值 300
  duration?: number
  frame?: ({ value, done }: { value: number; done: boolean }) => void
  // 默认值 v => v
  timingFunction?: (v: number) => number
  onStateChange?: (state: MotionState) => void
}

export interface Motion {
  start: () => void
  pause: () => void
  reset: () => void
  getState: () => MotionState
}

export type MotionState = 'running' | 'paused' | 'pending' | 'finished'
```
