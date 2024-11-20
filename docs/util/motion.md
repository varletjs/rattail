# motion

Used to implement basic transition animation based on `requestAnimationFrame`.

### Usage

```ts
import { motion } from 'rattail'

const { start, pause, reset } = motion({
  from: 0,
  to: 100,
  frame({ value, done }) {
    if (done) {
      // transition end
      console.log(value)
      // value is 100
    } else {
      console.log(value)
      // value is transitioning from 0 -> 100
    }
  },
})

start() // start transition, the frame callback starts executing
pause() // pause transition
reset() // reset transition
```

### More Options

```ts
import { motion } from 'rattail'

const { start, pause, reset } = motion({
  from: 0,
  to: 100,
  // transition duration milliseconds
  duration: 1000,
  // animation curve function
  timingFunction: (v) => 1 - Math.pow(1 - v, 3),
  // transition state change callback
  onStateChange(state) {},
  // onFinished
  frame() {},
})
```

### Arguments

| Arg       | Type            | Defaults |
| --------- | --------------- | -------- |
| `options` | `MotionOptions` |          |

### Return

| Type     |
| -------- |
| `Motion` |

### Types

```ts
export interface MotionOptions {
  from: number
  to: number
  // defaults 300
  duration?: number
  frame?: ({ value, done }: { value: number; done: boolean }) => void
  // defaults v => v
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
