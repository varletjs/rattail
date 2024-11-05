import { inBrowser } from './inBrowser'

export function supportTouch() {
  return inBrowser() && 'ontouchstart' in window
}
