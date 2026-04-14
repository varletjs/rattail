---
category: Util
---

# motion

Used to implement basic transition animation based on `requestAnimationFrame`.

## Documentation

- [English](https://rattail.varletjs.org/util/motion)
- [Chinese docs](https://rattail.varletjs.org/zh/util/motion)

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

## Type declarations

```ts
import { clamp } from '../number'
import { cancelAnimationFrame } from './cancelAnimationFrame'
import { requestAnimationFrame } from './requestAnimationFrame'

export interface MotionOptions {
  from: number
  to: number
  duration?: number
  frame?: ({ value, done }: { value: number; done: boolean }) => void
  timingFunction?: (v: number) => number
  onStateChange?: (state: MotionState) => void
}

export type MotionState = 'running' | 'paused' | 'pending' | 'finished'

export interface Motion {
  start: () => void
  pause: () => void
  reset: () => void
  getState: () => MotionState
}

export function motion(options: MotionOptions): Motion {
  const {
    from,
    to,
    duration = 300,
    frame = () => {},
    timingFunction = (value) => value,
    onStateChange = () => {},
  } = options

  let state: MotionState = 'pending'
  let value = from
  const distance = to - from
  let ticker: number | undefined = undefined
  let startTime: number | undefined = undefined
  let pausedTime: number | undefined = undefined
  let sleepTime: number = 0

  function start() {
    if (state === 'running' || state === 'finished') {
      return
    }

    setState('running')

    const now = performance.now()
    startTime = startTime != null ? startTime : now
    sleepTime += pausedTime != null ? now - pausedTime : 0
    pausedTime = undefined
    tick()

    function tick() {
      ticker = requestAnimationFrame(() => {
        const now = performance.now()
        const executionTime = now - startTime! - sleepTime
        const progress = clamp(executionTime / duration, 0, 1)
        value = distance * timingFunction(progress) + from

        if (progress >= 1) {
          setState('finished')
          frame({ value: to, done: true })
          return
        }

        frame({ value, done: false })
        tick()
      })
    }
  }

  function pause() {
    if (state !== 'running') {
      return
    }

    cancelAnimationFrame(ticker!)
    setState('paused')
    pausedTime = performance.now()
  }

  function reset() {
    cancelAnimationFrame(ticker!)
    setState('pending')
    value = from
    ticker = undefined
    startTime = undefined
    pausedTime = undefined
    sleepTime = 0
  }

  function getState() {
    return state
  }

  function setState(_state: MotionState) {
    state = _state
    onStateChange(_state)
  }

  return {
    start,
    pause,
    reset,
    getState,
  }
}
```
