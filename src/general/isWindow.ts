export function isWindow(val: unknown): val is Window {
  return val === window
}
