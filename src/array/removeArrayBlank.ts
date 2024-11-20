export function removeArrayBlank<T>(arr: (T | null | undefined)[]) {
  return arr.filter((item) => item != null) as T[]
}
