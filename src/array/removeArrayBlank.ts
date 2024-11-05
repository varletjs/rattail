export function removeArrayBlank<T>(arr: Array<T | null | undefined>) {
  return arr.filter((item) => item != null) as T[]
}
