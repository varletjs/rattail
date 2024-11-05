import { getGlobalThis } from '../general'

export function cancelAnimationFrame(handle: number) {
  const globalThis = getGlobalThis()

  globalThis.cancelAnimationFrame ? globalThis.cancelAnimationFrame(handle) : globalThis.clearTimeout(handle)
}
