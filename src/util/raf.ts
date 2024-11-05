import { requestAnimationFrame } from './requestAnimationFrame'

export function raf() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve)
  })
}
